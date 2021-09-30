import {Box, Card, CircularProgress, Container, Grid} from "@material-ui/core";
import React, {useState} from "react";
import JobFormModel from "./models/JobFormModel";
import InitialValues from "./models/InitialValues";
import ValidationSchema from './models/ValidationSchema'

import './CreateJob.css'

import JobAttachments from "./forms/JobAttachments";
import JobBenefits from "./forms/JobBenefits";
import JobDescription from "./forms/JobDescription";
import JobOverview from "./forms/JobOverview";
import JobQualifications from "./forms/JobQualifications";
import {Form, Formik} from "formik";
import {makeUrl, postAsync, postFileAsync} from "../../utils/ajax";
import {IUpload} from "../../interfaces/IUpload";
import {Endpoints} from "../../services/Endpoints";
import {addJob} from "./redux/jobsActions";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import JobSkills from "./forms/JobSkills";
import JobExperience from "./forms/JobExperience";
import {Urls} from "../../routes/Urls";
import { useHistory } from "react-router-dom";
import {postJob} from "./redux/jobsEndpoints";
import {ADD_JOB} from "./redux/jobsReducer";
import Toast from "../../utils/Toast";
import Button from "@material-ui/core/Button";
import {handleLogin} from "../../utils/authHelpers";

interface IProps {

}

const CreateJob = (props: IProps) => {
    const user = useSelector(userSelector)

    if (!user){
        handleLogin()
    }

    const {formId, formField} = JobFormModel
    const dispatch = useDispatch()
    const history = useHistory()

    const currentValidationSchema = ValidationSchema[0];
    const [files, setFiles] = useState<any>([])

    const initialValues = {
        location: '',
        title: '',
        category: '',
        skills: '',
        benefits: '',
        deadline: '',
        qualifications: '',
        details: '',
        company: '',
        experience: '',
        jobType: '',
        maxSalary: '',
        minSalary: '',
        replyEmail: user?.profile.email
    }

    const handleSubmit = async (values: any, actions: any) => {
        // actions.setSubmitting(true)

        // upload the files
        let uploads: IUpload[] = []
        if (files.length) {
            await Promise.all(files.map(async (file: any) => {
                const {body}: any = await postFileAsync(file)
                const upload: any = {
                    name: body.attachment_file_name,
                    path: Endpoints.cdn.base + body.path
                }

                uploads.push(upload)

            }))
        }

        const {id, name} = values.company

        const job: any = {
            category: {
                id: values.category
            },
            companyId: id ?? name,
            deadline: values.deadline,
            details: values.details,
            benefits: values.benefits,
            experience: values.experience,
            jobType: values.jobType,
            location: values.location,
            maxSalary: values.maxSalary,
            minSalary: values.minSalary,
            profileId: user.profile.sub,
            qualifications: values.qualifications,
            skills: values.skills,
            title: values.title,
            replyEmail: values.replyEmail,
            uploads,
        }

        try {
            const response = await postJob(job)

            // dispatch({
            //     type: ADD_JOB,
            //     payload: response
            // })

            Toast.success("Job added successfully")
            // history.push(Urls.jobs.list)

        } catch (e) {
            Toast.error("An error occurred while adding the job.", "bottom-center")
        } finally {
            // actions.resetForm()
            // window.location.replace(Urls.jobs.list)
        }

    }

    const handleDragDrop = (files: any) => {
        if (files.length) {
            setFiles(files)
        }
    }

    return (
        <Container maxWidth={"md"}>
            <Formik
                initialValues={initialValues}
                validationSchema={currentValidationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form id={formId}>
                        <JobOverview formField={formField}/>
                        <JobDescription formField={formField}/>
                        <JobQualifications formField={formField}/>
                        <JobSkills formField={formField}/>
                        <JobBenefits formField={formField}/>
                        <JobAttachments onDragDrop={handleDragDrop} formField={formField}/>

                        <Box mb={2}>
                            <Card>
                                <Box mt={2} mb={2} mr={2} ml={2}>
                                    <Grid spacing={2} justify={"center"} container>
                                        <Grid item>
                                            <Button
                                                color={"inherit"}
                                                size={"large"}
                                                onClick={() => history.go(-1)}
                                                variant={"outlined"}
                                            >Cancel</Button>
                                        </Grid>
                                        <Grid item>
                                            {isSubmitting ?
                                                <CircularProgress variant={"indeterminate"}/> :
                                                <Button
                                                    type="submit"
                                                    disableElevation
                                                    size={"large"}
                                                    variant={"contained"}
                                                    color={"secondary"}
                                                >
                                                    Post Job
                                                </Button>
                                            }
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Card>
                        </Box>

                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default CreateJob
