import React, {useEffect} from "react";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import {IPerson} from "./IPerson";
import PersonCard from "./PersonCard";
import PersonInterests from "./PersonInterests";
import PersonAwards from "./PersonAwards";
import PersonSkills from "./PersonSkills";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../../components/PleaseWait";
import {Alert} from "@material-ui/lab";
import PersonPosts from "./PersonPosts";
import ProfileCoverPhoto from "../ProfileCoverPhoto";
import {getProfile} from "../../../services/User";
import PersonConnections from "./PersonConnections";
import {globalStyles} from "../../../theme/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {startupSelector} from "../startups/redux/startupsSelectors";
import {loadStartups} from "../startups/redux/startupsActions";
import store from "../../../data/store";
import {IStartup} from "../../../interfaces/IStartup";
import {personSelector} from "./redux/peopleSelectors";
import {userSelector} from "../../../data/coreSelectors";
import {loadPeople} from "./redux/peopleActions";
import {homeStyles} from "../../home/styles";

const Person = ({match}: any) => {
    const styles = homeStyles()
    const {id} = match.params
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    let person = useSelector((state) => personSelector(state, id))

    const dispatch = useDispatch()


    useEffect(() => {
        (async () => {
            await dispatch(loadPeople())
        })()
    })

    if(!person) {
        person = store.getState().people.data.find((person: IPerson) => person.id === id)
    }

    const user = useSelector(userSelector)
    const canEdit: boolean = id === user?.profile.sub

    return (
        <Container className={styles.scrollable} maxWidth={false}>
            <Grid container justify={"center"} spacing={2}>
                <Grid item xs={12} sm={12} lg={8}>
                    {person ? (
                        <>
                            <ProfileCoverPhoto person={person}/>
                            <PersonCard canEdit={canEdit} person={person}/>
                            <PersonInterests canEdit={canEdit} person={person}/>
                            <PersonAwards canEdit={canEdit} person={person}/>
                            <PersonSkills canEdit={canEdit} person={person}/>
                            <PersonConnections canEdit={canEdit} person={person}/>
                            <PersonPosts canEdit={canEdit} person={person}/>
                        </>
                    ) : <PleaseWait label={"Loading person.Please wait..."} /> }

                </Grid>
            </Grid>
        </Container>
    )
}

export default Person