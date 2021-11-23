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
import XFileInput from "../../../components/inputs/XFileInput";
import XStepper, {IStep} from "../../../components/stepper/XStepper";
import JobOverview from "./JobOverview";
import JobDescription from "./JobDescription";
import JobBenefits from "./JobBenefits";
import JobAttachments from "./JobAttachments";

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
    const [steps, setSteps] = useState<IStep[]>([])

    // useEffect(() => {
    //
    //     dispatch(loadJobCategories())
    //
    //     getStartups({personId: user.profile.sub})
    //         .then((response: any) => {
    //             setCompanies(response.body.startups.map((c: IStartup) => (
    //                     {id: c.id, name: c.name}
    //                 )
    //             ))
    //         })
    //
    //     setSteps([
    //         {
    //             index: 0,
    //             label: 'Job details',
    //             icon: '',
    //             children: <JobOverview categories={categories} />
    //         },
    //         {
    //             index: 1,
    //             label: 'Requirements',
    //             icon: '',
    //             children: <JobDescription categories={categories} />
    //         },
    //         {
    //             index: 2,
    //             label: 'Benefits',
    //             icon: '',
    //             children: <JobBenefits categories={categories} />
    //         },
    //         {
    //             index: 3,
    //             label: 'Attachments',
    //             icon: '',
    //             children: <JobAttachments categories={categories} />
    //         }
    //     ])
    //
    // }, [dispatch, getStartups, setCompanies])

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        console.log(values)

        // const job = {...values}
        // job.category = {id: values.category}
        // job.profileId = user.profile.sub
        //
        // try {
        //     dispatch(addJob(job))
        // } catch (e: any) {
        //
        // } finally {
        //     actions.resetForm()
        //     if (onClose) {
        //         onClose()
        //     }
        // }
    }

    return (
        <XForm
            debug={false}
            hideSubmitButton={true}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <XStepper onSubmit={handleSubmit} steps={steps} />
            </Grid>
        </XForm>
    )
}

export default NewJob
