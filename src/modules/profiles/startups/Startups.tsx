import React, {useState} from "react"
import {Interests, Startups as businesses} from "../../../data/mockData";
import StartupCard from "./StartupCard";
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import XSelectDropdown from "../../../components/inputs/XSelectDropdown";
import Box from "@material-ui/core/Box";
import ProfileRating from "../../../components/ProfileRating";
import {Countries} from "../../../data/Countries";
import XSwitch from "../../../components/XSwitch";
import {XFab} from "../../../components/buttons/XFab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import {AddIconButton} from "../../../components/EditIconButton";

type Visibility = 'hide' | 'show'

const Startups = () => {

    const [showFilter, setShowFilter] = useState<boolean>(false)

    const data: any[] = businesses;

    let categories: any[] = []
    Interests.forEach(m => categories.push({value: m.id, label: m.name}))
    let ratings = [
        {value: 1, label: <ProfileRating readonly rating={1} />},
        {value: 2, label: <ProfileRating readonly rating={2} />},
        {value: 3, label: <ProfileRating readonly rating={3} />},
        {value: 4, label: <ProfileRating readonly rating={4} />},
        {value: 5, label: <ProfileRating readonly rating={5} />},
    ]

    const countries = Countries.map(c => ({value: c.Code, label: c.Name}))

    return (
        <Container maxWidth="lg">

            <Box mb={2} p={2} style={{backgroundColor: "white"}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} lg={3}>
                            <XSelectDropdown
                                placeholder="Category"
                                options={categories}/>
                        </Grid>
                        <Grid item xs={12} sm={4} lg={3}>
                            <XSelectDropdown
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

            <XFab right={15}
                  bottom={15}
                  color={"secondary"}
                  position={"fixed"}
                  onClick={() => {}}>
                <AddIcon/>
            </XFab>

        </Container>
    )
}

export default Startups