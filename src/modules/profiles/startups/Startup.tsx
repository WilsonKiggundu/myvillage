import React, {useEffect, useState} from "react";
import {globalStyles} from "../../../theme/styles"
import {Container, createStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Awards, Interests, Startups} from "../../../data/mockData";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import palette from "../../../theme/palette";
import Button from "@material-ui/core/Button";
import AwardsTimeline from "./StartupAwards";
import Box from "@material-ui/core/Box";
import ProfileRating from "../../../components/ProfileRating";
import StartAPostCard from "../../../components/StartAPostCard";
import {StartupBioCard} from "./StartupBioCard";
import InterestsCard from "../../../components/InterestsCard";
import ProductPortfolio from "../../../components/ProductPortfolio";
import {PeopleCard} from "./PeopleCard";
import StartupSummary from "./StartupSummary";
import {IStartup} from "../../../interfaces/IStartup";
import {get, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import Toast from "../../../utils/Toast";
import StartupInterests from "./StartupInterests";
import {getUser} from "../../../services/User";
import StartupAwards from "./StartupAwards";

const Startup = ({match}: any) => {

    const {id} = match.params
    const user = getUser()
    const [profile, setProfile] = useState<IStartup>(Object.create({}))

    const [isPageAdmin, setIsPageAdmin] = useState<boolean>(false)

    useEffect(() => {
        const url = makeUrl("Profiles", Endpoints.business.role)
        get(url, {businessId: id}, (roles) => {
            // is the current user a PageAdmin
            // get all page admins
            const admins = roles.filter((r: any) => r.role === 'PageAdmin').map((m: any) => m.personId);

            setIsPageAdmin(admins.includes(user.profile.sub))
        }, err => {
            Toast.error("Unable to fetch user roles. Please try again later")
        })
    }, [user])

    useEffect(() => {
        const url = makeUrl("Profiles", Endpoints.business.base + "/" + id)

        get(url, {},
            (profile) => {
                setProfile(profile)
            }, err => {
                Toast.error("Unable to fetch startup profile")
            }
        )
    }, [id, setProfile])

    const placeHolder = "https://picsum.photos/500/500"
    let products = []

    for (let i = 0; i < 9; i++) {
        products.push(`${placeHolder}?image=${i * 5 + 10}`)
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={3}>
                    <StartupSummary profile={profile}/>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <StartAPostCard placeholder={`Post on ${profile.name}'s wall...`}/>
                    <StartupInterests canEdit={isPageAdmin} profile={profile}/>

                    <ProductPortfolio profile={profile} canEdit={isPageAdmin} title={"Our products"}/>
                    <StartupAwards profile={profile} canEdit={isPageAdmin} />
                    {/*<PeopleCard title={"Our people"} items={contacts.slice(0, 8)}/>*/}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Startup