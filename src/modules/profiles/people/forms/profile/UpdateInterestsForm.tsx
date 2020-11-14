import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqArray} from "../../../../../data/validations";
import {useDispatch} from "react-redux";
import {post} from "../../../../../utils/ajax";
import Toast from "../../../../../utils/Toast";
import {Grid} from "@material-ui/core";
import XSelectInput from "../../../../../components/inputs/XSelectInput";
import {Options} from "../../../../../utils/options";
import {Interests} from "../../../../../data/mockData";

interface IProps {
    done?: () => any
}

const schema = yup.object().shape(
    {
        interests: reqArray
    }
)

const initialValues = {
    interests: Interests.map(m => m.id)
}

const UpdateInterestsForm = ({done}: IProps) => {
    const dispatch = useDispatch()

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
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XSelectInput
                        multiline={true}
                        label={"Select one or more categories"}
                        multiple={true}
                        name={"interests"}
                        options={Interests}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateInterestsForm