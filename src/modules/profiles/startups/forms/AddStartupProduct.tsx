import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqString} from "../../../../data/validations";
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../components/inputs/XTextAreaInput";
import {IStartup} from "../../../../interfaces/IStartup";
import {IProduct} from "../../../../interfaces/IProduct";
import {addStartupProduct, editStartupProduct} from "../redux/startupsActions";

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
        dispatch(product?.id ? editStartupProduct(values) : addStartupProduct(values))
        actions.resetForm()
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
                        rowsMax={12}
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