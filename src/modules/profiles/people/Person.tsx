import React, {useEffect, useState} from "react";
import {AccordionDetails, Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import {IPerson} from "./IPerson";
import {get, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import PersonCard from "./PersonCard";
import PersonInterests from "./PersonInterests";
import PersonAwards from "./PersonAwards";
import PersonSkills from "./PersonSkills";
import {useDispatch, useSelector} from "react-redux";
import {getJobs, selectAllJobs} from "../../jobs/jobsSlice";
import {getEducation, getInterests, getPerson, getSkills, selectPerson} from "./personSlice";
import {PleaseWait} from "../../../components/PleaseWait";
import {IJob} from "../../../interfaces/IJob";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import {Alert} from "@material-ui/lab";
import {differenceInCalendarDays, format, formatDistanceToNow} from "date-fns";
import {getCategories} from "./personSlice";
import PersonPosts from "./PersonPosts";
import ProfileCoverPhoto from "../ProfileCoverPhoto";
import {getProfile} from "../../../services/User";

const Person = ({match}: any) => {

    const {id} = match.params

    const dispatch = useDispatch()
    const person = useSelector(selectPerson)

    const user: IPerson = getProfile()
    const canEdit: boolean = person.id === user.id

    const error = useSelector((state: any) => state.person.error)
    const status = useSelector((state: any) => state.person.status)

    useEffect( () => {
        if (status === 'idle') {

            const getData = async () =>  {
                await dispatch(getPerson(id))
                await dispatch(getCategories(id))
                await dispatch(getInterests(id))
                await dispatch(getEducation(id))
                await dispatch(getSkills(id))
            }

            getData()

        }
    }, [status, id, dispatch])

    let content;
    switch (status) {
        case 'loading':
            return <PleaseWait/>
        case 'succeeded':

            content = (
                <>
                    <ProfileCoverPhoto canEdit={canEdit} person={person} />
                    <Container maxWidth={"md"}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <PersonCard person={person}/>
                                <PersonInterests person={person}/>
                                <PersonAwards person={person}/>
                                <PersonSkills person={person}/>
                                <PersonPosts person={person}/>
                            </Grid>
                        </Grid>
                    </Container>
                </>
            )

            break;
        case 'error':
            content = <Grid item xs={12}>
                <Alert
                    title={"We failed to get the jobs..."}
                    color={"error"} icon={false}>
                    {error}
                </Alert>
            </Grid>
            break
        default:
            return <></>
    }

    return (
        <>
            {content}
        </>
    )
}

export default Person