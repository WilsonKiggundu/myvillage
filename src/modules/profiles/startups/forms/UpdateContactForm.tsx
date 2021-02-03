import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqString} from "../../../../data/validations";
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../components/inputs/XTextAreaInput";
import {IContact} from "../../../../interfaces/IContact";
import {IStartup} from "../../../../interfaces/IStartup";
import {unwrapResult} from "@reduxjs/toolkit";
import XSelectInput from "../../../../components/inputs/XSelectInput";
import {Options} from "../../../../utils/options";
import {addStartupContact, editStartupContact} from "../redux/startupsActions";
import Toast from "../../../../utils/Toast";

interface IProps {
    onClose?: () => any
    profile: IStartup
    contact?: IContact
}

const schema = yup.object().shape(
    {
        type: reqString,
        value: reqString
    }
)

const UpdateContactForm = ({onClose, contact, profile}: IProps) => {
    const dispatch = useDispatch()

    const initialValues = {...contact}

    const handleSubmit = async (values: IContact, actions: FormikHelpers<any>) => {
        try {
            values.belongsTo = profile.id

            if(contact?.id){
                dispatch(editStartupContact(values))
            }else
            {
                dispatch(addStartupContact(values))
            }


        } catch (e) {

        } finally {
            actions.resetForm()
            if (onClose) onClose()
        }
    }

    return (
        <XForm
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12} sm={6}>
                    <XSelectInput
                        label={"Type"}
                        name={"type"}
                        multiple={false}
                        options={Options.CONTACT_TYPES}
                        helperText={"Ex. Telephone"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XSelectInput
                        label={"Category"}
                        name={"category"}
                        multiple={false}
                        options={Options.CONTACT_CATEGORIES}
                        helperText={"Ex. Primary, Alternative"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextInput
                        label={"Value"}
                        name={"value"}
                        helperText={"Ex. someone@email.com"}/>
                </Grid>

                <Grid item xs={12}>
                    <XTextAreaInput
                        rows={1}
                        rowsMax={3}
                        label={"Details"}
                        name={"details"}
                        helperText={"Any additional information about the contact"}/>
                </Grid>

            </Grid>

        </XForm>
    )
}

export default UpdateContactForm