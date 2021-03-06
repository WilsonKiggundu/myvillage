import React, {useEffect, useState} from "react"
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
import {XLoginSnackbar} from "../../../components/XLoginSnackbar";
import {Button} from "@material-ui/core";
import {ChevronRight} from "@material-ui/icons";
import {loadStartups} from "../startups/redux/startupsActions";
import XAutoComplete from "../../../components/inputs/XAutoComplete";
import {Endpoints} from "../../../services/Endpoints";
import XSelectInputAsync from "../../../components/inputs/XSelectInputAsync";
import PeopleFilter from "./forms/PeopleFilter";

interface IProps{
    category?: string
}

const Community = ({category} : IProps) => {

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const people = useSelector(peopleSelector)
    const user = useSelector(userSelector)

    const dispatch = useDispatch()

    const history = useHistory()

    useEffect(() => {

        document.title = 'Community / My Village'
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

    const handleLoadMore = () => {
        dispatch(loadPeople())
    }

    const handleConnect = (personId: string) => {
        if (user){
            dispatch(editPersonConnection({personId, followerId: user.profile.sub}))
        }else{
            setOpenSnackbar(true)
        }
    }

    return (
        <Container maxWidth={"lg"}>
            <Grid spacing={2} justify={"flex-start"} container>
                {people.data.map((person: IPerson) => (
                    <Grid item key={person.id} xs={12} sm={4} md={4} xl={3} lg={3}>
                        <ContactCard person={person}>
                            <div className="profile-bio-teaser">
                                <div dangerouslySetInnerHTML={{__html: person.bio}} />
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

                                        {
                                            !user &&
                                            <XLoginSnackbar
                                                open={openSnackbar}
                                                onClose={() => setOpenSnackbar(false)}/>
                                        }

                                    </Grid>

                                </Grid>

                            </Box>

                        </ContactCard>
                    </Grid>
                ))}

                {people.request.hasMore && <Grid style={{textAlign: "center"}} item xs={12}>
                    <Box mt={2} mb={2}>
                        <Button onClick={handleLoadMore} variant={"text"}>Load more <ChevronRight /></Button>
                    </Box>
                </Grid>}

            </Grid>
        </Container>
    )
}

export default Community