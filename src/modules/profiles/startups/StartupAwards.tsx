import React, {Fragment, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {globalStyles} from "../../../theme/styles"
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import grey from "@material-ui/core/colors/grey";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {IStartup} from "../../../interfaces/IStartup";
import {IAward} from "../../../interfaces/IAward";
import XDialog from "../../../components/dialogs/XDialog";
import UpdateAwardForm from "./forms/UpdateAwardForm";

interface IProps {
    profile: IStartup
    canEdit: boolean
}

export default function StartupAwards({canEdit, profile}: IProps) {
    const styles = globalStyles();
    const [awards, setAwards] = useState<IAward[] | undefined>(undefined)
    const [openAddAwardDialog, setOpenAddAwardDialog] = useState<boolean>(false)

    return (
        <Box mb={2}>
            <Typography style={{padding: '15px 0'}}>Awards &amp; Achievements</Typography>
            <Card>
                <CardContent style={{paddingTop: 25}}>
                    {awards ?
                        <Grid spacing={1} container>
                            {
                                awards.map((award: any, index: number) => (
                                    <Fragment key={index}>
                                        <Grid xs={2} sm={1} item>
                                            <Avatar variant={"square"}/>
                                        </Grid>
                                        <Grid xs={10} sm={11} item>
                                            <Typography component={"h5"}>
                                                <strong>{award.awardedBy}</strong>
                                            </Typography>
                                            <Typography variant={"body2"}>
                                                {award.award}
                                            </Typography>
                                            <Typography variant={"body2"} style={{color: grey[800]}}>
                                                <small>{award.date}</small>
                                            </Typography>
                                            <Typography style={{color: grey[700]}} variant={"body2"}>
                                                {award.details}
                                            </Typography>
                                            <Divider
                                                variant={"fullWidth"}
                                                style={{
                                                    margin: '15px 0',
                                                    display: index + 1 < awards.length ? 'block' : 'none'
                                                }}/>
                                        </Grid>

                                    </Fragment>
                                ))
                            }
                        </Grid> :
                        canEdit ? (
                            <Typography style={{textAlign: "center"}}>
                                Have you received any awards? <br/>
                                <Button color="secondary"
                                        onClick={() => setOpenAddAwardDialog(true)}
                                        variant="outlined"
                                        style={{marginLeft: 15, marginTop: 15}}
                                        className={clsx(styles.noShadow)}>Boost your profile</Button>

                                <XDialog title={"Add an award"}
                                         open={openAddAwardDialog}
                                         onClose={() => setOpenAddAwardDialog(false)} >
                                    <UpdateAwardForm profile={profile} />
                                </XDialog>

                            </Typography>
                        ) : ""

                    }
                </CardContent>
            </Card>
        </Box>
    );
}