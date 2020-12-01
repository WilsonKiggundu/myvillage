import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import ProfileRating from "../../../components/ProfileRating";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import LanguageIcon from '@material-ui/icons/Language';
import LinkIcon from '@material-ui/icons/Cast';
import SendIcon from '@material-ui/icons/Send';
import React from "react";
import {globalStyles} from "../../../theme/styles";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {IStartup} from "../../../interfaces/IStartup";
import {format} from "date-fns";

interface IProps {
    profile: IStartup
}

export default function StartupSummary({profile}: IProps) {

    const classes = globalStyles()

    return (
        <Box mb={2}>

            <Card style={{textAlign: "center"}} variant="outlined">
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <div className={classes.profilePhoto}>
                                <Avatar className={clsx(classes.largeAvatar, classes.avatar)}
                                        variant="square"/>
                            </div>

                            <Typography variant="h6">{profile.name}</Typography>
                            <Typography paragraph>Gulu . Jinja . Mbarara . Mbale . Ntinda</Typography>

                            <ProfileRating rating={3}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography style={{margin: "15px 0"}}>
                                <strong>Incorporation Date</strong> <br/>
                                <span>{profile.dateOfIncorporation}</span>
                            </Typography>

                            <Divider/>

                            <Typography style={{margin: "15px 0"}}>
                                <strong>Address</strong> <br/>
                                <span>Ntinda Complex <br/> Block B&C - 3rd Floor</span>
                            </Typography>

                            <Divider/>

                            <Grid style={{marginTop: 15}} container justify={"center"}>
                                <Button style={{margin: 5}} variant={"outlined"} size={"large"} title={"Website"}>
                                    Visit Website
                                </Button>

                                <Button disabled style={{margin: 5}} variant={"outlined"} size={"large"}>
                                    Connect
                                </Button>

                                <Button style={{margin: 5}} variant={"outlined"} size={"large"}>
                                    Send Message
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}