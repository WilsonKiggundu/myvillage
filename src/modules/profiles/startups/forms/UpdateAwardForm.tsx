import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqString} from "../../../../data/validations";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../components/inputs/XTextAreaInput";
import {IAward} from "../../../../interfaces/IAward";
import {IStartup} from "../../../../interfaces/IStartup";
import XDateInput from "../../../../components/inputs/XDateInput";

interface IProps {
    onClose?: () => any
    id?: string
    profile: IStartup
    award?: IAward
}

const schema = yup.object().shape(
    {
        awardedBy: reqString,
        title: reqString,
        description: reqString
    }
)

const UpdateAwardForm = ({onClose, id, award, profile}: IProps) => {

    const initialValues = {
        date: new Date().toISOString(),
        description: "Some details about the award",
        awardedBy: "Someone gave it to me",
        title: "Sample title"
    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
        try {
            // const resultAction: any = await dispatch(addAward(values))
            // unwrapResult(resultAction)
        } catch (e: any) {

        }

        if (onClose) onClose()
    }

    return (
        <XForm
            debug={false}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XTextInput
                        label={"Title"}
                        name={"title"}
                        helperText={"Ex. Winner of top 100 SMEs 2020"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextInput
                        label={"Who gave you the award?"}
                        name={"awardedBy"}
                        helperText={"Required"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XDateInput
                        label={"Date of award"}
                        name={"date"}
                        helperText={"Date when you received the award"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextAreaInput
                        rows={3}
                        rowsMax={12}
                        label={"Description"}
                        name={"description"}
                        helperText={"Required"}
                    />
                </Grid>

            </Grid>

        </XForm>
    )
}

export default UpdateAwardForm
