import React, {useEffect, useState} from "react";
import {Button, Card, CardContent, Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PersonCard from "./PersonCard";
import PersonInterests from "./PersonInterests";
import PersonAwards from "./PersonAwards";
import PersonSkills from "./PersonSkills";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../../components/PleaseWait";
import PersonPosts from "./PersonPosts";
import ProfileCoverPhoto from "../ProfileCoverPhoto";
import PersonConnections from "./PersonConnections";
import {userSelector} from "../../../data/coreSelectors";
import {getAsync, makeUrl, postAsync} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import {useLocation, useHistory} from "react-router-dom";
import XDialog from "../../../components/dialogs/XDialog";
import XRichTextArea from "../../../components/inputs/XRichTextArea";
import userManager from "../../../utils/userManager";
import XForm from "../../../components/forms/XForm";
import {IPerson} from "./IPerson";
import {Urls} from "../../../routes/Urls";
import {IEmailObject} from "../../../interfaces/IEmailObject";
import {sendEmail} from "../../../services/NotificationService";
import Toast from "../../../utils/Toast";
import PersonContacts from "./PersonContacts";
import {getPersonContact} from "./redux/peopleEndpoints";
import {personSelector} from "./redux/peopleSelectors";
import {loadPeople, loadPeopleSuccess} from "./redux/peopleActions";
import {APPEND_PERSON, FETCH_PEOPLE_SUCCEEDED} from "./redux/peopleReducer";

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
    const jobApplicationId = useQuery().get('applicationId')

    // const [person, setPerson] = useState<IPerson | undefined>(undefined)
    const person = useSelector((state) => personSelector(state, id))
    const [showAcceptDialog, setShowAcceptDialog] = useState<boolean>(false)

    const user = useSelector(userSelector)
    const canEdit: boolean = id === user?.profile.sub

    useEffect(() => {
        (async () => {
            try {
                const url = makeUrl("Profiles", Endpoints.person.base)
                const response: any = await getAsync(url, {id})
                const person = response.body.persons[0]

                dispatch({
                    type: APPEND_PERSON,
                    payload: person
                })

                // setPerson(person)

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
        }
    }, [person])

    const initialValues = {
        acceptMessage: ''
    }

    const handleReject = async (jobId: string, applicationId: any) => {
        try{
            const url = makeUrl("Jobs", Endpoints.jobs.update(applicationId))
            const response: any = await postAsync(url, {status: 'rejected'})
            history.push(Urls.jobs.singleJob(jobId))
        }catch (e) {
            Toast.error(e.toString())
        }
    }

    const handleAccept = async (values: any, actions: any) => {
        try{
            const contactResponse: any = await getPersonContact(id)

            console.log(contactResponse)

            const emailToSend: IEmailObject = {
                body: values.acceptMessage,
                recipient: "wkiggundu@innovationvillage.co.ug",
                senderEmail: process.env.REACT_APP_SENDER_EMAIL || "",
                senderName: process.env.REACT_APP_SENDER_NAME || "",
                subject: "Job application accepted"
            }

            const response: any = await sendEmail(emailToSend)

            setShowAcceptDialog(false)

        }catch (e) {
            setShowAcceptDialog(false)
            Toast.error(e.toString())
        }
    }

    return (
        <Container maxWidth={"lg"}>
            <Grid container justify={"center"} spacing={2}>
                <Grid item xs={12}>
                    {person ? (
                        <>
                            <ProfileCoverPhoto person={person}/>
                            <PersonCard canEdit={canEdit} person={person}/>
                            <PersonContacts canEdit={canEdit} person={person}/>
                            <PersonAwards canEdit={canEdit} person={person}/>
                            <PersonInterests canEdit={canEdit} person={person}/>
                            <PersonConnections canEdit={canEdit} person={person}/>
                            <PersonSkills canEdit={canEdit} person={person}/>
                            <PersonPosts canEdit={canEdit} person={person}/>

                            {context === 'job_application' && jobId && jobApplicationId ?
                                <Card>
                                    <CardContent>
                                        <Grid spacing={2} container justify={"center"}>
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
                                                    </XForm>
                                                </XDialog>

                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                                : ""}

                        </>
                    ) : <PleaseWait label={"Please wait..."}/>}

                </Grid>
            </Grid>
        </Container>
    )
}

export default Person