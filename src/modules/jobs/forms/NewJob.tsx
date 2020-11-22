import {FormikHelpers} from "formik";
import React, {createRef, useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {Grid, TextField} from "@material-ui/core";
import {reqDate, reqString} from "../../../data/validations";
import XForm from "../../../components/forms/XForm";
import Box from "@material-ui/core/Box";
import {DropzoneArea} from "material-ui-dropzone";
import CreateDialog from "../../../components/dialogs/CreateDialog";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {globalStyles} from "../../../theme/styles";
import XTextInput from "../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";
import XDateInput from "../../../components/inputs/XDateInput";
import XTimeInput from "../../../components/inputs/XTimeInput";
import {addDays, addHours, format} from "date-fns";
import XCheckBoxInput from "../../../components/inputs/XCheckBoxInput";
import XSelectDropdown from "../../../components/inputs/XSelectDropdown";
import XSelectInput from "../../../components/inputs/XSelectInput";
import {IOption} from "../../../components/inputs/inputHelpers";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import AttachmentIcon from '@material-ui/icons/Attachment';
import XFileInput from "../../../components/inputs/XFileInput";
import Chip from "@material-ui/core/Chip";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import Quill from "quill";

interface IProps {
    done?: () => any
}

const schema = yup.object().shape(
    {
        title: reqString,
        details: reqString,
        category: reqString,
        country: reqString
    }
)

const initialValues = {
    title: '',
    details: '',
    category: 1,
    country: 2,
    date: addDays(new Date(), 14),
    attachments: []
}

const NewJob = ({done}: IProps) => {
    const dispatch = useDispatch()

    const categories: IOption[] = [
        {id: 1, name: "Full time"},
        {id: 2, name: "Part time"},
        {id: 3, name: "Consultant"},
    ]

    const location: IOption[] = [
        {id: 1, name:"Remote"},
        {id: 2, name:"Uganda"},
        {id: 3, name:"Kenya"},
        {id: 4, name:"Tanzania"},
    ]

    let editor: Quill | undefined = undefined
    const container = createRef<any>()

    useEffect(() => {

        const toolbarOptions = [
            [{'header': [2, false]}],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'indent': '-1'}, {'indent': '+1'}],
        ];

        editor = new Quill(container.current, {
            theme: 'snow',
            placeholder: "Details of the job...",
            readOnly: false,
            formats: [
                'header', 'underline', 'blockquote',
                'bold', 'italic', 'list', 'script', 'indent', 'align'
            ],
            modules: {
                toolbar: toolbarOptions
            }
        })

        const delta: any = {
            ops: []
        }

        editor.setContents(delta)
    })


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
            submitButtonLabel={"Add Job"}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XTextInput
                        name={"title"}
                        multiline={false}
                        autoFocus={true}
                        variant={"standard"}
                        label={"Add title"}
                        helperText={"Ex. Senior Software Engineer"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XDateInput
                        disablePast
                        name={"date"}
                        label={"Application deadline"}
                        helperText={"Defaults to 2 weeks from now"}
                        pickerVariant={"dialog"}
                        variant={"standard"}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <XSelectInput
                        helperText={"Ex. Uganda, Kenya, Remote"}
                        options={location}
                        name={"country"}
                        label={"Country"}
                        variant={"standard"}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <XSelectInput
                        helperText={"Ex. Consultant, Full time"}
                        name={"category"}
                        label={"Job category"}
                        multiple={false}
                        options={categories}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box mt={2}>
                        <div ref={container}/>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <XFileInput name={"attachments"} />
                </Grid>
            </Grid>
        </XForm>
    )
}

export default NewJob