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
import {getProfile, getUser} from "../../../../services/User";
import XSelectInput from "../../../../components/inputs/XSelectInput";
import {Options} from "../../../../utils/options";
import {IStartup} from "../../../../interfaces/IStartup";
import {addStartup} from "../startupsSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {IPerson} from "../../people/IPerson";
import {updateStartup} from "../startupSlice";

interface IProps {
    onClose?: () => any
    profile?: IStartup
}

const schema = yup.object().shape(
    {
        name: reqString,
        description: reqString,
        numberOfEmployees: reqString,
        dateOfIncorporation: reqString,
        category: reqString
    }
)


const UpdateStartupDetails = ({onClose, profile}: IProps) => {
    const dispatch = useDispatch()

    const user: IPerson = getProfile()
    const initialValues = {...profile}

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        values.createdBy = user.id

        try {
            if (profile && profile.id) {
                const resultAction: any = await dispatch(updateStartup(values))
                unwrapResult(resultAction)
            } else {
                const resultAction: any = await dispatch(addStartup(values))
                unwrapResult(resultAction)
            }
        } catch (e) {

        } finally {
            if (onClose) onClose()
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
                        label={"What is the name of your startup?"}
                        type={"text"}
                        helperText={"Ensure you spell it correctly to increase visibility. Required"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextInput
                        name="category"
                        label={"How do you categorize your startup?"}
                        helperText={"Ex. FinTech, AgriTech, Services"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextAreaInput
                        name="description"
                        rows={6}
                        label={"Say something brief about your startup..."}
                        helperText={"Say as much as you can about your startup to capture the attention of the community. Required"}
                        type={"text"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>


                <Grid item xs={12}>
                    <Box mt={2}>
                        <XTextInput
                            helperText={"Month, Year"}
                            label={"Date of Incorporation"}
                            placeholder={"month, year"}
                            name={"dateOfIncorporation"}/>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <XTextInput
                        name="numberOfEmployees"
                        label={"How many employees do you have?"}
                        helperText={"It's fine if you just put an approximate number. Required"}
                        type={"text"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <XTextInput
                        name={"website"}
                        label={"Enter the website url"}
                        helperText={"A website is a quick place people can learn more about your startup"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateStartupDetails