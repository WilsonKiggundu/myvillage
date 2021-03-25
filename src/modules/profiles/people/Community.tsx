import React, {useEffect} from "react"
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ContactCard from "../../../components/ContactCard";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Urls} from "../../../routes/Urls";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../../components/PleaseWait";
import {Alert} from "@material-ui/lab";
import {peopleSelector} from "./redux/peopleSelectors";
import {editPersonConnection, loadPeople} from "./redux/peopleActions";
import _ from "lodash";
import {useHistory} from "react-router-dom";
import {scrolledToBottom} from "../../../utils/scrollHelpers";
import {IPerson} from "./IPerson";


import './People.css'
import {userSelector} from "../../../data/coreSelectors";
import {getPersonConnection} from "./redux/peopleEndpoints";

const Community = () => {

    const people = useSelector(peopleSelector)
    const user = useSelector(userSelector)

    const dispatch = useDispatch()

    const history = useHistory()

    const handleConnect = (personId: string) => {
        dispatch(editPersonConnection({personId, followerId: user.profile.sub}))
    }

    useEffect(() => {

        document.title = 'Community / My Village'

        window.addEventListener('scroll', () => {
            if (people.request.hasMore && scrolledToBottom()) {
                dispatch(loadPeople())
            }
        })
    })

    useEffect(() => {
        dispatch(loadPeople())
    }, [dispatch])

    if (people && _.isEmpty(people.data)) {
        return <PleaseWait label={"Loading people. Please wait..."}/>
    }

    if (people.error) return (
        <Alert color={"error"} icon={false}>
            <Box mt={2}>
                <Typography variant={"body2"} component={"div"}>
                    {people.error}
                </Typography>
            </Box>
        </Alert>
    )

    const handleViewProfile = (id: string) => {
        const url = Urls.profiles.onePerson(id)
        history.push(url)
    }


    return (
        <Container maxWidth={false}>
            <Grid spacing={2} justify={"center"} container>
                {people.data.map((person: IPerson) => (
                    <Grid item key={person.id} xs={12} sm={4} md={4} xl={2} lg={3}>
                        <ContactCard person={person}>
                            <div className="profile-bio-teaser">
                                {person.bio}
                            </div>
                            <Box mt={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} className="profile-action-buttons">
                                        <button
                                            type="button"
                                            onClick={() => handleViewProfile(person.id)}
                                            className="view-profile-button">
                                            <span>View Profile</span>
                                        </button>
                                    </Grid>
                                    <Grid item xs={6} className="profile-action-buttons">
                                        <button
                                            type="button"
                                            disabled={person.isConnected}
                                            onClick={() => handleConnect(person.id)}
                                            className={person.isConnected ? "connect-button-disabled" : "connect-button"}>
                                            <span>Connect</span>
                                        </button>
                                    </Grid>

                                </Grid>

                            </Box>

                        </ContactCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Community