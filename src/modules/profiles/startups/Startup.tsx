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
import {getAsync, getWithoutLoginAsync, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import userManager from "../../../utils/userManager";
import {APPEND_STARTUP} from "./redux/startupsReducer";

import './css/StartupSummary.css'

const Startup = ({match}: any) => {

    const dispatch = useDispatch()
    const {id} = match.params
    // const [startup, setStartup] = useState<IStartup | undefined>(undefined)

    const startup = useSelector(state => startupSelector(state, id))
    useEffect(() => {
        (async () => {
            const url = makeUrl("Profiles", Endpoints.business.base)
            // const response: any = await getAsync(url, {id})

            // setStartup(response.body.startups[0])
        })()
    }, [id])

    useEffect(() => {
        (async () => {
            try {
                const url = makeUrl("Profiles", Endpoints.business.base)
                const response: any = await getWithoutLoginAsync(url, {id})
                const startup = response.body.startups[0]

                dispatch({
                    type: APPEND_STARTUP,
                    payload: startup
                })

            } catch (e) {
                if (e.toString().includes('Unauthorized')) {
                    await userManager.signinRedirect({
                        state: window.location.pathname + window.location.search
                    })
                }
            }
        })()
    }, [id])

    useEffect(() => {
        if (startup) {
            document.title = `${startup.name} / ${startup.category} / MyVillage`
        }
    })

    return (
        <Container maxWidth={"md"}>
            <Box mt={0}>
                <Grid justify={"center"} container spacing={2}>
                    <Grid item xs={12}>
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
                        ) : <PleaseWait label={"Fetching data..."} />}

                        {/*<StartupAwards profile={profile} canEdit={isPageAdmin} />*/}

                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Startup