import React, {useEffect, useState, Fragment} from "react";
import {Container, createStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import ProfileRating from "../../../components/ProfileRating";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {globalStyles} from "../../../theme/styles";
import {Interests, PersonProfiles, Posts, Qualifications, Startups} from "../../../data/mockData";
import CardHeader from "@material-ui/core/CardHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import {useHistory} from "react-router-dom"
import {Urls} from "../../../routes/Urls";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Chip from "@material-ui/core/Chip";
import EducationTimeline from "../../../components/EducationTimeline";
import StartAPostCard from "../../../components/StartAPostCard";
import AuthService from "../../../services/AuthService";
import {IPerson} from "./IPerson";
import Fab from "@material-ui/core/Fab";
import {XFab} from "../../../components/buttons/XFab";
import PostCard from "../../../components/PostCard";
import XDialog from "../../../components/dialogs/XDialog";
import XForm from "../../../components/forms/XForm";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DialogType from "../../../utils/types";
import UpdateProfileForm from "./forms/profile/UpdateProfileForm";
import {Messages} from "../../../utils/messages";
import {AvatarGroup} from "@material-ui/lab";
import UpdateInterestsForm from "./forms/profile/UpdateInterestsForm";
import UpdateEducationForm from "./forms/profile/UpdateEducationForm";

makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(0.3),
            },
        },
        avatarPhotoIcon: {
            position: "absolute",
            left: -25,
            bottom: 0
        }
    }),
);


const Person = ({match}: any) => {
    const classes = globalStyles()
    const history = useHistory();

    const {id} = match.params
    const [person, setPerson] = useState<IPerson>(Object.create({}));

    useEffect(() => {
        const user = new AuthService().getUser()
        setPerson({
            fullName: user.profile.name,
            id: user.profile.sub,
            avatar: user.profile.picture,
            coverPhoto: user.profile.picture
        })

    }, [])

    const isMyProfile = id === person.id
    const interests = Interests;
    const connections = PersonProfiles.slice(0, 5)
    const qualifications = Qualifications;
    const startups = Startups

    const posts = Posts

    const handleViewProfile = (id?: string) => {
        const url = `${Urls.profiles.people}/${id}`
        history.push(url)
    }

    const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false)
    const [openEditProfilePhotoDialog, setOpenEditProfilePhotoDialog] = useState<boolean>(false)
    const [openEditCoverPhotoDialog, setOpenEditCoverPhotoDialog] = useState<boolean>(false)
    const [openEditInterestsDialog, setOpenEditInterestsDialog] = useState<boolean>(false)
    const [openAddEductionDialog, setOpenAddEductionDialog] = useState<boolean>(false)
    const [openAddConnectionDialog, setOpenAddConnectionDialog] = useState<boolean>(false)

    const handleOpen = (dialog: DialogType) => {
        switch (dialog) {
            case "EDIT_COVER_PHOTO":
                setOpenEditCoverPhotoDialog(true)
                break
            case "EDIT_AVATAR":
                setOpenEditProfilePhotoDialog(true)
                break;
            case "EDIT_PROFILE":
                setOpenEditProfileDialog(true)
                break;
            case "ADD_CONNECTION":
                break
            case "ADD_STARTUP_LINKAGE":
                break;
            case "EDIT_INTERESTS":
                break;
            case "ADD_EDUCATION":
                break;
            case "DELETE_EDUCATION":
                break;
            case "EDIT_EDUCATION":
                break;
        }
    }

    return (
        <Container maxWidth={"lg"}>
            <Grid container spacing={2}>
                <Box clone order={{xs: 2, sm: 1}}>
                    <Grid item xs={12} md={4} lg={3} sm={12}>
                        <Box mb={2}>
                            <Card style={{textAlign: 'center'}}>

                                <CardContent>

                                    <div className={classes.profilePhoto}>
                                        <Avatar className={clsx(classes.largeAvatar, classes.avatar)}
                                                style={{}}
                                                variant="circle"
                                                src={person.avatar}>
                                        </Avatar>

                                        {isMyProfile ?
                                            <Typography style={{position: "relative"}}>
                                                <IconButton
                                                    onClick={() => handleOpen("EDIT_AVATAR")}
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

                                    <Typography variant="h6">{person.fullName}</Typography>

                                    <ProfileRating readonly rating={3}/>

                                    {isMyProfile ? (
                                        <Typography component={"div"} style={{position: "relative"}}>
                                            <Fab
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 1,
                                                    right: 1
                                                }}
                                                onClick={() => handleOpen("EDIT_PROFILE")}
                                                size={"small"}
                                                aria-label="edit">
                                                <EditIcon/>
                                            </Fab>

                                            <XDialog title={"Edit profile"}
                                                     maxWidth={"md"}
                                                     onClose={() => setOpenEditProfileDialog(false)}
                                                     contentText={Messages.UPDATE_PROFILE}
                                                     open={openEditProfileDialog}>
                                                <UpdateProfileForm/>
                                            </XDialog>

                                        </Typography>
                                    ) : ""}

                                </CardContent>
                            </Card>
                        </Box>

                        {connections ?
                            <Box mb={2}>
                                <Card>
                                    <CardHeader
                                        action={
                                            isMyProfile ? (
                                                <>
                                                    <IconButton
                                                        onClick={() => setOpenAddConnectionDialog(true)}>
                                                        <PersonAddIcon/>
                                                    </IconButton>

                                                    <XDialog
                                                        maxWidth={"md"}
                                                        title={"Connect with the people"}
                                                        open={openAddConnectionDialog}
                                                        onClose={() => setOpenAddConnectionDialog(false)}>
                                                    </XDialog>
                                                </>
                                            ) : ""
                                        }
                                        subheader={<small style={{fontSize: '0.7rem'}}>340+ (23 mutual)</small>}
                                        title={<small style={{fontSize: '1rem'}}>Connections</small>}/>

                                    <CardContent>
                                        <AvatarGroup max={4}>
                                            {
                                                connections.map(c => (
                                                    <Avatar
                                                        key={c.id}
                                                        title={c.fullName}
                                                        className={classes.avatar}
                                                        alt={c.fullName}
                                                        style={{cursor: "pointer"}}
                                                        onClick={() => handleViewProfile(c.id)}
                                                        src={c.avatar}>
                                                        {c.initials}
                                                    </Avatar>
                                                ))
                                            }
                                        </AvatarGroup>
                                    </CardContent>
                                </Card>
                            </Box> : ""
                        }

                        {startups ?
                            <Box mb={2}>
                                <Card>
                                    <CardHeader
                                        action={
                                            isMyProfile ? (
                                                <IconButton>
                                                    <AddIcon/>
                                                </IconButton>
                                            ) : ""
                                        }
                                        title={<small style={{fontSize: '1rem'}}>Startup linkages</small>}/>

                                    <CardContent>
                                        <AvatarGroup max={4}>
                                            {
                                                startups.map(c => (
                                                    <Avatar
                                                        key={c.id}
                                                        className={clsx(classes.clickable, classes.avatar)}
                                                        variant="circle"
                                                        onClick={() => handleViewProfile(c.id)}
                                                        src={c.logo}/>
                                                ))
                                            }
                                        </AvatarGroup>
                                    </CardContent>
                                </Card>
                            </Box> : ""
                        }

                    </Grid>
                </Box>
                <Box clone order={{xs: 1, sm: 2}}>
                    <Grid item xs={12} md={8} lg={9} sm={12}>

                        {!isMyProfile ?
                            <StartAPostCard
                                placeholder={`Write on ${person.firstName}'s wall...`}/> : ""
                        }

                        <Box mb={2}>
                            <Card>
                                <Typography style={{position: 'relative'}} component={"div"}>
                                    {isMyProfile ?
                                        (
                                            <>
                                                <Fab
                                                    style={{position: 'absolute', top: 15, right: 15}}
                                                    size={"small"}
                                                    onClick={() => setOpenEditCoverPhotoDialog(true)}
                                                    aria-label="edit">
                                                    <AddAPhotoIcon/>
                                                </Fab>

                                                <XDialog title={"Edit cover photo"}
                                                         maxWidth={"sm"}
                                                         onClose={() => setOpenEditCoverPhotoDialog(false)}
                                                         open={openEditCoverPhotoDialog}>

                                                </XDialog>
                                            </>

                                        ) : ""}

                                    {
                                        person.coverPhoto ?
                                            <img style={{width: '100%'}} src={person.coverPhoto} alt=""/> : ""
                                    }

                                </Typography>
                                <CardContent>
                                    <Box mb={2}>
                                        <Typography variant={"h5"}>Bio</Typography>
                                    </Box>
                                    <Box>

                                        <Typography variant="body2">
                                            Quisque eu eleifend sapien. Sed et eros non nibh eleifend tempus. Sed
                                            rhoncus
                                            mauris in tellus viverra, in molestie turpis feugiat. Fusce massa massa,
                                            convallis ut elit ac, dictum porta odio. Aenean viverra neque id turpis
                                            maximus
                                            cursus. Etiam vitae mi eros. Duis vestibulum orci ex, in vulputate leo
                                            iaculis
                                            eget. Suspendisse suscipit tortor sit amet neque.
                                        </Typography>
                                    </Box>

                                    {!isMyProfile ? (
                                        <Box mt={2}>
                                            <Button className={clsx(classes.noShadow)}
                                                    color="primary"
                                                    size="small"
                                                    variant="outlined">
                                                Follow
                                            </Button>
                                            <Button className={clsx(classes.noShadow)}
                                                    style={{marginLeft: 10}}
                                                    color="secondary"
                                                    size="small"
                                                    variant="outlined">
                                                Send message
                                            </Button>
                                        </Box>
                                    ) : ""
                                    }
                                </CardContent>
                            </Card>
                        </Box>

                        <Box mb={2}>
                            <Typography style={{padding: '15px 0'}}>
                                {
                                    isMyProfile ? "My interests" : `${person.firstName}'s interests`
                                }
                            </Typography>

                            <Card>
                                <CardContent>
                                    {interests ? interests.map(i =>
                                        <Chip
                                            label={i.name}
                                            key={i.id}
                                            style={{marginRight: 5, marginBottom: 5}}
                                            clickable
                                            color="secondary"
                                            variant="default"/>) : ""}


                                    {isMyProfile ?
                                        (
                                            <Typography component={"div"} style={{position: "relative"}}>
                                                <Fab
                                                    style={{position: 'absolute', bottom: 0, right: 0}}
                                                    size={"small"}
                                                    onClick={() => setOpenEditInterestsDialog(true)}>
                                                    <EditIcon/>
                                                </Fab>

                                                <XDialog title={"Update your interests"}
                                                         maxWidth={"sm"}
                                                         onClose={() => setOpenEditInterestsDialog(false)}
                                                         open={openEditInterestsDialog}>
                                                    <UpdateInterestsForm/>
                                                </XDialog>

                                            </Typography>
                                        ) : ""}
                                </CardContent>
                            </Card>
                        </Box>

                        <Box mb={2}>
                            <Card>
                                <CardHeader
                                    action={
                                        isMyProfile ? (
                                            <IconButton
                                                onClick={() => setOpenAddEductionDialog(true)}
                                                aria-label="settings">
                                                <AddIcon/>
                                            </IconButton>
                                        ) : ""
                                    }
                                    title="Education"
                                />
                                <CardContent>

                                    <EducationTimeline education={qualifications} isMine={isMyProfile}/>

                                    {isMyProfile ? (
                                        <XDialog title={"Add education"}
                                                 maxWidth={"md"}
                                                 onClose={() => setOpenAddEductionDialog(false)}
                                                 open={openAddEductionDialog}>
                                            <UpdateEducationForm/>
                                        </XDialog>
                                    ) : ""}

                                </CardContent>
                            </Card>
                        </Box>

                        <Box mb={2}>
                            <Typography style={{padding: '15px 0'}}>
                                {
                                    isMyProfile ? "My posts" : `${person.firstName}'s posts`
                                }
                            </Typography>
                            {posts ? posts.map((p, index) => <PostCard key={index} {...person} />) : ""}
                        </Box>

                    </Grid>
                </Box>
            </Grid>
        </Container>
    )
}

export default Person