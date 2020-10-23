import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import VideocamIcon from "@material-ui/icons/Videocam";
import EventIcon from "@material-ui/icons/Event";
import DescriptionIcon from "@material-ui/icons/Description";
import Card from "@material-ui/core/Card";
import React from "react";
import {globalStyles} from "../theme/styles";


const StartAPostCard = () => {

    const classes = globalStyles()

    return (
        <Card>
            <CardContent>
                <Typography
                    component={"div"}
                    style={{
                        textAlign: 'left',
                        padding: 25,
                        borderRadius: 5
                    }}
                    className={clsx(classes.fullWidth, classes.clickable)}>
                    Start a post
                </Typography>

                <Box mt={2}>
                    <Grid container>
                        <Grid className={classes.textCenter} item xs={3}>
                            <Button style={{padding: 10}} className={clsx(classes.bold, classes.fullWidth)}>
                                <AddAPhotoIcon style={{marginRight: 10}} /> Photo
                            </Button>
                        </Grid>

                        <Grid className={classes.textCenter} item xs={3}>
                            <Button style={{padding: 10}} className={clsx(classes.bold, classes.fullWidth)}>
                                <VideocamIcon style={{marginRight: 10}} /> Video
                            </Button>
                        </Grid>

                        <Grid className={classes.textCenter} item xs={3}>
                            <Button style={{padding: 10}} className={clsx(classes.bold, classes.fullWidth)}>
                                <EventIcon style={{marginRight: 10}} /> Event
                            </Button>
                        </Grid>

                        <Grid className={classes.textCenter} item xs={3}>
                            <Button style={{padding: 10}} className={clsx(classes.bold, classes.fullWidth)}>
                                <DescriptionIcon style={{marginRight: 10}} /> Write article
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

            </CardContent>
        </Card>
    )
}

export default StartAPostCard