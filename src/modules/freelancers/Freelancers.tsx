import React, {useEffect, useState} from "react"
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../components/PleaseWait";
import {Alert} from "@material-ui/lab";
import {peopleSelector} from "../profiles/people/redux/peopleSelectors";
import {loadPeople} from "../profiles/people/redux/peopleActions";
import _ from "lodash";

import '../profiles/people/People.css'
import XPeopleList from "../profiles/people/XPeopleList";


const Freelancers = () => {

    const freelancers = useSelector(peopleSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Freelancers / My Village'
        dispatch(loadPeople({category: 'freelancer'}))
    }, [dispatch])

    if (freelancers && _.isEmpty(freelancers.data)) {
        return <PleaseWait label={"Looking for freelancers. Please wait..."}/>
    }

    if (freelancers.error) {
        return (
            <Alert color={"error"} icon={false}>
                <Box mt={2}>
                    <Typography variant={"body2"} component={"div"}>
                        {freelancers.error}
                    </Typography>
                </Box>
            </Alert>
        )
    }

    return (
        <Container maxWidth={"lg"}>
            <XPeopleList
                people={freelancers.data}
                request={freelancers.request}
                category={"developers"}/>
        </Container>
    )
}

export default Freelancers