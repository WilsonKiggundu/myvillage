import React, {useEffect, useState} from "react";
import {Button, Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PersonCard from "./PersonCard";
import PersonInterests from "./PersonInterests";
import PersonAwards from "./PersonAwards";
import PersonSkills from "./PersonSkills";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../../components/PleaseWait";
import PersonPosts from "./PersonPosts";
import PersonConnections from "./PersonConnections";
import {userSelector} from "../../../data/coreSelectors";
import {getWithoutLoginAsync, makeUrl, postAsync} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import {useHistory, useLocation} from "react-router-dom";
import XDialog from "../../../components/dialogs/XDialog";
import XRichTextArea from "../../../components/inputs/XRichTextArea";
import userManager from "../../../utils/userManager";
import XForm from "../../../components/forms/XForm";
import {Urls} from "../../../routes/Urls";
import {IEmailObject} from "../../../interfaces/IEmailObject";
import {sendEmail} from "../../../services/NotificationService";
import Toast from "../../../utils/Toast";
import PersonContacts from "./PersonContacts";
import {getPersonContact} from "./redux/peopleEndpoints";
import {personSelector} from "./redux/peopleSelectors";
import {APPEND_PERSON} from "./redux/peopleReducer";
import {IContact} from "../../../interfaces/IContact";
import {EmailSettings} from "../../../data/constants";
import PersonEmployment from "./PersonEmployment";
import PersonProjects from "./PersonProjects";
import PersonStack from "./PersonStack";
import {isDeveloper, isLancer} from "./IPerson";
import PersonFreelanceProfile from "./PersonFreelanceProfile";
import * as yup from "yup";
import {reqObject, reqString} from "../../../data/validations";
import PersonFreelanceProjectActions from "./PersonFreelanceProjectActions";



const Person = ({match}: any) => {
    const {id} = match.params
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const useQuery = () => {
        return new URLSearchParams(location.search)
    }

    const context = useQuery().get('context')
    const jobId = useQuery().get('jobId')
    const projectId = useQuery().get('projectId')
    const requestId = useQuery().get('requestId')
    const jobName = useQuery().get('jobName')
    const jobApplicationId = useQuery().get('applicationId')
    const jobApplicationStatus = useQuery().get('status')

    const person = useSelector((state) => personSelector(state, id))
    const [showAcceptDialog, setShowAcceptDialog] = useState<boolean>(false)

    const user = useSelector(userSelector)
    const canEdit: boolean = id === user?.profile.sub

    const [isDev, setIsDev] = useState<boolean>(false)
    const [isFreelancer, setIsFreelancer] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            try {
                const url = makeUrl("Profiles", Endpoints.person.base)
                const response: any = await getWithoutLoginAsync(url, {id})
                const person = response.body.persons[0]

                dispatch({
                    type: APPEND_PERSON,
                    payload: person
                })

            } catch (e) {
                if (e.toString().includes('Unauthorized')) {
                    await userManager.signinRedirect({
                        state: window.location.pathname + window.location.search
                    })
                }
            }
        })()
    }, [id])

    useEffect(() => {
        if (person) {
            document.title = `${person.firstname} ${person.lastname} / My Village`
            setIsDev(isDeveloper(person))
            setIsFreelancer(isLancer(person))
        }
    }, [person])

    const initialValues : any = {
        message: undefined,
        applicationId: jobApplicationId,
        jobId: jobId
    }

    const handleReject = async (jobId: string, applicationId: any) => {
        try {
            const url = makeUrl("Jobs", Endpoints.jobs.update(applicationId))
            const response: any = await postAsync(url, {status: 'rejected'})
            history.push(Urls.jobs.singleJob(jobId))
        } catch (e) {
            Toast.error(e.toString())
        }
    }

    const handleRejectFreelanceProject = async (projectId: string, personId: string) => {
        try {
            // const url = makeUrl("Jobs", Endpoints.jobs.update(applicationId))
            // const response: any = await postAsync(url, {status: 'rejected'})
            // history.push(Urls.jobs.singleJob(jobId))
        } catch (e) {
            Toast.error(e.toString())
        }
    }

    const handleRejectRequest = async (values: any, actions: any) => {}

    const handleAccept = async (values: any, actions: any) => {

        try {
            const url = makeUrl("Jobs", Endpoints.jobs.update(values.applicationId))
            await postAsync(url, {status: 'accepted'})

            const personContacts: any = await getPersonContact(id)
            const emails: IContact[] = personContacts.body.filter((contact: IContact) => contact.type === 2)

            if (emails.length) {

                const body = `<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <title>Title</title>
                        </head>
                        <body style="text-align: center; font-family: 'Montserrat', sans-serif; margin: 0; padding: 0; background-color: #f1f1f1">
                            <div style="padding: 25px; width: 100%; background-color: #1c1c1c; color: #ffffff;">
                                <h1>Congratulations! Your application has been accepted.</h1>
                            </div>
                            <div style="background-color: #ffffff; padding: 15px; margin: 0 auto; max-width: 80%">
                                <div>${values.acceptMessage}</div>
                                <p>
                                    <a style="background-color: #e98a2b; text-decoration: none; color: white; padding: 15px;" 
                                        href="${Urls.base}${Urls.jobs.singleJob(jobId)}">
                                        Open the job
                                    </a>
                                </p>
                            </div>
                            <div style="padding: 25px; font-size: 10px; color: #cccccc">
                                <p>This is an auto-generated email sent from an unmonitored emailing list. You may not reply to it directly.</p>
                            </div>
                        </body>
                    </html>`

                const recipients = emails.map((contact: IContact) => contact.value).join(',')

                const emailToSend: IEmailObject = {
                    body: body,
                    recipient: recipients,
                    senderEmail: EmailSettings.senderEmail,
                    senderName: EmailSettings.senderName,
                    subject: `Your application for the ${jobName} has been accepted`
                }

                await sendEmail(emailToSend)
            }

        } catch (e) {
            Toast.error(e.toString())
        } finally {
            setShowAcceptDialog(false)
            history.push(Urls.jobs.singleJob(values.jobId))
        }
    }

    return (
        <Container maxWidth={"md"}>
            <Grid container justify={"center"} spacing={2}>
                <Grid item xs={12}>
                    {person ? (
                        <>
                            {/*<ProfileCoverPhoto person={person}/>*/}
                            <PersonCard canEdit={canEdit} person={person}/>
                            <PersonAwards canEdit={canEdit} person={person}/>
                            <PersonEmployment person={person} canEdit={canEdit}/>
                            <PersonProjects person={person} canEdit={canEdit}/>

                            {isDev && <PersonStack person={person} canEdit={canEdit}/>}
                            {isFreelancer && <PersonFreelanceProfile person={person} canEdit={canEdit}/>}

                            <PersonInterests canEdit={canEdit} person={person}/>
                            <PersonSkills canEdit={canEdit} person={person}/>
                            <PersonConnections canEdit={canEdit} person={person}/>
                            {!isFreelancer && !canEdit && <PersonContacts canEdit={canEdit} person={person}/>}
                            <PersonPosts canEdit={canEdit} person={person}/>

                            {jobApplicationStatus === "pending" && context === 'job_application' && jobId && jobApplicationId ?
                                <div className="action-buttons-wrapper">
                                    <Grid spacing={2} alignContent={"center"} container justify={"center"}>
                                        <Grid item>
                                            <Button
                                                onClick={() => handleReject(jobId, jobApplicationId)}
                                                color={"default"}
                                                variant={"outlined"}>Reject</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                onClick={() => setShowAcceptDialog(true)}
                                                color={"secondary"} variant={"contained"}>
                                                Accept
                                            </Button>

                                            <XDialog
                                                title={"Accept application"}
                                                contentText={"Please specify the message that you want to send to the applicant. This could be details of the next steps."}
                                                open={showAcceptDialog}
                                                onClose={() => setShowAcceptDialog(false)}>

                                                <XForm
                                                    initialValues={initialValues}
                                                    submitButtonLabel={"Notify applicant"}
                                                    onSubmit={handleAccept}>
                                                    <XRichTextArea
                                                        helperText={"This will be sent via email to the applicant"}
                                                        label={"Acceptance message"}
                                                        name={"acceptMessage"}/>

                                                    {/*<Hidden>*/}
                                                    {/*    <XTextInput name={"applicationId"} />*/}
                                                    {/*</Hidden>*/}

                                                </XForm>
                                            </XDialog>

                                        </Grid>
                                    </Grid>
                                </div>
                                : ""}

                            {context === 'freelance_project' && projectId ?
                                <PersonFreelanceProjectActions
                                    requestId={requestId}
                                    person={person}
                                    projectId={projectId} />
                                : ""}

                        </>
                    ) : <PleaseWait label={"Please wait..."}/>}

                </Grid>
            </Grid>
        </Container>
    )
}

export default Person