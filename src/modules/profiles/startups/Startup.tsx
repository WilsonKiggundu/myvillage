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
import AwardsTimeline from "../../../components/AwardsTimeline";
import Box from "@material-ui/core/Box";
import ProfileRating from "../../../components/ProfileRating";
import StartAPostCard from "../../../components/StartAPostCard";
import {StartupBioCard} from "./StartupBioCard";
import InterestsCard from "../../../components/InterestsCard";
import Gallery from "../../../components/Gallery";
import {PeopleCard} from "./PeopleCard";
import StartupSummary from "./StartupSummary";
import {IStartup} from "../../../interfaces/IStartup";
import {get, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import Toast from "../../../utils/Toast";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        nav: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },

        root: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
        smallAvatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        largeAvatar: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        avatar: {
            backgroundColor: palette.primary.main
        }
    }),
);

const Startup = ({match}: any) => {
    const classes = globalStyles()
    const styles = useStyles();

    const {id} = match.params
    const [profile, setProfile] = useState<IStartup>(Object.create({}))

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

    const interests = Interests;
    const contacts: any[] = [];
    const awards = Awards;

    const avatar = "https://innovationvillage.co.ug/wp-content/uploads/2020/07/new-logo-white-02-1.png";
    const placeHolder = "https://picsum.photos/500/500"
    let products = []

    for (let i = 0; i < 9; i++) {
        products.push(`${placeHolder}?image=${i * 5 + 10}`)
    }

    return (
        <div className={classes.root}>
            <Container maxWidth="md">
                <Grid container justify="flex-start">
                    <Grid item xs={12}>
                        <StartAPostCard placeholder={`Post on ${profile.name}'s wall...`}/>

                        <StartupSummary profile={profile}/>

                        <StartupBioCard profile={profile}/>
                        <InterestsCard items={interests}/>
                        <Gallery items={products} title={"Our products"}/>
                        <AwardsTimeline awards={awards}/>
                        <PeopleCard title={"Our people"} items={contacts.slice(0, 8)}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Startup