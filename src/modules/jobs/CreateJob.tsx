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
import {postFileAsync} from "../../utils/ajax";
import {IUpload} from "../../interfaces/IUpload";
import {Endpoints} from "../../services/Endpoints";
import {addJob} from "./redux/jobsActions";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import JobSkills from "./forms/JobSkills";
import JobExperience from "./forms/JobExperience";
import {Urls} from "../../routes/Urls";

interface IProps {

}

const CreateJob = (props: IProps) => {
    const user = useSelector(userSelector)
    const {formId, formField} = JobFormModel
    const dispatch = useDispatch()

    const currentValidationSchema = ValidationSchema[0];
    const [files, setFiles] = useState<any>([])

    const handleSubmit = async (values: any, actions: any) => {
        actions.setSubmitting(true)

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

        const job: any = {
            category: {
                id: values.category
            },
            companyId: values.companyId,
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
            uploads,
        }

        console.log(job)

        try {
            dispatch(addJob(job))
        } catch (e) {

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
                initialValues={InitialValues}
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
                                    <Grid justify={"flex-end"} container>
                                        <Grid item>
                                            {isSubmitting ?
                                                <CircularProgress variant={"indeterminate"}/> :
                                                <button
                                                    type="submit"
                                                    className="CreateJob-button"
                                                >
                                                    Post Job
                                                </button>
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