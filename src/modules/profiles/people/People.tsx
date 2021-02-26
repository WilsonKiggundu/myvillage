import React, {useEffect} from "react"
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ContactCard from "../../../components/ContactCard";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {globalStyles} from "../../../theme/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {Urls} from "../../../routes/Urls";
import {IPerson} from "./IPerson";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../../components/PleaseWait";
import {Alert} from "@material-ui/lab";
import {peopleSelector} from "./redux/peopleSelectors";
import {loadPeople} from "./redux/peopleActions";
import _ from "lodash";
import {useHistory} from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {scrolledToBottom} from "../../../utils/scrollHelpers";

const People = () => {

    const classes = globalStyles()
    const people = useSelector(peopleSelector)
    const dispatch = useDispatch()

    const history = useHistory()

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

    if (_.isEmpty(people.data) && people.isLoading) {
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
        <Container maxWidth={"lg"}>
            <Grid spacing={2} justify={"flex-start"} container>
                {people.data.map((person: IPerson) => (
                    <Grid item key={person.id} xs={12} sm={6} md={4}>
                        <ContactCard person={person}>
                            <Box mt={2} pl={3} pr={3}>
                                <Typography className={classes.maxLines} variant={"body1"}>
                                    {person.bio}
                                </Typography>
                            </Box>
                            <Box mt={3} p={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <ButtonGroup style={{width: '100%'}} color={"default"}>
                                            <Button
                                                onClick={() => handleViewProfile(person.id)}
                                                className={clsx(classes.fullWidth, classes.flat)}
                                                variant="contained"
                                                style={{textTransform: 'inherit'}}
                                                color={"primary"}
                                                size={"medium"}>View Profile</Button>
                                        </ButtonGroup>
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

export default People