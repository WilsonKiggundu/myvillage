import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {globalStyles} from "../../../theme/styles";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import {IStartup} from "../../../interfaces/IStartup";
import Chip from "@material-ui/core/Chip";
import XDialog from "../../../components/dialogs/XDialog";
import UpdateStartupDetails from "./forms/UpdateStartupDetails";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import UploadFile from "../../posts/forms/UploadFile";
import palette from "../../../theme/palette";
import {useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import ProfileCoverPhoto from "../ProfileCoverPhoto";

interface IProps {
    startup: IStartup
}

export default function StartupSummary({startup}: IProps) {

    const classes = globalStyles()
    const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false)
    const [openEditProfilePhotoDialog, setOpenEditProfilePhotoDialog] = useState<boolean>(false)

    const user = useSelector(userSelector)
    const canEdit = startup.roles?.some((role: any) => role.personId === user?.profile.sub)

    return (
        <>
            <Box mb={2}>
                <Card>

                    <ProfileCoverPhoto startup={startup}/>

                    {canEdit ? (
                        <Typography component={"div"} style={{position: "relative"}}>
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0
                                }}
                                onClick={() => setOpenEditProfileDialog(true)}
                            >
                                <EditIcon/>
                            </IconButton>
                        </Typography>
                    ) : ""}

                    <CardContent style={{textAlign: "center", marginTop: -110}}>


                        <div className={classes.profilePhoto}>
                            <Avatar
                                style={{
                                    backgroundColor: palette.tertiary.main,
                                    borderWidth: 1,
                                    borderColor: palette.primary.main,
                                    borderStyle: 'solid'
                                }}
                                src={startup.avatar}
                                className={clsx(classes.largeAvatar, classes.avatar)}/>
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
                                            id={startup.id}
                                            onClose={() => setOpenEditProfilePhotoDialog(false)}
                                            type={"profilePhoto"}
                                            category={"startup"}
                                            filesLimit={1}
                                            acceptedTypes={['image/*']}/>
                                    </XDialog>

                                </Typography> : ""

                            }
                        </div>

                        <Typography variant="h6">{startup.name}</Typography>
                        {/*<Typography style={{whiteSpace: 'pre-line'}} component={"div"} variant={"body2"}>*/}
                        {/*    {startup.description}*/}
                        {/*</Typography>*/}

                        <Box mt={1} mb={2}>
                            <Typography component="div">
                                <Chip size="small" label={startup.category}/>
                            </Typography>
                        </Box>

                        {/*<ProfileRating rating={3}/>*/}

                        <Divider/>

                        <Grid style={{marginTop: 15}} container justify={"center"}>
                            <Button style={{margin: 5}}
                                    variant={"outlined"}
                                    href={startup.website}
                                    target={"_blank"}
                                    size={"small"}
                                    title={"Website"}>
                                Visit Website
                            </Button>

                            <Button disabled
                                    style={{margin: 5}}
                                    variant={"outlined"}
                                    size={"small"}>
                                Connect
                            </Button>

                            {/*<Button disabled style={{margin: 5}} variant={"outlined"} size={"small"}>*/}
                            {/*    Send Message*/}
                            {/*</Button>*/}
                        </Grid>

                    </CardContent>
                </Card>
            </Box>

            <XDialog title={"Edit startup details"}
                     maxWidth={"md"}
                     onClose={() => setOpenEditProfileDialog(false)}
                     open={openEditProfileDialog}>
                <UpdateStartupDetails
                    onClose={() => setOpenEditProfileDialog(false)}
                    profile={startup}/>
            </XDialog>
        </>
    );
}