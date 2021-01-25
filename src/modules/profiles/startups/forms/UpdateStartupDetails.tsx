import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqString} from "../../../../data/validations";
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../components/inputs/XTextAreaInput";
import Box from "@material-ui/core/Box";
import {getProfile} from "../../../../services/User";
import {IStartup} from "../../../../interfaces/IStartup";
import {IPerson} from "../../people/IPerson";
import {addStartup, editStartup} from "../redux/startupsActions";
import {userSelector} from "../../../../data/coreSelectors";

interface IProps {
    onClose?: () => any
    profile?: IStartup
}

const schema = yup.object().shape(
    {
        name: reqString,
        description: reqString,
        employeeCount: reqString,
        incorporationDate: reqString,
        category: reqString
    }
)


const UpdateStartupDetails = ({onClose, profile}: IProps) => {
    const dispatch = useDispatch()

    const user = useSelector(userSelector)
    const initialValues = {
        name: profile?.name,
        category: profile?.category,
        description: profile?.description,
        employeeCount: profile?.employeeCount,
        incorporationDate: profile?.incorporationDate,
        website: profile?.website,
        coverPhoto: profile?.coverPhoto,
        avatar: profile?.avatar
    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        values.createdBy = user.profile.sub
        values.id = profile?.id

        try {
            dispatch(profile && profile.id ? editStartup(values) : addStartup(values))
        } catch (e) {

        } finally {
            if (onClose) onClose()
        }
    }

    return (
        <XForm
            schema={schema}
            debug={false}
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
                            name={"incorporationDate"}/>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <XTextInput
                        name="employeeCount"
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