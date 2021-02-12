import React, {useEffect, useState} from "react";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {StartupBioCard} from "./StartupBioCard";
import ProductPortfolio from "../../../components/ProductPortfolio";
import StartupSummary from "./StartupSummary";
import StartupInterests from "./StartupInterests";
import StartupAddresses from "./StartupAddresses";
import {useDispatch, useSelector} from "react-redux";
import StartupContacts from "./StartupContacts";
import StartupRoles from "./StartupRoles";
import {startupSelector} from "./redux/startupsSelectors";
import {loadStartups} from "./redux/startupsActions";
import store from "../../../data/store";
import {IStartup} from "../../../interfaces/IStartup";
import {PleaseWait} from "../../../components/PleaseWait";
import {globalStyles} from "../../../theme/styles";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import {getAsync, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";

const Startup = ({match}: any) => {

    const classes = globalStyles()
    const {id} = match.params
    const theme = useTheme()
    const dispatch = useDispatch()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [startup, setStartup] = useState<IStartup | undefined>(undefined)

    useEffect(() => {
        (async () => {
            const url = makeUrl("Profiles", Endpoints.business.base)
            const response: any = await getAsync(url, {id})

            setStartup(response.body.startups[0])
        })()
    }, [id])

    return (
        <Container className={classes.scrollable} maxWidth={false}>
            <Box mt={0}>
                <Grid justify={"center"} container spacing={2}>
                    <Grid item xs={12} lg={9}>

                        {startup ? (
                            <>
                                <StartupSummary startup={startup}/>
                                <StartupBioCard startup={startup}/>
                                <StartupAddresses startup={startup}/>
                                <StartupInterests startup={startup}/>
                                <ProductPortfolio startup={startup} title={"Our products"}/>
                                <StartupContacts startup={startup}/>
                                <StartupRoles startup={startup}/>
                            </>
                        ) : <PleaseWait />}

                        {/*<StartupAwards profile={profile} canEdit={isPageAdmin} />*/}

                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Startup