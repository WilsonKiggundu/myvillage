import React, {useEffect, useState} from "react";
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
    getProducts, getRoles,
    getStartup,
    selectStartup
} from "./startupSlice";
import {PleaseWait} from "../../../components/PleaseWait";
import {Alert} from "@material-ui/lab";
import {IPerson} from "../people/IPerson";
import {getProfile, getUser} from "../../../services/User";

const Startup = ({match}: any) => {

    const {id} = match.params

    const [canEdit, setCanEdit] = useState<boolean>(false)

    const dispatch = useDispatch()
    const profile = useSelector(selectStartup)
    const user: IPerson = getProfile()

    const error = useSelector((state: any) => state.startup.error)
    const status = useSelector((state: any) => state.startup.status)

    useEffect(() => {
        if (status === 'idle'){
            const getData = async () => {
                await dispatch(getStartup(id))
                dispatch(getRoles(id))
                dispatch(getInterests(id))
                dispatch(getAddresses(id))
                dispatch(getProducts(id))
            }
            getData()
        }
    }, [status, profile, id, dispatch])

    useEffect(() => {

        if(profile?.roles){
            const isAdmin = profile.roles.some((f: any) => f.role === 'PageAdmin' && f.personId === user.id)
            setCanEdit(isAdmin)
        }

    }, [setCanEdit, user, profile])

    let content;
    switch (status) {
        case 'loading':
            return <PleaseWait/>
        case 'succeeded':
            content = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={3}>
                        <StartupSummary canEdit={canEdit} profile={profile}/>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <StartupBioCard isPageAdmin={canEdit} profile={profile} />
                        <StartupInterests canEdit={canEdit} profile={profile}/>
                        <ProductPortfolio profile={profile} canEdit={canEdit} title={"Our products"}/>
                        {/*<StartupAwards profile={profile} canEdit={isPageAdmin} />*/}
                        <StartupAddresses profile={profile} canEdit={canEdit} />
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