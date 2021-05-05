import XForm from "../../../components/forms/XForm";
import React from "react";
import * as yup from "yup";
import {reqObject, reqString} from "../../../data/validations";
import {FormikHelpers} from "formik";

const schema = yup.object().shape(
    {
        title: reqString,
    }
)

const CreateProject = () => {

    const initialValues = {}

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {}

    return (
        <XForm
            debug={false}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>

        </XForm>
    )
}

export default CreateProject