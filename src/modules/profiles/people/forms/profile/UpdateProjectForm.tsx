import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqString} from "../../../../../data/validations";
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../../components/inputs/XTextInput";
import XSelectInputCreatable from "../../../../../components/inputs/XSelectInputCreatable";
import {addPersonProject, editPersonProject} from "../../redux/peopleActions";
import {userSelector} from "../../../../../data/coreSelectors";
import {IProject} from "../../../../../interfaces/IProject";
import XRichTextArea from "../../../../../components/inputs/XRichTextArea";
import XTextAreaInput from "../../../../../components/inputs/XTextAreaInput";

interface IProps {
    onClose?: () => any
    project?: IProject
}

const schema = yup.object().shape(
    {
        title: reqString,
        from: reqString,
        role: reqString,
        description: reqString
    }
)

const UpdateProjectForm = ({onClose, project}: IProps) => {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const initialValues : IProject = {
        personId: user.profile.sub,
        description: project?.description ?? '',
        from: project?.from ?? '',
        role: project?.role ?? '',
        title: project?.title ?? '',
        client: project?.client ?? '',
        url: project?.url ?? '',
        linkToGitRepo: project?.linkToGitRepo ?? '',
        until: project?.until ?? '',
        techStack: project?.techStack ?? '',
    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        if (project?.id) {
            values.id = project.id
            dispatch(editPersonProject(values))
        } else {
            dispatch(addPersonProject(values))
        }

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
                <Grid item xs={12} md={6}>
                    <XTextInput
                        variant={"filled"}
                        label={"Name *"}
                        placeholder={"Name of the project"}
                        name={"title"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        variant={"outlined"}
                        label={"Client"}
                        placeholder={"Name of the client"}
                        name={"client"}
                        helperText={"Optional"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        variant={"filled"}
                        label={"Role *"}
                        placeholder={"What is/was your role on the project?"}
                        name={"role"}
                        helperText={"Ex. Backend engineer, UI/UX designer"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        variant={"filled"}
                        label={"Since *"}
                        placeholder={"Month, Year"}
                        helperText={"When did you start working on the project?"}
                        name={"from"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <p><strong>Description *</strong></p>
                    <XRichTextArea
                        rows={1}
                        multiline={true}
                        rowsMax={4}
                        label={"Description"}
                        name={"description"}
                        placeholder={"Description"}
                        helperText={"Write a brief description about the project"}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <XTextInput
                        variant={"outlined"}
                        placeholder={"Link to live environment"}
                        label={"Project Url"}
                        name={"url"}
                        helperText={"Link to the deployed solution. Ignore if not applicable"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        variant={"outlined"}
                        placeholder={"Link to GIT repository"}
                        label={"Git Repo"}
                        name={"linkToGitRepo"}
                        helperText={"Link to the repository solution. Ignore if not applicable"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextAreaInput
                        multiline
                        variant={"outlined"}
                        label={"Tech Stack"}
                        name={"techStack"}
                        helperText={"Ignore if not applicable"}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateProjectForm