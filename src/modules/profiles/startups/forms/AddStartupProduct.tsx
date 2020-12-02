import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {reqString} from "../../../../data/validations";
import {useDispatch} from "react-redux";
import {makeUrl, post, put} from "../../../../utils/ajax";
import Toast from "../../../../utils/Toast";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../components/inputs/XTextAreaInput";
import Box from "@material-ui/core/Box";
import XDateInput from "../../../../components/inputs/XDateInput";
import {Endpoints} from "../../../../services/Endpoints";
import {IPerson} from "../../people/IPerson";
import {getUser} from "../../../../services/User";
import XSelectInput from "../../../../components/inputs/XSelectInput";
import {Options} from "../../../../utils/options";
import {IStartup} from "../../../../interfaces/IStartup";
import XFileInput from "../../../../components/inputs/XFileInput";
import {IProduct} from "../../../../interfaces/IProduct";

interface IProps {
    done?: () => any
    profile?: IStartup
    product?: IProduct
}

const schema = yup.object().shape(
    {
        name: reqString,
        description: reqString
    }
)

const AddStartupProduct = ({done, profile, product}: IProps) => {
    const dispatch = useDispatch()

    const initialValues = {...product}

    useEffect(() => {

    }, [])

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const url = makeUrl("Profiles", Endpoints.business.product)

        values.businessId = profile?.id

        if (product && product.id) {
            put(url + "/" + product.id, values, (data) => {
                    Toast.info("Your product has been updated successfully successfully")
                    dispatch({
                        type: '',
                        payload: {...data}
                    })
                    if (done) {
                        done()
                    }
                }, err => {
                    Toast.error("Unable to update your startup. Please try again later")
                },
                () => {
                    actions.setSubmitting(false)
                })
        } else {
            post(url, values,
                (data) => {
                    Toast.info("Your product has been added successfully successfully")
                    actions.resetForm()
                    dispatch({
                        type: '',
                        payload: {...data}
                    })
                    if (done) {
                        done()
                    }
                },
                (err) => {
                    Toast.error("Unable to add your product. Please try again later")
                },
                () => {
                    actions.setSubmitting(false)
                }
            )
        }
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

                <Grid item xs={12}>
                    <XFileInput name={"attachments"} />
                </Grid>

            </Grid>

        </XForm>
    )
}

export default AddStartupProduct