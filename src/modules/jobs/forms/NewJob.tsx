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
import {getProfile} from "../../../services/User";
import {IPerson} from "../../profiles/people/IPerson";
import {IOption} from "../../../components/inputs/inputHelpers";
import {IStartup} from "../../../interfaces/IStartup";
import {countries} from "../../../data/Countries";
import {ICountry} from "../../../interfaces/ICountry";
import {userSelector} from "../../../data/coreSelectors";
import {jobCategoriesSelector} from "../redux/jobsSelectors";
import {addJob, loadJobCategories} from "../redux/jobsActions";
import {getStartups} from "../../profiles/startups/redux/startupsEndpoints";

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
    title: "Senior Software Engineer",
    companyId: "f4ffcb16-7f58-4a10-b4cb-877f22612076",
    category: 12,
    location: "Armenia",
    deadline: "2021-01-30T14:29:00.000Z",
    details: "Some description of the job",
    qualifications: "Some qualifications",
    experience: "5 years",
    howToApply: "Send an email to info@email.com"
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

        const user: IPerson = getProfile()
        const job = {...values}
        job.category = {id: values.category}
        job.profileId = user.id

        try {
            await dispatch(addJob(job))
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
            debug={false}
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
                    <XSelectInput
                        label={"Company"}
                        name={"companyId"}
                        helperText={"Select a company"}
                        options={companies}/>
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