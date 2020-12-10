import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import {reqString} from "../../../data/validations";
import XForm from "../../../components/forms/XForm";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";
import {getUser} from "../../../services/User";
import {IPost} from "../../../interfaces/IPost";
import {IComment} from "../../../interfaces/IComment";
import {unwrapResult} from "@reduxjs/toolkit";
import {addComment} from "../postsSlice";

interface IProps {
    done?: () => any
    onClose?: () => any
    post?: IPost
}

const schema = yup.object().shape(
    {
        details: reqString
    }
)

const initialValues = {
    details: '',
}

const NewComment = ({done, onClose, ...props}: IProps) => {
    const dispatch = useDispatch()
    const user = getUser();

    const handleSubmit = async (comment: IComment, actions: FormikHelpers<any>) => {

        comment.authorId = user.profile.sub
        if (props.post) comment.postId = props.post.id

        try {
            const resultAction: any = await dispatch(addComment(comment))
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
                        label={"What do you want to say about the post?"}
                        helperText={"Press enter / return key to start a new line"}
                        multiline
                        rows={3}
                        rowsMax={12}
                    />
                </Grid>

            </Grid>

        </XForm>
    )
}

export default NewComment