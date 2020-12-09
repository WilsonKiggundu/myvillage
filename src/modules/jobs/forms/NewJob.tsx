import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import {reqDate, reqString} from "../../../data/validations";
import XForm from "../../../components/forms/XForm";
import XTextInput from "../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";
import XDateInput from "../../../components/inputs/XDateInput";
import XSelectInput from "../../../components/inputs/XSelectInput";
import {IOption} from "../../../components/inputs/inputHelpers";
import {IJobCategory} from "../../../interfaces/IJob";
import {get, makeUrl, post} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import Toast from "../../../utils/Toast";
import {User} from "oidc-client/dist/oidc-client";
import {getProfile} from "../../../services/User";
import {IPerson} from "../../profiles/people/IPerson";
import {addPost} from "../../posts/postsSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {addJob} from "../jobsSlice";
import { addDays } from "date-fns";

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
        deadline: reqDate
    }
)

const initialValues = {
    title: 'Senior Software Engineer',
    details: 'Design, develop and implement applications that support day-to-day operations.\n' +
        'Provide innovative solutions to complex business problems.\n' +
        'Plan, develop and implement large-scale projects from conception to completion.\n' +
        'Develop and architect lifecycle of projects working on different technologies and platforms.\n' +
        'Interface with clients and gather business requirements and objectives.\n' +
        'Translate clients’ business requirements and objectives into technical applications and solutions.\n' +
        'Understand and evaluate complex data models.\n' +
        'Design, develop and implement new integration.\n' +
        'Execute system development and maintenance activities.\n' +
        'Develop solutions to improvise performance and scalability of systems.',
    category: 12,
    location: 2,
    deadline: addDays(new Date(), 14),
    qualifications: 'Degree in Engineering, Computer Science or anything',
    experience: 'At least 50 years of active software development in ReactJs and COBOL',
    howToApply: 'Just apply. It is that simple. Drop us an email on Facebook and Twitter'
}

const NewJob = ({done, onClose}: IProps) => {
    const dispatch = useDispatch()

    const location: IOption[] = [
        {id: 1, name:"Remote"},
        {id: 2, name:"Uganda"},
        {id: 3, name:"Kenya"},
        {id: 4, name:"Tanzania"},
    ]

    const [categories, setCategories] = useState<IJobCategory[]>([])

    useEffect(() => {
        const url = makeUrl("Jobs", Endpoints.jobs.api + "/categories")
        get(url, {}, (categories) => {
            setCategories(categories)
        }, err => {

        })
    }, [setCategories])

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
        const user: IPerson = getProfile()
        const job = {...values}
        job.category = {id: values.category}
        job.profileId = user.id

        try {
            const resultAction: any = await dispatch(addJob(job))
            unwrapResult(resultAction)
        }catch (e) {

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
                        label={"Category"}
                        name={"category"}
                        helperText={"Ex. Information Technology"}
                        options={categories} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <XSelectInput
                        helperText={"Ex. Uganda, Kenya, Remote"}
                        options={location}
                        name={"location"}
                        label={"Country"}
                        variant={"standard"}
                    />
                </Grid>

                <Grid item xs={12}>
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
                        rows={1}
                        rowsMax={12}
                        helperText={"Briefly describe the job so that candidates know what to expect.."}
                        label={"Job description"}
                        name={"details"} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <XTextAreaInput
                        rows={1}
                        rowsMax={4}
                        helperText={"What qualifications should a potential candidate have?"}
                        label={"Qualifications"}
                        name={"qualifications"} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <XTextAreaInput
                        rows={1}
                        rowsMax={4}
                        helperText={"How many years of experience are you looking for? You can specify a range."}
                        label={"Experience"}
                        name={"experience"} />
                </Grid>

                <Grid item xs={12}>
                    <XTextAreaInput
                        rows={1}
                        rowsMax={4}
                        helperText={"Describe what the application process is like."}
                        label={"How should the candidates apply for the job?"}
                        name={"howToApply"} />
                </Grid>

            </Grid>
        </XForm>
    )
}

export default NewJob