import {Avatar, Card, Typography} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import {globalStyles} from "../theme/styles";
import CommentsList from "./CommentsList";
import {IPerson} from "../modules/profiles/people/IPerson";

const PostCard = (props: IPerson) => {

    const classes = globalStyles()
    const uploads = [
        {url: "https://picsum.photos/1920/1080?image=5"},
        {url: "https://picsum.photos/1920/1080?image=10"},
        {url: "https://picsum.photos/1920/1080?image=15"},
        {url: "https://picsum.photos/1920/1080?image=20"},
        {url: "https://picsum.photos/1920/1080?image=25"}
    ]

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    avatar={<Avatar src={props.avatar}/>}
                    title={<strong>{props.firstname} {props.lastname}</strong>}
                    subheader={<small style={{color: grey[500]}}>Monday, 26 October, 2020</small>}
                    action={
                        <IconButton>
                            <MoreVert/>
                        </IconButton>
                    }
                />

                <CardContent>
                    <Typography
                        paragraph>{"Mei in eirmod tractatos. Sit dictas volutpat no, ridens repudiare ea pri. Oratio ocurreret an pri, mea ei purto illum percipitur. Vivendum deseruisse moderatius et pro, in eos nobis constituto deterruisset. Partem gloriatur ex vix, eu nec inani appetere, pro ei habeo augue liberavisse."}</Typography>
                </CardContent>

                {
                    uploads ?
                        <CardContent>
                            <Grid container spacing={1}>
                                { uploads.map((p, index) => (
                                    <Grid key={index} item xs={6} sm={4} md={4}>
                                        <img alt={p.url} className={classes.clickable} style={{maxWidth: '100%'}} src={p.url}/>
                                    </Grid>
                                ) ) }
                            </Grid>
                        </CardContent>
                        : ""
                }

                <Divider/>

                <CardContent>
                    <Grid container>
                        <Grid item xs={4} className={classes.textCenter}>
                            <Button className={clsx(classes.fullWidth, classes.bold)}>
                                <ThumbUpAltIcon style={{marginRight: 10}}/> Like
                            </Button>
                        </Grid>

                        <Grid item xs={4} className={classes.textCenter}>
                            <Button className={clsx(classes.fullWidth, classes.bold)}>
                                <InsertCommentIcon style={{marginRight: 10}}/> Reply
                            </Button>
                        </Grid>

                        <Grid item xs={4} className={classes.textCenter}>
                            <Button className={clsx(classes.fullWidth, classes.bold)}>
                                <ShareIcon style={{marginRight: 10}}/> Share
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>

                <Divider/>

                <CardContent>
                    <CommentsList />
                </CardContent>

            </Card>
        </Box>
    )
}

export default PostCard