import React, {useEffect, useState} from "react"
import StartupCard from "./StartupCard";
import {Box, Button, Grid, useMediaQuery, useTheme} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {XFab} from "../../../components/buttons/XFab";
import AddIcon from "@material-ui/icons/Add";
import UpdateStartupDetails from "./forms/UpdateStartupDetails";
import XDialog from "../../../components/dialogs/XDialog";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../../components/PleaseWait";
import {startupsSelector} from "./redux/startupsSelectors";
import {loadStartups} from "./redux/startupsActions";
import _ from "lodash";
import ErrorPage from "../../exceptions/Error";
import {userSelector} from "../../../data/coreSelectors";
import {XLoginSnackbar} from "../../../components/XLoginSnackbar";
import {ChevronRight} from "@material-ui/icons";

import './css/StartupCard.css'

const Startups = () => {

    const user = useSelector(userSelector)
    const startups = useSelector(startupsSelector)
    const dispatch = useDispatch()
    const [addStartupDialog, setAddStartupDialog] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const handleCreate = () => {
        if (user) setAddStartupDialog(true)
        else {
            setOpenSnackbar(true)
        }
    }

    const handleLoadMore = () => {
        dispatch(loadStartups())
    }

    useEffect(() => {
        dispatch(loadStartups())
    }, [dispatch])

    if (_.isEmpty(startups.data) && startups.isLoading) {
        return <PleaseWait label={"Loading startups. Please wait..."}/>
    }

    if (startups.error) return (
        <ErrorPage title={"Unable to load startups"} message={startups.error}/>
    )

    return (
        <Container maxWidth={"lg"}>

            <Grid container spacing={2} justify={"flex-start"}>
                {startups.data.map((startup: any, index: number) => (
                    <Grid key={index} item xs={12} md={6} lg={3}>
                        <StartupCard index={index} startup={startup}/>
                    </Grid>
                ))}

                {startups.request.hasMore && <Grid style={{textAlign: "center"}} item xs={12}>
                    <Box mt={2} mb={2}>
                        <Button onClick={handleLoadMore} variant={"text"}>Load more <ChevronRight/></Button>
                    </Box>
                </Grid>}
            </Grid>

            <XFab right={15}
                  variant={isMobile ? "round" : "extended"}
                  bottom={15}
                  color={"primary"}
                  position={"fixed"}
                  onClick={handleCreate}>
                <AddIcon/> {!isMobile && <span className="text-inherit">Add your business</span>}
            </XFab>


            {!user && <XLoginSnackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)}/>}

            <XDialog title={"Enroll your startup"}
                     maxWidth={"md"}
                     open={addStartupDialog}
                     onClose={() => setAddStartupDialog(false)}>
                <UpdateStartupDetails onClose={() => setAddStartupDialog(false)}/>
            </XDialog>

        </Container>
    )
}

export default Startups