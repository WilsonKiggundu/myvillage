import React, {useEffect, useState} from "react";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import {IPerson} from "./IPerson";
import {get, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import PersonCard from "./PersonCard";
import PersonInterests from "./PersonInterests";
import PersonAwards from "./PersonAwards";
import PersonSkills from "./PersonSkills";

const Person = ({match}: any) => {

    const {id} = match.params
    const [person, setPerson] = useState<IPerson>(Object.create({}));

    useEffect(() => {

        // get profile details
        const url = makeUrl("Profiles", Endpoints.person.base + "/" + id)
        get(url, {}, (person: IPerson) => {
            if (person) {
                setPerson({...person})
            }
        })

    }, [id, setPerson])

    return (
        <Container maxWidth={"lg"}>
            <Grid container spacing={2}>
                <Box clone order={{xs: 1, sm: 2}}>
                    <Grid item xs={12} md={4} lg={3} sm={12}>
                        <PersonCard person={person} />

                        "
                        "                        <PersonInterests person={person} />
                        <PersonAwards person={person} />
                        <PersonSkills person={person} />
                    </Grid>
                </Box>
            </Grid>
        </Container>
    )
}

export default Person