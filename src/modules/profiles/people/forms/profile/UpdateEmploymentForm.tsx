import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {reqObject, reqString} from "../../../../../data/validations";
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../../components/inputs/XTextAreaInput";
import {IPerson} from "../../IPerson";
import XSelectInputCreatable from "../../../../../components/inputs/XSelectInputCreatable";
import {getAsync, makeUrl} from "../../../../../utils/ajax";
import {Endpoints} from "../../../../../services/Endpoints";
import XSelectInput from "../../../../../components/inputs/XSelectInput";
import XRichTextArea from "../../../../../components/inputs/XRichTextArea";
import {CheckBox} from "@material-ui/icons";
import XCheckBoxInput from "../../../../../components/inputs/XCheckBoxInput";
import {months} from "../../../../../data/constants";
import {IEmployment} from "../../../../../interfaces/IEmployment";
import {userSelector} from "../../../../../data/coreSelectors";
import {addPersonEmployment, editPersonEmployment} from "../../redux/peopleActions";
// import {addPersonEmployment, editPersonEmployment} from "../../redux/peopleActions";

interface IProps {
    onClose?: () => any
    id?: string
    person: IPerson
    employment?: IEmployment
}

const schema = yup.object().shape(
    {
        company: reqString,
        title: reqString,
        from: reqString,
        description: reqString
    }
)

const UpdateEmploymentForm = ({onClose, employment}: IProps) => {

    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const initialValues : IEmployment = {
        personId: user.profile.sub,
        company: employment?.company ?? '',
        title: employment?.title ?? '',
        from: employment?.from ?? '',
        until: employment?.until ?? '',
        description: employment?.description ?? '',
    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        if (employment?.id){
            values.id = employment.id
            dispatch(editPersonEmployment(values))
        }else{
            dispatch(addPersonEmployment(values))
        }

        if (onClose) onClose()
        actions.resetForm()
    }

    return (
        <XForm
            debug={false}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        variant={"filled"}
                        label={"Company"}
                        name={"company"}
                        helperText={"Where did you work?"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        variant={"filled"}
                        label={"Job Title"}
                        name={"title"}
                        helperText={"Ex. Senior Software Engineer"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        label={"From"}
                        variant={"filled"}
                        placeholder={"year, month"}
                        name={"from"}
                        helperText={"Year when you started?"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        label={"Until"}
                        variant={"filled"}
                        placeholder={"year, month"}
                        name={"until"}
                        helperText={"Leave blank if you still work here"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <p><strong>Description</strong></p>
                    <XRichTextArea
                        rows={1}
                        multiline={true}
                        rowsMax={4}
                        label={"Description"}
                        name={"description"}
                        placeholder={"Description"}
                        helperText={""}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateEmploymentForm