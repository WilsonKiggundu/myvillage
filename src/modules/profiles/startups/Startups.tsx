import React, {useState} from "react"
import {Interests, Startups as businesses} from "../../../data/mockData";
import StartupCard from "./StartupCard";
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import SelectDropdown from "../../../components/SelectDropdown";
import Box from "@material-ui/core/Box";
import ProfileRating from "../../../components/ProfileRating";
import {Countries} from "../../../data/Countries";
import CustomSwitch from "../../../components/Switch";

type Visibility = 'hide' | 'show'

const Startups = () => {

    const [filterState, setFilterState] = useState<Visibility>('hide')

    const data: any[] = businesses;

    let categories: any[] = []
    Interests.forEach(m => categories.push({value: m.id, label: m.category}))
    let ratings = [
        {value: 1, label: <ProfileRating rating={1} />},
        {value: 2, label: <ProfileRating rating={2} />},
        {value: 3, label: <ProfileRating rating={3} />},
        {value: 4, label: <ProfileRating rating={4} />},
        {value: 5, label: <ProfileRating rating={5} />},
    ]

    const countries = Countries.map(c => ({value: c.Code, label: c.Name}))

    const toggleFilter = (state: Visibility) => {
        // setFilterState({...filterState, ...state})
    }

    return (
        <Container maxWidth="lg">
            <Box mb={1}>
                <CustomSwitch onChange={toggleFilter(filterState)} />
            </Box>

            <Box mb={2} p={2} style={{backgroundColor: "white", display: filterState === 'hide' ? 'none' : 'block'}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} lg={3}>
                        <SelectDropdown
                            placeholder="Category"
                            options={categories}/>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <SelectDropdown
                            placeholder="Rating"
                            options={ratings}/>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <SelectDropdown
                            placeholder="Country"
                            options={countries}/>
                    </Grid>
                </Grid>
            </Box>

            <Box mb={2}>
                <Grid spacing={3} container>
                    {data.map((s: any) => (
                        <Grid item key={s.id} xs={12} sm={4} lg={3}>
                            <StartupCard {...s} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Container>
    )
}

export default Startups