import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import ProfileRating from "../../../components/ProfileRating";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {globalStyles} from "../../../theme/styles";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import {IStartup} from "../../../interfaces/IStartup";
import Chip from "@material-ui/core/Chip";
import XDialog from "../../../components/dialogs/XDialog";
import {XFab} from "../../../components/buttons/XFab";
import UpdateStartupDetails from "./forms/UpdateStartupDetails";
import {get, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import {getProfile, getUser} from "../../../services/User";
import Toast from "../../../utils/Toast";
import {IPerson} from "../people/IPerson";
import Fab from "@material-ui/core/Fab";
import UpdateProfileForm from "../people/forms/profile/UpdateProfileForm";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import UploadFile from "../../posts/forms/UploadFile";
import palette from "../../../theme/palette";

interface IProps {
    profile: IStartup
    canEdit?: boolean
}

export default function StartupSummary({profile, canEdit}: IProps) {

    const classes = globalStyles()
    const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false)
    const [openEditProfilePhotoDialog, setOpenEditProfilePhotoDialog] = useState<boolean>(false)

    return (
        <>
            <Box mb={2}>
                <Card>
                    <CardContent style={{textAlign: "center"}}>
                        <div className={classes.profilePhoto}>
                            <Avatar
                                style={{
                                    backgroundColor: palette.tertiary.main,
                                    borderWidth: 1,
                                    borderColor: palette.primary.main,
                                    borderStyle: 'solid'
                                }}
                                src={profile.avatar}
                                className={clsx(classes.mediumAvatar, classes.avatar)}/>
                            {canEdit ?
                                    <Typography style={{position: "relative"}}>
                                        <IconButton
                                            onClick={() => setOpenEditProfilePhotoDialog(true)}
                                            className={classes.avatarPhotoIcon}>
                                            <AddAPhotoIcon fontSize={"large"}/>
                                        </IconButton>

                                        <XDialog title={"Update your profile photo"}
                                                 maxWidth={"sm"}
                                                 onClose={() => setOpenEditProfilePhotoDialog(false)}
                                                 open={openEditProfilePhotoDialog}>
                                            <UploadFile
                                                onClose={() => setOpenEditProfilePhotoDialog(false)}
                                                type={"profilePhoto"}
                                                category={"startup"}
                                                filesLimit={1}
                                                acceptedTypes={['image/*']}/>
                                        </XDialog>

                                    </Typography> : ""

                            }
                        </div>

                        <Typography variant="h6">{profile.name}</Typography>
                        {/*<Typography style={{whiteSpace: 'pre-line'}} component={"div"} variant={"body2"}>*/}
                        {/*    {profile.description}*/}
                        {/*</Typography>*/}

                        <Box mt={1} mb={2}>
                            <Typography component="div">
                                <Chip size="small" label={profile.category}/>
                            </Typography>
                        </Box>

                        {/*<ProfileRating rating={3}/>*/}

                        <Divider/>

                        <Grid style={{marginTop: 15}} container justify={"center"}>
                            <Button style={{margin: 5}}
                                    variant={"outlined"}
                                    href={profile.website}
                                    target={"_blank"}
                                    size={"small"}
                                    title={"Website"}>
                                Visit Website
                            </Button>

                            {/*<Button disabled style={{margin: 5}} variant={"outlined"} size={"small"}>*/}
                            {/*    Connect*/}
                            {/*</Button>*/}

                            {/*<Button disabled style={{margin: 5}} variant={"outlined"} size={"small"}>*/}
                            {/*    Send Message*/}
                            {/*</Button>*/}
                        </Grid>

                        {canEdit ? (
                            <Typography component={"div"} style={{position: "relative"}}>
                                <XFab onClick={() => setOpenEditProfileDialog(true)}
                                      size={"medium"}
                                      position={"absolute"}
                                      bottom={10} right={0}>
                                    <EditIcon/>
                                </XFab>
                            </Typography>
                        ) : ""}
                    </CardContent>
                </Card>
            </Box>

            <XDialog title={"Edit startup details"}
                     maxWidth={"sm"}
                     onClose={() => setOpenEditProfileDialog(false)}
                     open={openEditProfileDialog}>
                <UpdateStartupDetails
                    onClose={() => setOpenEditProfileDialog(false)}
                    profile={profile}/>
            </XDialog>
        </>
    );
}