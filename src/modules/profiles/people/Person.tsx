import React, {useEffect, useState} from "react";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import {IPerson} from "./IPerson";
import PersonCard from "./PersonCard";
import PersonInterests from "./PersonInterests";
import PersonAwards from "./PersonAwards";
import PersonSkills from "./PersonSkills";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../../components/PleaseWait";
import PersonPosts from "./PersonPosts";
import ProfileCoverPhoto from "../ProfileCoverPhoto";
import PersonConnections from "./PersonConnections";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import store from "../../../data/store";
import {personSelector} from "./redux/peopleSelectors";
import {userSelector} from "../../../data/coreSelectors";
import { loadPeople } from "./redux/peopleActions";
import {homeStyles} from "../../home/styles";
import {getAsync, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";

const Person = ({match}: any) => {
    const styles = homeStyles()
    const {id} = match.params

    const [person, setPerson] = useState<any>(undefined)

    const user = useSelector(userSelector)
    const canEdit: boolean = id === user?.profile.sub
    const dispatch = useDispatch()
    dispatch(loadPeople())

    useEffect(() => {
        if(person){
            document.title = `${person.firstname} ${person.lastname} / My Village`
        }
    }, [person])

    useEffect(() => {
        (async () => {
            const url = makeUrl("Profiles", Endpoints.person.base)
            const response: any = await getAsync(url, {id})
            setPerson(response.body.persons[0])
        })()
    }, [id])

    return (
        <Container style={{marginTop: -20}} maxWidth={"lg"}>
            <Grid container justify={"center"} spacing={2}>
                <Grid item xs={12}>
                    {person ? (
                        <>
                            <ProfileCoverPhoto person={person}/>
                            <PersonCard canEdit={canEdit} person={person}/>
                            <PersonAwards canEdit={canEdit} person={person}/>
                            <PersonInterests canEdit={canEdit} person={person}/>
                            <PersonConnections canEdit={canEdit} person={person}/>
                            <PersonSkills canEdit={canEdit} person={person}/>
                            <PersonPosts canEdit={canEdit} person={person}/>
                        </>
                    ) : <PleaseWait label={"Loading person.Please wait..."} /> }

                </Grid>
            </Grid>
        </Container>
    )
}

export default Person