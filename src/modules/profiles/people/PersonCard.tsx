import {IPerson} from "./IPerson";
import UpdateProfileForm from "./forms/profile/UpdateProfileForm";
import {Typography} from "@material-ui/core";
import ProfileRating from "../../../components/ProfileRating";
import Fab from "@material-ui/core/Fab";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditIcon from "@material-ui/icons/Edit";
import React, {useEffect, useState} from "react";
import {globalStyles} from "../../../theme/styles";
import {getProfile, getUser} from "../../../services/User";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import UpdateCategoryForm from "./forms/profile/UpdateCategoryForm";
import {XFab} from "../../../components/buttons/XFab";
import {useDispatch} from "react-redux";
import UploadFile from "../../posts/forms/UploadFile";
import palette from "../../../theme/palette";
import CardHeader from "@material-ui/core/CardHeader";

interface IProps {
    person: IPerson
}

const PersonCard = ({person}: IProps) => {

    const classes = globalStyles()
    const user: IPerson = getProfile()

    const isMyProfile: boolean = person.id === user.id

    const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false)
    const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState<boolean>(false)
    const [openEditProfilePhotoDialog, setOpenEditProfilePhotoDialog] = useState<boolean>(false)

    return (
        <Box mb={2}>
            <Card style={{textAlign: 'center'}}>

                <CardHeader
                    action={
                        isMyProfile ? (
                                <Typography component={"div"}>
                                    <IconButton
                                        onClick={() => setOpenEditProfileDialog(true)}
                                        aria-label="edit">
                                        <EditIcon/>
                                    </IconButton>

                                    <XDialog title={"Edit profile"}
                                             maxWidth={"md"}
                                             onClose={() => setOpenEditProfileDialog(false)}
                                             open={openEditProfileDialog}>
                                        <UpdateProfileForm
                                            onClose={() => setOpenEditProfileDialog(false)}
                                            person={person}/>
                                    </XDialog>

                                </Typography>
                            ) : ""
                    }
                />

                <CardContent style={{padding: 30}}>
                    <div className={classes.profilePhoto}>

                        {isMyProfile ? (
                            <Typography component={"div"} style={{position: "absolute"}}>
                                <Fab
                                    style={{
                                        position: 'absolute',
                                        top: 1,
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

                        <Avatar className={clsx(classes.largeAvatar, classes.avatar)}
                                style={{
                                    backgroundColor: palette.tertiary.main,
                                    borderWidth: 1,
                                    borderColor: palette.primary.main,
                                    borderStyle: 'solid'
                                }}
                                variant={"circle"}
                                src={person.avatar}>
                        </Avatar>

                        {isMyProfile ?
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
                                        type={"profilePhoto"}
                                        filesLimit={1}
                                        acceptedTypes={['image/*']}/>
                                </XDialog>

                            </Typography> : ""
                        }

                    </div>

                    <Typography variant="h5">{person.firstname} {person.lastname}</Typography>

                    {person.bio ?
                        <Box mb={4} mt={4}>
                            <Typography style={{whiteSpace: 'pre-line'}} variant={"body2"}>
                                {person.bio}
                            </Typography>
                        </Box>
                        : ""}

                    {person.categories?.length ?
                        <Box mb={4} mt={4}>
                            {person.categories?.map((c: any, index: number) =>
                                <Chip key={index} style={{margin: "3px"}} label={c.category.name}/>
                            )}
                        </Box>
                        : isMyProfile ? (
                            <>
                                <Button
                                    onClick={() => setOpenAddCategoryDialog(true)}
                                    variant={"outlined"}>
                                    Which category of user are you?
                                </Button>

                                <XDialog title={"Which category of user are you?"}
                                         open={openAddCategoryDialog}
                                         onClose={() => setOpenAddCategoryDialog(false)}>
                                    <UpdateCategoryForm
                                        person={person}
                                        onClose={() => setOpenAddCategoryDialog(false)}/>
                                </XDialog>
                            </>

                        ) : ""

                    }
                    <ProfileRating readonly rating={3}/>

                </CardContent>
            </Card>
        </Box>
    )
}

export default PersonCard