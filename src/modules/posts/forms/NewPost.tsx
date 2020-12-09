import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom"
import {Grid} from "@material-ui/core";
import {reqString} from "../../../data/validations";
import XForm from "../../../components/forms/XForm";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";
import {getUser} from "../../../services/User";
import {IPost} from "../../../interfaces/IPost";
import {makeUrl, post} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import Toast from "../../../utils/Toast";
import {addEvent} from "../../events/eventSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {addPost} from "../postsSlice";
import {format} from "date-fns";

interface IProps {
    done?: () => any
    onClose?: () => any
}

const schema = yup.object().shape(
    {
        details: reqString
    }
)

const initialValues = {
    details: '',
}

const NewPost = ({done, onClose}: IProps) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = getUser();

    const handleSubmit = async (values: IPost, actions: FormikHelpers<any>) => {
        values.authorId = user.profile.sub
        values.dateCreated = format(new Date(), "yyyy-MM-dd HH:mm:ss")

        try {
            const resultAction: any = await dispatch(addPost(values))
            unwrapResult(resultAction)
        }catch (e) {

        } finally {
            actions.resetForm()
            if (onClose) {
                onClose()
            }
        }
    }

    return (
        <XForm
            debug={false}
            submitButtonLabel={"Post"}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>

                <Grid item xs={12}>
                    <XTextAreaInput
                        name={"details"}
                        autoFocus={true}
                        variant={"standard"}
                        label={"What's on your mind?"}
                        helperText={"Press enter / return key to start a new line"}
                        multiline
                        rows={6}
                        rowsMax={12}
                    />
                </Grid>


            </Grid>

        </XForm>
    )
}

export default NewPost