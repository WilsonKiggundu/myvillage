import React from "react"
import {Startups} from "../../../data/mockData";
import StartupCard from "./StartupCard";
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import {globalStyles} from "../../../theme/styles";

interface IStartup {
    name: string
    interests: [string]
    category: string
    id: string
}

const StartupsList = () => {

    const classes = globalStyles()
    const data: any[] = Startups;

    return (
        <div className={classes.root}>
        <Container fixed>
            <Grid spacing={3} container>
                { data.map((s: any) => (
                    <Grid item key={s.id} xs={12} sm={4} lg={3}>
                        <StartupCard
                            category={s.category}
                            interests={s.interests}
                            id={s.id}
                            name={s.name} />
                    </Grid>
                )) }
            </Grid>
        </Container>
        </div>
    )
}

export default StartupsList