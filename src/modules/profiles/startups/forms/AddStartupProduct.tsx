import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect} from "react";
import * as yup from "yup"
import {reqString} from "../../../../data/validations";
import {useDispatch} from "react-redux";
import {makeUrl, post, put} from "../../../../utils/ajax";
import Toast from "../../../../utils/Toast";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../components/inputs/XTextAreaInput";
import {Endpoints} from "../../../../services/Endpoints";
import {IStartup} from "../../../../interfaces/IStartup";
import XFileInput from "../../../../components/inputs/XFileInput";
import {IProduct} from "../../../../interfaces/IProduct";
import {unwrapResult} from "@reduxjs/toolkit";
import {addProduct, updateProduct} from "../startupSlice";

interface IProps {
    onClose?: () => any
    profile?: IStartup
    product?: IProduct
}

const schema = yup.object().shape(
    {
        name: reqString,
        description: reqString
    }
)

const AddStartupProduct = ({onClose, profile, product}: IProps) => {
    const dispatch = useDispatch()

    const initialValues = {...product}

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        values.businessId = profile?.id

        try {
            if (product && product.id) {
                const resultAction: any = await dispatch(updateProduct(values))
                unwrapResult(resultAction)
            } else {
                const resultAction: any = await dispatch(addProduct(values))
                unwrapResult(resultAction)
            }
        } catch (e) {

        }

        if (onClose) onClose()
    }

    return (
        <XForm
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XTextInput
                        name="name"
                        label={"Product name"}
                        type={"text"}
                        helperText={"Required"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextAreaInput
                        name="description"
                        rows={6}
                        label={"Say something brief about your product..."}
                        helperText={"Say as much as you can. Required"}
                        type={"text"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

            </Grid>

        </XForm>
    )
}

export default AddStartupProduct