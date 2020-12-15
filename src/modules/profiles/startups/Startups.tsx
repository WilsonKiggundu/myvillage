import React, {useEffect, useState} from "react"
import StartupCard from "./StartupCard";
import {AccordionDetails, Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {XFab} from "../../../components/buttons/XFab";
import AddIcon from "@material-ui/icons/Add";
import UpdateStartupDetails from "./forms/UpdateStartupDetails";
import XDialog from "../../../components/dialogs/XDialog";
import {useDispatch, useSelector} from "react-redux";
import {getStartups, selectAllStartups} from "./startupsSlice";
import {PleaseWait} from "../../../components/PleaseWait";
import {Alert} from "@material-ui/lab";

type Visibility = 'hide' | 'show'

const Startups = () => {

    const [addStartupDialog, setAddStartupDialog] = useState<boolean>(false)

    const dispatch = useDispatch()
    const startups = useSelector(selectAllStartups)
    const error = useSelector((state: any) => state.startups.error)

    const status = useSelector((state: any) => state.startups.status)

    useEffect(() => {
        if(status === 'idle'){
            dispatch(getStartups())
        }
    }, [status, dispatch])

    let content;
    switch (status) {
        case 'loading':
            return <PleaseWait/>
        case 'succeeded':
            content = (
                <Grid spacing={3} container>
                    {startups.map((s: any) => (
                        <Grid item key={s.id} xs={12} sm={6} md={4}>
                            <StartupCard {...s} />
                        </Grid>
                    ))}
                </Grid>
            )
            break;
        case 'error':
            content = <Grid item xs={12}>
                <Alert
                    color={"error"} icon={false}>
                    {error}
                </Alert>
            </Grid>
            break
        default:
            return <></>
    }

    return (
        <Container maxWidth="lg">
            <Box mb={2}>
                {content}
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
                <UpdateStartupDetails onClose={() => setAddStartupDialog(false)} />
            </XDialog>

        </Container>
    )
}

export default Startups