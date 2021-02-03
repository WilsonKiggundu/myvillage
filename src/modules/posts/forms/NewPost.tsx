import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import {reqString} from "../../../data/validations";
import XForm from "../../../components/forms/XForm";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";
import {getProfile} from "../../../services/User";
import {IPost} from "../../../interfaces/IPost";
// import {addPost} from "../postsSlice";
import {IPerson} from "../../profiles/people/IPerson";
import {addPost, savePostAction} from "../redux/postsActions";
import {userSelector} from "../../../data/coreSelectors";

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

const NewPost = ({onClose}: IProps) => {
    const dispatch = useDispatch()

    const user = useSelector(userSelector);

    const handleSubmit = async (values: IPost, actions: FormikHelpers<any>) => {
        values.authorId = user.profile.sub

        try {
            dispatch(addPost(values))
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