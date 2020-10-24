import React from "react"
import {Paper} from "@material-ui/core";
import {IPerson} from "./IPerson";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ContactCard from "../../../components/ContactCard";
import Container from "@material-ui/core/Container";
import {PersonProfiles} from "../../../data/mockData";
import Button from "@material-ui/core/Button";
import {globalStyles} from "../../../theme/styles";
import clsx from "clsx";
import ProfileRating from "../../../components/ProfileRating";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import {Routes} from "../../../routes/routes";
import { useHistory } from "react-router-dom";

const People = () => {

    const styles = globalStyles()
    const profiles: any[] = PersonProfiles
    const history = useHistory()

    const handleViewProfile = (id: string) => {
        const url = `${Routes.profiles.people}/${id}`
        history.push(url)
    }

    const handleConnect = (id: string) => {

    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                {
                    profiles ?
                        profiles.map(profile => (
                            <Grid item key={profile.id} xs={12} sm={4} lg={3}>
                                <ContactCard
                                    name={profile.name}
                                    id={profile.id}
                                    avatar={profile.avatar}
                                    role={profile.role}>

                                    <Box mt={2}>

                                        <ProfileRating rating={4} />

                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Button
                                                    onClick={() => handleViewProfile(profile.id)}
                                                    className={clsx(styles.fullWidth, styles.flat)}
                                                    variant="outlined"
                                                    color="secondary"
                                                    size="small">View Profile</Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button
                                                    onClick={() => handleConnect(profile.id)}
                                                    className={clsx(styles.fullWidth, styles.flat)}
                                                    variant="contained"
                                                    color="primary"
                                                    size="small">Connect</Button>
                                            </Grid>
                                        </Grid>

                                    </Box>

                                    <Box mt={2}>
                                        <Typography style={{color: grey[500]}}>
                                            <small>7+ connections</small>
                                        </Typography>
                                    </Box>

                                </ContactCard>
                            </Grid>
                        )) : ""
                }
            </Grid>
        </Container>
    )
}

export default People