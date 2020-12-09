import {IPerson} from "./IPerson";
import UpdateProfileForm from "./forms/profile/UpdateProfileForm";
import {Typography} from "@material-ui/core";
import ProfileRating from "../../../components/ProfileRating";
import Fab from "@material-ui/core/Fab";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditIcon from "@material-ui/icons/Edit";
import React, {useEffect, useState} from "react";
import {globalStyles} from "../../../theme/styles";
import {getUser} from "../../../services/User";

interface IProps {
    person: IPerson
}

const PersonCard = ({person}: IProps) => {

    const classes = globalStyles()

    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const loggedInUser = getUser()
        setUser(loggedInUser)
    }, [person, setUser])

    const isMyProfile: boolean = person.id === user?.profile?.sub

    const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false)
    const [openEditProfilePhotoDialog, setOpenEditProfilePhotoDialog] = useState<boolean>(false)

    return (
        <Box mb={2}>
            <Card style={{textAlign: 'center'}}>
                <CardContent>
                    <div className={classes.profilePhoto}>
                        <Avatar className={clsx(classes.largeAvatar, classes.avatar)}
                                style={{}}
                                variant={"circular"}
                                src={person.avatar}>
                        </Avatar>

                        {isMyProfile ?
                            <Typography style={{position: "relative"}}>
                                <IconButton
                                    onClick={() => {
                                    }}
                                    className={classes.avatarPhotoIcon}>
                                    <AddAPhotoIcon fontSize={"large"}/>
                                </IconButton>

                                <XDialog title={"Update photo"}
                                         maxWidth={"sm"}
                                         onClose={() => setOpenEditProfilePhotoDialog(false)}
                                         open={openEditProfilePhotoDialog}>

                                </XDialog>

                            </Typography> : ""
                        }

                    </div>

                    <Typography variant="h6">{person.firstname} {person.lastname}</Typography>

                    {person.bio ?
                        <Typography style={{whiteSpace: 'pre-line'}} variant={"body2"}>
                            {person.bio}
                        </Typography>
                        : ""}

                    <ProfileRating readonly rating={3}/>

                    {isMyProfile ? (
                        <Typography component={"div"} style={{position: "relative"}}>
                            <Fab
                                style={{
                                    position: 'absolute',
                                    bottom: 1,
                                    right: 1
                                }}
                                onClick={() => setOpenEditProfileDialog(true)}
                                size={"small"}
                                aria-label="edit">
                                <EditIcon/>
                            </Fab>

                            <XDialog title={"Edit profile"}
                                     maxWidth={"md"}
                                     onClose={() => setOpenEditProfileDialog(false)}
                                     open={openEditProfileDialog}>
                                <UpdateProfileForm
                                    onClose={() => setOpenEditProfileDialog(false)}
                                    person={person}/>
                            </XDialog>

                        </Typography>
                    ) : ""}

                </CardContent>
            </Card>
        </Box>
    )
}

export default PersonCard