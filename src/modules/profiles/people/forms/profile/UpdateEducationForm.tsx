import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqString} from "../../../../../data/validations";
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import {IEducation} from "../../../../../interfaces/IEducation";
import XTextInput from "../../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../../components/inputs/XTextAreaInput";
import {IPerson} from "../../IPerson";
import {makeUrl, post} from "../../../../../utils/ajax";
import {Endpoints} from "../../../../../services/Endpoints";
import Toast from "../../../../../utils/Toast";
import {getProfile} from "../../../../../services/User";
import {addEducation, addCategory} from "../../personSlice";
import {unwrapResult} from "@reduxjs/toolkit";

interface IProps {
    onClose?: () => any
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


const UpdateEducationForm = ({onClose, id, education, person}: IProps) => {
    const dispatch = useDispatch()

    const initialValues = {...education}

    const handleSubmit = async (values: IEducation, actions: FormikHelpers<any>) => {
        values.personId = person.id

        try {
            const resultAction: any = await dispatch(addEducation(values))
            unwrapResult(resultAction)

            if (onClose) onClose()
        } catch (e) {

        }
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