import XForm from "../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useState} from "react";
import * as yup from "yup"
import {reqString} from "../../../data/validations";
import {useDispatch, useSelector} from "react-redux";
import {Grid, FormControlLabel, FormLabel, RadioGroup, FormControl, Radio, FormHelperText} from "@material-ui/core";
import XTextInput from "../../../components/inputs/XTextInput";
import {userSelector} from "../../../data/coreSelectors";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {IEvent} from "../../../interfaces/IEvent";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";
import {putAsync} from "../../../utils/ajax";
import {putEvent} from "../redux/eventsEndpoints";
interface IProps {
    onClose?: () => any
    event: IEvent
}

const schema = yup.object().shape(
    {
        challengesFaced: reqString,
        achievements: reqString,
        lessonsLearnt: reqString
    }
)

const RateEvent = ({onClose, event}: IProps) => {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const initialValues: any = {
        challengesFaced: event?.challengesFaced,
        lessonsLearnt: event?.lessonsLearnt,
        achievements: event?.achievements,
        id: event?.id
    }

    const handleChange = (event : any) => {
        // setLevel(event.target.value);
    };

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        let updatedEvent = event

        updatedEvent.challengesFaced = values.challengesFaced
        updatedEvent.lessonsLearnt = values.lessonsLearnt
        updatedEvent.achievements = values.achievements

        await putEvent(updatedEvent)

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
                <Grid item xs={12}>
                    <XTextAreaInput
                        name={"achievements"}
                        rows={2}
                        rowsMax={28}
                        label={"Achievements"}
                        placeholder={"What would you way were the achievements from the event?"}
                        variant={"outlined"}
                        margin={"none"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextAreaInput
                        name={"lessonsLearnt"}
                        rows={2}
                        rowsMax={28}
                        label={"Lessons learnt"}
                        placeholder={"What lessons did you learn?"}
                        variant={"outlined"}
                        margin={"none"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextAreaInput
                        name={"challengesFaced"}
                        rows={2}
                        rowsMax={28}
                        label={"Challenges faced"}
                        placeholder={"What challenges did you face?"}
                        variant={"outlined"}
                        margin={"none"}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default RateEvent