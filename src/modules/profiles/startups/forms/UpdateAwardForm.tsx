import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqArray, reqString} from "../../../../data/validations";
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../components/inputs/XTextAreaInput";
import {makeUrl, post} from "../../../../utils/ajax";
import {Endpoints} from "../../../../services/Endpoints";
import Toast from "../../../../utils/Toast";
import {IAward} from "../../../../interfaces/IAward";
import {IStartup} from "../../../../interfaces/IStartup";
import XDateInput from "../../../../components/inputs/XDateInput";

interface IProps {
    done?: () => any
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

const UpdateAwardForm = ({done, id, award, profile}: IProps) => {
    const dispatch = useDispatch()

    const initialValues = {...award}

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const url = makeUrl("Profiles", Endpoints.business.base)
        //values.personId = person.id

        post(url, values,
            (data) => {
                Toast.info("Your eduction has been updated successfully")
                actions.resetForm()
                dispatch({
                    type: '',
                    payload: {...data}
                })
                if (done) {
                    done()
                }
            },
            () => Toast.error("Unable to update your education. Please try again later"),
            () => {
                actions.setSubmitting(false)
            }
        )
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