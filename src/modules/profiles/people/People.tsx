import React, {useEffect, useState} from "react"
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ContactCard from "../../../components/ContactCard";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {globalStyles} from "../../../theme/styles";
import clsx from "clsx";
import ProfileRating from "../../../components/ProfileRating";
import Typography from "@material-ui/core/Typography";
import {Urls} from "../../../routes/Urls";
import {useHistory} from "react-router-dom";
import {get, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import {getProfile, getUser} from "../../../services/User";
import {IPerson} from "./IPerson";
import {useDispatch, useSelector} from "react-redux";
import {getEvents, selectAllEvents} from "../../events/eventSlice";
import {IEvent} from "../../../interfaces/IEvent";
import {getPersons, selectAllPersons} from "./peopleSlice";
import {PleaseWait} from "../../../components/PleaseWait";
import EventCard from "../../events/EventCard";
import {Alert} from "@material-ui/lab";
import {IProfile} from "../../../interfaces/IProfile";

const People = () => {

    const styles = globalStyles()
    const [people, setPeople] = useState<IPerson[]>([])

    const profile: IProfile = getProfile()
    const dispatch = useDispatch()
    const results = useSelector((state: any) => state.people.people.filter((p: IPerson) => p.id !== profile.userId))
    const error = useSelector((state: any) => state.people.error)

    const status = useSelector((state: any) => state.people.status)

    useEffect(() => {
        if (status === 'idle'){
            dispatch(getPersons())
        }
        setPeople(results)
    }, [status, dispatch])

    let content;

    if(status === 'loading') return <PleaseWait />
    else if(status === 'succeeded'){
        content = people.map((person: IPerson) => (
            <Grid item key={person.id} xs={12} sm={4} lg={4}>
                <ContactCard person={person}>
                    <Box mt={2}>
                        <Typography className={styles.maxLines} variant={"body1"}>
                            {person.bio}
                        </Typography>
                        {/*<ProfileRating rating={4}/>*/}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Button
                                    onClick={() => handleViewProfile(person.id)}
                                    className={clsx(styles.flat)}
                                    variant="contained"
                                    color="secondary"
                                    size="medium">View Profile</Button>
                            </Grid>
                            {/*<Grid item xs={6}>*/}
                            {/*    <Button*/}
                            {/*        onClick={() => handleConnect(person.id)}*/}
                            {/*        className={clsx(styles.fullWidth, styles.flat)}*/}
                            {/*        variant="contained"*/}
                            {/*        color="primary"*/}
                            {/*        size="small">Connect</Button>*/}
                            {/*</Grid>*/}
                        </Grid>

                    </Box>

                    {/*<Box mt={2}>*/}
                    {/*    <Typography style={{color: grey[500]}}>*/}
                    {/*        <small>7+ connections</small>*/}
                    {/*    </Typography>*/}
                    {/*</Box>*/}

                </ContactCard>
            </Grid>
        ))
    }else if (status === 'error'){
        content = <Grid item xs={12}>
            <Alert color={"error"} icon={false}>
                <Typography variant={"h5"} component={"h5"}>
                    Ooops. We are unable to get people...
                </Typography>
                <Box mt={2}>
                    <Typography variant={"body2"} component={"div"}>
                        {error}
                    </Typography>
                </Box>
            </Alert>
        </Grid>
    }else{
        content = ""
    }

    const handleViewProfile = (id: string) => {
        const url = `${Urls.profiles.people}/${id}`
        window.location.replace(url)
    }

    return (
        <Container disableGutters maxWidth="lg">
            <Grid container spacing={2}>
                { content }
            </Grid>
        </Container>
    )
}

export default People