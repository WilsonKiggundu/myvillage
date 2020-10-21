import React from "react"
import {Interests, Startups} from "../../../data/mockData";
import StartupCard from "./StartupCard";
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import SelectDropdown from "../../../components/SelectDropdown";
import Box from "@material-ui/core/Box";

const StartupsList = () => {

    const data: any[] = Startups;

    let categories: any[] = []
    Interests.forEach(m => categories.push({value: m.id, label: m.category}))

    return (
        <Container maxWidth="lg">
            <Box mb={2} style={{backgroundColor: "white", padding: 15}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} lg={3}>
                        <SelectDropdown
                            placeholder="Category"
                            options={categories}/>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <SelectDropdown
                            placeholder="Rating"
                            options={categories}/>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <SelectDropdown
                            placeholder="Country"
                            options={categories}/>
                    </Grid>
                </Grid>
            </Box>

            <Grid spacing={3} container>
                {data.map((s: any) => (
                    <Grid item key={s.id} xs={12} sm={4} lg={3}>
                        <StartupCard {...s} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default StartupsList