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
    const user = useSelector(userSelector);

    const handleSubmit = async (comment: IComment, actions: FormikHelpers<any>) => {

        comment.authorId = user.profile.sub
        if (props.post) comment.postId = props.post.id

        try {
            dispatch(addComment(comment))

            const personContacts: any = await getPersonContact(props.post?.authorId)
            let emails: IContact[] = personContacts.body.filter((contact: IContact) => contact.type === 2)
            const recipient = emails.map((contact: IContact) => contact.value).join(',')

            const body = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Title</title>
                </head>
                <body style="text-align: center; font-family: 'Montserrat', sans-serif; margin: 0; padding: 0; background-color: #f1f1f1">
                    <div style="padding: 25px; width: 100%; background-color: #1c1c1c; color: #ffffff;">
                        <h1>${props.post?.author?.firstname},<br/>someone commented on your post</h1>
                    </div>
                    <div style="background-color: #ffffff; padding: 15px; margin: 0 auto; max-width: 80%">
                        <p>
                            <a style="background-color: #e98a2b; text-decoration: none; color: white; padding: 15px;" 
                                href="${Urls.base}${Urls.profiles.onePerson(comment.authorId)}">
                                View profile
                            </a>
                        </p>
                    </div>
                    <div style="padding: 25px; font-size: 10px; color: #cccccc">
                        <p>This is an auto-generated email sent from an unmonitored emailing list. You may not reply to it directly.</p>
                    </div>
                </body>
            </html>`

            const emailToSend: IEmailObject = {
                body: body,
                recipient: recipient,
                senderEmail: EmailSettings.senderEmail,
                senderName: EmailSettings.senderName,
                subject: "MyVillage news feed"
            }

            await sendEmail(emailToSend)

        } catch (e) {

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