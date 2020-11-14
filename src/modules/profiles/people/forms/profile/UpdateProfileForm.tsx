import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqArray, reqString} from "../../../../../data/validations";
import {useDispatch} from "react-redux";
import {post} from "../../../../../utils/ajax";
import Toast from "../../../../../utils/Toast";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../../components/inputs/XTextAreaInput";
import Box from "@material-ui/core/Box";
import FormHelperText from "@material-ui/core/FormHelperText";
import XRadioInput from "../../../../../components/inputs/XRadioInput";
import {Options} from "../../../../../utils/options";
import XDateInput from "../../../../../components/inputs/XDateInput";
import XSelectInput from "../../../../../components/inputs/XSelectInput";

interface IProps {
    done?: () => any
}

const schema = yup.object().shape(
    {
        firstName: reqString,
        lastName: reqString,
        //gender: reqString,
        //dateOfBirth: reqString,
        categories: reqArray
    }
)

const initialValues = {
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    bio: '',
    categories: []
}

const UpdateProfileForm = ({done}: IProps) => {
    const dispatch = useDispatch()

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const toSave = {}

        post('', toSave,
            (data) => {
                Toast.info("Your profile has been updated successfully")
                actions.resetForm()
                dispatch({
                    type: '',
                    payload: {...data}
                })
                if (done) {
                    done()
                }
            },
            () => Toast.error("Unable to update your profile. Please try again later"),
            () => {
                actions.setSubmitting(false)
            }
        )
    }

    return (
        <XForm
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12} sm={4}>
                    <XTextInput
                        name="firstName"
                        label={"First name"}
                        type={"text"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <XTextInput
                        name="middleName"
                        label={"Middle name"}
                        type={"text"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <XTextInput
                        name="lastName"
                        label={"Last name"}
                        type={"text"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box mt={2}>
                        <XRadioInput
                            helperText={"Your gender will help us give you the most relevant content."}
                            label={"Gender"}
                            name={"gender"}
                            options={Options.GENDER}/>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <XDateInput
                        disableFuture={true}
                        label={"Date of birth"}
                        name={"dateOfBirth"}
                        variant={"standard"}
                    />
                    <FormHelperText>The date of birth will help us give you age appropriate content.</FormHelperText>
                </Grid>

                <Grid item xs={12}>
                    <XSelectInput
                        label={"Select one or more categories"}
                        multiple={true}
                        name={"categories"}
                        options={Options.USER_CATEGORIES}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextAreaInput
                        name={"bio"}
                        rows={4}
                        rowsMax={28}
                        label={"Short description about you"}
                        variant={"standard"}
                        margin={"none"}
                    />
                    <FormHelperText>Say a few things about you that make you stand out of the crowd.</FormHelperText>
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateProfileForm