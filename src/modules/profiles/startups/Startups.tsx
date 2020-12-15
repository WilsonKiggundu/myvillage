import React, {useEffect, useState} from "react"
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
import UpdateStartupDetails from "./forms/UpdateStartupDetails";
import XDialog from "../../../components/dialogs/XDialog";
import {IStartup} from "../../../interfaces/IStartup";
import {get, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import Toast from "../../../utils/Toast";

type Visibility = 'hide' | 'show'

const Startups = () => {

    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [addStartupDialog, setAddStartupDialog] = useState<boolean>(false)
    const [startups, setStartups] = useState<IStartup[]>([])

    const data: any[] = businesses;

    useEffect(() => {
        const url = makeUrl("Profiles", Endpoints.business.base)

        get(url,
            {},
            (startups) => {
                setStartups([...startups])
            },
            err => {
                Toast.error("Error while fetching startups")
            }
        )

    }, [setStartups])


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

            {/*<Box mb={2} p={2} style={{backgroundColor: "white"}}>*/}
            {/*        <Grid container spacing={3}>*/}
            {/*            <Grid item xs={12} sm={4} lg={3}>*/}
            {/*                <XSelectDropdown*/}
            {/*                    placeholder="Category"*/}
            {/*                    options={categories}/>*/}
            {/*            </Grid>*/}
            {/*            <Grid item xs={12} sm={4} lg={3}>*/}
            {/*                <XSelectDropdown*/}
            {/*                    placeholder="Country"*/}
            {/*                    options={countries}/>*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*    </Box>*/}

            <Box mb={2}>
                <Grid spacing={3} container>
                    {startups.map((s: any) => (
                        <Grid item key={s.id} xs={12} sm={6} md={4} lg={3}>
                            <StartupCard {...s} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <XFab right={15}
                  bottom={15}
                  color={"secondary"}
                  position={"fixed"}
                  onClick={() => setAddStartupDialog(true)}>
                <AddIcon/>
            </XFab>

            <XDialog title={"Enroll your startup"}
                     maxWidth={"md"}
                     open={addStartupDialog}
                     onClose={() => setAddStartupDialog(false)}>
                <UpdateStartupDetails />
            </XDialog>

        </Container>
    )
}

export default Startups