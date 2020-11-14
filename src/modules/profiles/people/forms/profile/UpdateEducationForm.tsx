import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqArray, reqString} from "../../../../../data/validations";
import {useDispatch} from "react-redux";
import {post} from "../../../../../utils/ajax";
import Toast from "../../../../../utils/Toast";
import {Grid} from "@material-ui/core";
import XSelectInput from "../../../../../components/inputs/XSelectInput";
import {Options} from "../../../../../utils/options";
import {Interests} from "../../../../../data/mockData";
import {IEducation} from "../../../../../interfaces/IEducation";
import {IOption} from "../../../../../components/inputs/inputHelpers";
import XTextInput from "../../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../../components/inputs/XTextAreaInput";

interface IProps {
    done?: () => any
    id?: string
}

const schema = yup.object().shape(
    {
        school: reqString,
        description: reqString
    }
)

const initialValues : IEducation = {
    description: '',
    school: '',
    activities: '',
    degree: '',
    endYear: '',
    fieldOfStudy: '',
    startYear: '',
    grade: ''
}

const UpdateEducationForm = ({done, id}: IProps) => {
    const dispatch = useDispatch()
    const years: IOption[] = []

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const toSave = {}

        // post('', toSave,
        //     (data) => {
        //         Toast.info("Your profile has been updated successfully")
        //         actions.resetForm()
        //         dispatch({
        //             type: '',
        //             payload: {...data}
        //         })
        //         if (done) {
        //             done()
        //         }
        //     },
        //     () => Toast.error("Unable to update your profile. Please try again later"),
        //     () => {
        //         actions.setSubmitting(false)
        //     }
        // )
    }

    return (
        <XForm
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XTextInput
                        label={"School"}
                        name={"school"}
                        helperText={"Ex. Makerere University Kampala. Required"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        label={"Degree"}
                        name={"degree"}
                        helperText={"Ex. BSc. Electrical Engineering. Optional"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        label={"Field of study"}
                        name={"fieldOfStudy"}
                        helperText={"Electronics and telecommunications. Required"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        label={"Start year"}
                        name={"startYear"}
                        helperText={"Ex. 2007. Optional"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        label={"End year (or expected)"}
                        name={"endYear"}
                        helperText={"Ex. 2011. Optional"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        label={"Grade"}
                        name={"grade"}
                        helperText={"Ex. First class honors. Optional"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextAreaInput
                        rows={1}
                        rowsMax={4}
                        label={"Activities"}
                        name={"activities"}
                        helperText={"Ex. Volleyball, debating club"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextAreaInput
                        rows={3}
                        rowsMax={12}
                        label={"Description"}
                        name={"description"}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateEducationForm