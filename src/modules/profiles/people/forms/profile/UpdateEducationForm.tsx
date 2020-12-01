import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqArray, reqString} from "../../../../../data/validations";
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import {IEducation} from "../../../../../interfaces/IEducation";
import {IOption} from "../../../../../components/inputs/inputHelpers";
import XTextInput from "../../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../../components/inputs/XTextAreaInput";
import {IPerson} from "../../IPerson";
import {makeUrl, post} from "../../../../../utils/ajax";
import {Endpoints} from "../../../../../services/Endpoints";
import Toast from "../../../../../utils/Toast";

interface IProps {
    done?: () => any
    id?: string
    person: IPerson
    education?: IEducation
}

const schema = yup.object().shape(
    {
        awardedBy: reqString,
        title: reqString,
        startYear: reqString,
        description: reqString
    }
)



const UpdateEducationForm = ({done, id, education, person}: IProps) => {
    const dispatch = useDispatch()

    const initialValues = {...education}

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const url = makeUrl("Profiles", Endpoints.person.award)
        values.personId = person.id

        post(url, values,
            (data) => {
                Toast.info("Your eduction has been updated successfully")
                actions.resetForm()
                dispatch({
                    type: '',
                    payload: {...data}
                })
                if (done) {
                    done()
                }
            },
            () => Toast.error("Unable to update your education. Please try again later"),
            () => {
                actions.setSubmitting(false)
            }
        )
    }

    return (
        <XForm
            debug={false}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XTextInput
                        label={"School"}
                        name={"awardedBy"}
                        helperText={"Ex. Makerere University Kampala. Required"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        label={"Degree"}
                        name={"title"}
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
                <Grid item xs={12} md={6}>
                    <XTextInput
                        label={"Start year"}
                        name={"startYear"}
                        helperText={"Ex. 2007. Optional"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        label={"End year (or expected)"}
                        name={"endYear"}
                        helperText={"Ex. 2011. Optional"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        label={"Grade"}
                        name={"grade"}
                        helperText={"Ex. First class honors. Optional"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
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