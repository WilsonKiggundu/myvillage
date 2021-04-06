import React, {useEffect, useState} from "react"
import StartupCard from "./StartupCard";
import {Grid, useTheme} from "@material-ui/core";
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
import {scrolledToBottom} from "../../../utils/scrollHelpers";

const Startups = () => {

    const startups = useSelector(startupsSelector)
    const dispatch = useDispatch()
    const [addStartupDialog, setAddStartupDialog] = useState<boolean>(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (startups.request.hasMore && scrolledToBottom()) {
                dispatch(loadStartups())
            }
        })
    })

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
                <Grid item xs={12}>
                    <Grid spacing={2} container>
                        {startups.data.map((startup: any) => (
                            <Grid item key={startup.id} xs={12} sm={6} md={4}>
                                <StartupCard startup={startup} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

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
                <UpdateStartupDetails onClose={() => setAddStartupDialog(false)}/>
            </XDialog>

        </Container>
    )
}

export default Startups