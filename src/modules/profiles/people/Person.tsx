import React, {useEffect, useState} from "react";
import {Container} from "@material-ui/core";
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
import userManager from "../../../utils/userManager";
import {Urls} from "../../../routes/Urls";
import Toast from "../../../utils/Toast";
import PersonContacts from "./PersonContacts";
import {personSelector} from "./redux/peopleSelectors";
import {APPEND_PERSON} from "./redux/peopleReducer";
import PersonEmployment from "./PersonEmployment";
import PersonProjects from "./PersonProjects";
import PersonStack from "./PersonStack";
import {isDeveloper, isLancer} from "./IPerson";
import PersonFreelanceProfile from "./PersonFreelanceProfile";
import PersonFreelanceProjectActions from "./PersonFreelanceProjectActions";
import PersonJobApplicationActions from "./PersonJobApplicationActions";


const Person = ({match}: any) => {
    const {id} = match.params
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const useQuery = () => {
        return new URLSearchParams(location.search)
    }

    const context = useQuery().get('context')
    const requestId = useQuery().get('requestId')
    const jobId = useQuery().get('jobId')
    const projectId = useQuery().get('projectId')

    const person = useSelector((state) => personSelector(state, id))

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

                            {
                                context === 'job_application' && jobId && requestId ?
                                    <PersonJobApplicationActions
                                        person={person}
                                        requestId={requestId}
                                        jobId={jobId}/>
                                    : ""
                            }

                            {context === 'freelance_project' && projectId ?
                                <PersonFreelanceProjectActions
                                    requestId={requestId}
                                    person={person}
                                    projectId={projectId}/>
                                : ""}

                        </>
                    ) : <PleaseWait label={"Please wait..."}/>}

                </Grid>
            </Grid>
        </Container>
    )
}

export default Person