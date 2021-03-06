import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import {reqDate, reqString} from "../../../data/validations";
import XForm from "../../../components/forms/XForm";
import Box from "@material-ui/core/Box";
import XTextInput from "../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";
import XDateInput from "../../../components/inputs/XDateInput";
import XTimeInput from "../../../components/inputs/XTimeInput";
import {addHours, format} from "date-fns";
import XSelectInput from "../../../components/inputs/XSelectInput";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import AttachmentIcon from '@material-ui/icons/Attachment';
import XFileInput from "../../../components/inputs/XFileInput";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import {Options} from "../../../utils/options";
import {IEvent} from "../../../interfaces/IEvent";
import {userSelector} from "../../../data/coreSelectors";
import {addEvent} from "../redux/eventsActions";
import Toast from "../../../utils/Toast";

interface IProps {
    done?: () => any
    onClose?: () => any
}

const schema = yup.object().shape(
    {
        title: reqString,
        date: reqDate,
        startTime: reqString,
        endTime: reqString
    }
)

const initialValues = {
    details: '',
    date: new Date(),
    startTime: new Date().getTime(),
    endTime: addHours(new Date(), 1).getTime(),
}

const NewEvent = ({done, onClose}: IProps) => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        const startTime = format(new Date(values.startTime), "HH:mm:ss")
        const endTime = format(new Date(values.endTime), "HH:mm:ss")
        const date = format(Date.parse(values.date), "yyyy-MM-dd")

        const startDateTime = `${date}T${startTime}`
        const endDateTime = `${date}T${endTime}`

        const event: IEvent = {
            conferenceUrl: values.conferenceUrl,
            details: values.details,
            interval: 0,
            frequency: 2,
            title: values.title,
            type: values.type,
            location: values.location,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            days: [],
            createdBy: user.profile.sub
        }

        dispatch(addEvent(event))

        actions.resetForm()
        if (onClose) {
            Toast.info("Event added successfully")
            onClose()
        }
    }

    return (
        <XForm
            debug={false}
            submitButtonLabel={"Add Event"}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>



        </XForm>
    )
}

export default NewEvent