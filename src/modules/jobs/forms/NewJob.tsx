import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import {reqDate, reqString} from "../../../data/validations";
import XForm from "../../../components/forms/XForm";
import XTextInput from "../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";
import XDateInput from "../../../components/inputs/XDateInput";
import XSelectInput from "../../../components/inputs/XSelectInput";
import {IOption} from "../../../components/inputs/inputHelpers";
import {IStartup} from "../../../interfaces/IStartup";
import {countries} from "../../../data/Countries";
import {ICountry} from "../../../interfaces/ICountry";
import {userSelector} from "../../../data/coreSelectors";
import {jobCategoriesSelector} from "../redux/jobsSelectors";
import {addJob, loadJobCategories} from "../redux/jobsActions";
import {getStartups} from "../../profiles/startups/redux/startupsEndpoints";
import XSelectInputAsync from "../../../components/inputs/XSelectInputAsync";
import {Endpoints} from "../../../services/Endpoints";

interface IProps {
    done?: () => any
    onClose?: () => any
}

const schema = yup.object().shape(
    {
        title: reqString,
        details: reqString,
        category: reqString,
        howToApply: reqString,
        qualifications: reqString,
        experience: reqString,
        deadline: reqDate,
        location: reqString
    }
)

const initialValues = {

}

const NewJob = ({done, onClose}: IProps) => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const categories = useSelector(jobCategoriesSelector)

    const [companies, setCompanies] = useState<IOption[]>([])

    useEffect(() => {

        dispatch(loadJobCategories())

        getStartups({personId: user.profile.sub})
            .then((response: any) => {
                setCompanies(response.body.startups.map((c: IStartup) => (
                        {id: c.id, name: c.name}
                    )
                ))
            })

    }, [dispatch, getStartups, setCompanies])

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        const job = {...values}
        job.category = {id: values.category}
        job.profileId = user.profile.sub

        try {
            dispatch(addJob(job))
        } catch (e) {

        } finally {
            actions.resetForm()
            if (onClose) {
                onClose()
            }
        }
    }

    return (
        <XForm
            debug={true}
            submitButtonLabel={"Post Job"}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XTextInput
                        name={"title"}
                        multiline={false}
                        variant={"standard"}
                        label={"Add title"}
                        helperText={"Ex. Senior Software Engineer"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <XSelectInputAsync
                        name="companyId"
                        label={"Company"}
                        helperText={"Start typing your company name."}
                        data={{
                            label: 'name',
                            field: 'startups',
                            params: {page: 1, pageSize: 25, personId: user.profile.sub},
                            avatar: 'avatar',
                            endpoint: Endpoints.base + Endpoints.business.base
                        }}
                        variant={"standard"} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <XSelectInput
                        label={"Category"}
                        name={"category"}
                        helperText={"Ex. Information Technology"}
                        options={categories}/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <XSelectInput
                        multiple={false}
                        helperText={"Ex. Uganda, Kenya, Remote"}
                        name={"location"}
                        label={"Location"}
                        options={countries.map((c: ICountry) => ({id: c.label, name: c.label}))}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <XDateInput
                        disablePast
                        name={"deadline"}
                        label={"Application deadline"}
                        helperText={"Defaults to 2 weeks from now"}
                        pickerVariant={"dialog"}
                        variant={"standard"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextAreaInput
                        rows={4}
                        rowsMax={6}
                        helperText={"Briefly describe the job so that candidates know what to expect.."}
                        label={"Job description"}
                        name={"details"}/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <XTextAreaInput
                        rows={1}
                        rowsMax={6}
                        helperText={"What qualifications should a potential candidate have?"}
                        label={"Qualifications"}
                        name={"qualifications"}/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <XTextAreaInput
                        rows={1}
                        rowsMax={6}
                        helperText={"How many years of experience are you looking for? You can specify a range."}
                        label={"Experience"}
                        name={"experience"}/>
                </Grid>

                <Grid item xs={12}>
                    <XTextAreaInput
                        rows={1}
                        rowsMax={4}
                        helperText={"Describe what the application process is like."}
                        label={"How to apply"}
                        name={"howToApply"}/>
                </Grid>

            </Grid>
        </XForm>
    )
}

export default NewJob