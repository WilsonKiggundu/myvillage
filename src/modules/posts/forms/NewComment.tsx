import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import {reqString} from "../../../data/validations";
import XForm from "../../../components/forms/XForm";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";
import {getProfile, getUser} from "../../../services/User";
import {IPost} from "../../../interfaces/IPost";
import {IComment} from "../../../interfaces/IComment";
import {unwrapResult} from "@reduxjs/toolkit";
// import {addComment} from "../postsSlice";
import {IPerson} from "../../profiles/people/IPerson";
import {addComment, saveCommentAction} from "../redux/postsActions";
import {userSelector} from "../../../data/coreSelectors";
import {getPersonContact} from "../../profiles/people/redux/peopleEndpoints";
import {IContact} from "../../../interfaces/IContact";
import {Urls} from "../../../routes/Urls";
import {IEmailObject} from "../../../interfaces/IEmailObject";
import {EmailSettings} from "../../../data/constants";
import {sendEmail} from "../../../services/NotificationService";
import {IArticle} from "../../../interfaces/IArticle";

interface IProps {
    done?: () => any
    onClose?: () => any
    post?: IPost
    article?: IArticle
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
    const user = useSelector(userSelector);

    const handleSubmit = async (comment: IComment, actions: FormikHelpers<any>) => {

        comment.authorId = user.profile.sub
        if (props.post) comment.postId = props.post.id
        if (props.article) comment.articleId = props.article.id

        try {
            dispatch(addComment(comment))
        } catch (e) {

        }

        actions.resetForm()
        if (onClose) {
            onClose()
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