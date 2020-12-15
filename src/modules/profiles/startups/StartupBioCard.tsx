import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import React from "react";
import {globalStyles} from "../../../theme/styles";
import ProfileCoverPhoto from "../ProfileCoverPhoto";
import {IStartup} from "../../../interfaces/IStartup";
import {Grid} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

interface IProps {
    profile: IStartup
    isPageAdmin: boolean
}

export function StartupBioCard({isPageAdmin, profile}: IProps) {

    return <Box mb={2}>
        <Card>
            <ProfileCoverPhoto canEdit={isPageAdmin} startup={profile} />

            <CardContent>
                <Box mb={2} mt={2}>
                    <Typography style={{whiteSpace: "pre-line"}} variant="body2">
                        {profile.description}
                    </Typography>
                </Box>

                <Divider />

                <Box mt={2}>
                    <Grid container justify={"center"}>
                        <Grid style={{textAlign: "center"}} item xs={6}>
                            <Typography variant={"h6"}>{profile.dateOfIncorporation}</Typography>
                            <span>Incorporation Date</span>
                        </Grid>
                        <Grid style={{textAlign: "center"}} item xs={6}>
                            <Typography variant={"h6"}>{profile.numberOfEmployees}</Typography>
                            <span>Number of Employees</span>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    </Box>;
}