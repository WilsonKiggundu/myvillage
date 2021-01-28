import React, {useEffect, useState} from "react"
import StartupCard from "./StartupCard";
import {Grid, useTheme} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {XFab} from "../../../components/buttons/XFab";
import AddIcon from "@material-ui/icons/Add";
import UpdateStartupDetails from "./forms/UpdateStartupDetails";
import XDialog from "../../../components/dialogs/XDialog";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../../components/PleaseWait";
import {Alert} from "@material-ui/lab";
import {startupsSelector} from "./redux/startupsSelectors";
import {loadStartups} from "./redux/startupsActions";
import _ from "lodash";
import {PostContentLoader} from "../../../components/loaders/PostContentLoader";
import Typography from "@material-ui/core/Typography";
import {loadPosts} from "../../posts/redux/postsActions";
import {globalStyles} from "../../../theme/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ErrorPage from "../../exceptions/Error";
import {homeStyles} from "../../home/styles";

const Startups = () => {

    const classes = globalStyles()
    const styles = homeStyles()

    const startups = useSelector(startupsSelector)
    const dispatch = useDispatch()
    const theme = useTheme()
    const [addStartupDialog, setAddStartupDialog] = useState<boolean>(false)

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const handleScroll = (event: any) => {
        const element = event.target
        if(element.scrollHeight - element.scrollTop === element.clientHeight){
            if(startups.request.hasMore){
                dispatch(loadStartups())
            }
        }
    }

    useEffect(() => {
        dispatch(loadStartups())
    }, [dispatch])

    if (_.isEmpty(startups.data) && startups.isLoading) {
        return <PleaseWait label={"Loading startups. Please wait..."} />
    }

    if (startups.error) return (
        <ErrorPage title={"Unable to load startups"} message={startups.error} />
    )

    return (
        <Container onScroll={handleScroll} className={styles.scrollable} maxWidth={false}>
            <Grid container spacing={2} justify={"center"}>
                <Grid item xs={12}>
                    <Box mt={isMobile ? 0 : 3}>
                        <Grid spacing={2} container>
                            {startups.data.map((startup: any) => (
                                <Grid item key={startup.id} xs={12} sm={6} md={4} lg={3}>
                                    <StartupCard {...startup} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
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