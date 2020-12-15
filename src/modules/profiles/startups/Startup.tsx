import React, {useEffect} from "react";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {StartupBioCard} from "./StartupBioCard";
import ProductPortfolio from "../../../components/ProductPortfolio";
import StartupSummary from "./StartupSummary";
import StartupInterests from "./StartupInterests";
import StartupAddresses from "./StartupAddresses";
import {useDispatch, useSelector} from "react-redux";
import {
    getAddresses,
    getInterests,
    getProducts,
    getStartup,
    selectStartup
} from "./startupSlice";
import {PleaseWait} from "../../../components/PleaseWait";
import {Alert} from "@material-ui/lab";

const Startup = ({match}: any) => {

    const {id} = match.params

    const dispatch = useDispatch()
    const profile = useSelector(selectStartup)

    const error = useSelector((state: any) => state.startup.error)
    const status = useSelector((state: any) => state.startup.status)

    const isPageAdmin = true

    useEffect(() => {
        if (status === 'idle'){
            const getData = async () => {
                await dispatch(getStartup(id))
                dispatch(getInterests(id))
                //dispatch(getContacts(id))
                dispatch(getAddresses(id))
                //dispatch(getNeeds(id))
                //dispatch(getRoles(id))
                dispatch(getProducts(id))
            }
            getData()
        }
    }, [status, id, dispatch])

    let content;
    switch (status) {
        case 'loading':
            return <PleaseWait/>
        case 'succeeded':

            content = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={3}>
                        <StartupSummary canEdit={isPageAdmin} profile={profile}/>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <StartupBioCard isPageAdmin={isPageAdmin} profile={profile} />
                        <StartupInterests canEdit={isPageAdmin} profile={profile}/>
                        <ProductPortfolio profile={profile} canEdit={isPageAdmin} title={"Our products"}/>
                        {/*<StartupAwards profile={profile} canEdit={isPageAdmin} />*/}
                        <StartupAddresses profile={profile} canEdit={isPageAdmin} />
                        {/*<StartupContacts profile={profile} canEdit={isPageAdmin} />*/}
                        {/*<StartupRoles profile={profile} canEdit={isPageAdmin} />*/}
                    </Grid>
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
            {content}
        </Container>
    )
}

export default Startup