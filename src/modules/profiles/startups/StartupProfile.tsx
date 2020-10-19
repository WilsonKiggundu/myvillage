import React from "react";
import {globalStyles} from "../../../theme/styles"
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";
import {AlertTitle} from "@material-ui/lab";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import {CalendarToday, LocationOn} from "@material-ui/icons";

interface IProps {
    id: string
    children: any
    interests?: any
}

const StartupProfile = ({match}: any) => {
    const classes = globalStyles()
    const {id} = match.params

    return (
        <div className={classes.root}>
            <Container fixed>
                <Grid container>
                    <Grid item xs={12} sm={3}>Here</Grid>
                    <Grid item xs={12} sm={9}>
                        <Card className={classes.bottomMargin}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography style={{paddingTop: 25}}
                                                component="h2"
                                                variant="h4">
                                        The Innovation Village Kampala
                                    </Typography>
                                    <Typography style={{paddingTop: 15, paddingBottom: 15}}
                                                variant="h6">
                                        Gulu . Jinja . Mbarara . Mbale . Ntinda
                                    </Typography>
                                    <Typography paragraph>
                                        Quisque eu eleifend sapien. Sed et eros non nibh eleifend tempus. Sed rhoncus
                                        mauris in tellus viverra, in molestie turpis feugiat. Fusce massa massa,
                                        convallis ut elit ac, dictum porta odio. Aenean viverra neque id turpis maximus
                                        cursus. Etiam vitae mi eros. Duis vestibulum orci ex, in vulputate leo iaculis
                                        eget. Suspendisse suscipit tortor sit amet neque.
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card className={classes.bottomMargin}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography style={{marginTop: 50, marginBottom: 50}}>

                                        <Grid spacing={5} container>
                                            <Grid item xs={12} sm={6}>
                                                <Alert icon={<CalendarToday fontSize='large' /> } severity="info">
                                                    <AlertTitle style={{fontSize: '1.2rem'}}>Incorporation Date</AlertTitle>
                                                    Aug. 21, 2007
                                                </Alert>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Alert icon={<LocationOn fontSize='large' /> } severity="info">
                                                    <AlertTitle style={{fontSize: '1.2rem'}}>Address</AlertTitle>
                                                    Ntinda Complex Block B&C - 3rd Floor
                                                </Alert>
                                            </Grid>
                                        </Grid>

                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card className={classes.bottomMargin}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography style={{paddingTop: 15, paddingBottom: 15}}
                                                variant="h4">Interests.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card className={classes.bottomMargin}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography style={{paddingTop: 15, paddingBottom: 15}}
                                                variant="h4">Products.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card className={classes.bottomMargin}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography style={{paddingTop: 15, paddingBottom: 15}}
                                                variant="h4">Awards.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card className={classes.bottomMargin}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography style={{paddingTop: 15, paddingBottom: 15}}
                                                variant="h4">Contacts.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default StartupProfile