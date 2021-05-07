import XForm from "../../../components/forms/XForm";
import React from "react";
import * as yup from "yup";
import {reqObject, reqString} from "../../../data/validations";
import {FormikHelpers} from "formik";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../components/inputs/XTextInput";
import XRichTextArea from "../../../components/inputs/XRichTextArea";
import XSelectInput from "../../../components/inputs/XSelectInput";
import XSelectInputCreatable from "../../../components/inputs/XSelectInputCreatable";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import {addFreelanceProject, createFreelanceProjectAction} from "../redux/freelanceProjectActions";

interface IProps {
    onClose?: () => void
}

const schema = yup.object().shape(
    {
        name: reqString,
        description: reqString,
        paymentOption: reqString,
        budget: reqString,
        ownerEmail: reqString
    }
)

const paymentOptions = [
    {
        id: 'fixed',
        name: 'Fixed Price'
    },
    {
        id: 'hourly',
        name: 'Pay per hour'
    }
]

const budgetOptions = [
    {
        id: '$30 – $250',
        name: 'Simple project ($30 – $250)'
    },
    {
        id: '$750 – $1,500',
        name: 'Small project ($750 – $1,500)'
    },
    {
        id: '$3,000 – $5,000',
        name: 'Large project ($3,000 – $5,000)'
    },
    {
        id: '$20,000 – $50,000',
        name: 'Huge project ($20,000 – $50,000)'
    }
]

const CreateProject = ({onClose}: IProps) => {

    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    const initialValues = {
        name: '',
        description: '',
        ownerEmail: user?.profile.email,
        skills: ''
    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
        const {budget, paymentOption} = values

        values.budget = budget.id
        values.paymentOption = paymentOption.id
        dispatch(addFreelanceProject(values))
    }

    return (
        <XForm
            debug={true}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        variant={"outlined"}
                        label={"Project name"}
                        name={"name"}
                        placeholder={"Enter project name"}
                        helperText={"Enter project name"}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <XTextInput
                        variant={"outlined"}
                        label={"Contact email address"}
                        name={"ownerEmail"}
                        placeholder={"Enter your email address"}
                        helperText={"Interested freelancers will contact you on this email"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <p><strong>Project description</strong></p>
                    <XRichTextArea
                        variant={"filled"}
                        name={"description"}
                        helperText={"Write a brief about the project"}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <XSelectInputCreatable
                        variant={"outlined"}
                        name={"paymentOption"}
                        allowAddNew={true}
                        multiple={false}
                        label={"Payment option"}
                        helperText={"Fixed price or hourly"}
                        options={paymentOptions}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <XSelectInputCreatable
                        variant={"outlined"}
                        name={"budget"}
                        allowAddNew={true}
                        multiple={false}
                        label={"What's your budget?"}
                        helperText={"You can add it if it is out of the range"}
                        options={budgetOptions}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextInput
                        variant={"outlined"}
                        label={"Required skills"}
                        name={"skills"}
                        placeholder={"Ex. C#, .NET Core, JavaScript"}
                        helperText={"What skills are you looking for? Separate with comma (,)"}
                    />
                </Grid>
            </Grid>
        </XForm>
    )
}

export default CreateProject