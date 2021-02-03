import {IPerson} from "./IPerson";
import UpdateProfileForm from "./forms/profile/UpdateProfileForm";
import {Divider, Typography} from "@material-ui/core";
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
import Chip from "@material-ui/core/Chip";
import UpdateCategoryForm from "./forms/profile/UpdateCategoryForm";
import UploadFile from "../../posts/forms/UploadFile";
import palette from "../../../theme/palette";
import CardHeader from "@material-ui/core/CardHeader";
import AddIcon from '@material-ui/icons/Add';
import {useDispatch, useSelector} from "react-redux";
import {deletePersonCategories, editPersonConnection, loadPersonConnection} from "./redux/peopleActions";
import {homeStyles} from "../../home/styles";
import grey from "@material-ui/core/colors/grey";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import Button from "@material-ui/core/Button";
import {userSelector} from "../../../data/coreSelectors";
import {personSelector} from "./redux/peopleSelectors";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonCard = ({person, canEdit}: IProps) => {

    const styles = homeStyles()
    const classes = globalStyles()
    const dispatch = useDispatch()
    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false)
    const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState<boolean>(false)
    const [openEditProfilePhotoDialog, setOpenEditProfilePhotoDialog] = useState<boolean>(false)

    const user = useSelector(userSelector)
    const {connections} = useSelector((state) => personSelector(state, user.profile.sub))

    if(!connections.length) dispatch(loadPersonConnection({personId: user.profile.sub}))

    const handleDeleteCategory = (categoryId: string) => {
        dispatch(deletePersonCategories({categoryId, personId: person.id}))
    }

    const handleConnect = (personId: string) => {
        dispatch(editPersonConnection({personId, followerId: user.profile.sub}))
        setIsConnected(true)
    }

    useEffect(() => {
        setIsConnected(connections?.some((c: any) => c.personId === person.id))
    }, [connections])

    return (
        <Box mb={2}>
            <Card style={{textAlign: 'center'}}>

                <CardHeader
                    action={
                        canEdit ? (
                            <Typography component={"div"}>
                                <IconButton
                                    onClick={() => setOpenEditProfileDialog(true)}
                                    aria-label="edit">
                                    <EditIcon/>
                                </IconButton>

                                <XDialog title={"Edit profile"}
                                         maxWidth={"sm"}
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

                <CardContent style={{padding: 30, marginTop: -60}}>
                    <div className={classes.profilePhoto}>

                        <Avatar className={clsx(styles.largeAvatar, styles.avatar)}
                                style={{
                                    backgroundColor: palette.tertiary.main,
                                    borderWidth: 1,
                                    borderColor: palette.primary.main,
                                    borderStyle: 'solid'
                                }}
                                variant={"circular"}
                                src={person.avatar}>
                        </Avatar>

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
                                        type={"profilePhoto"}
                                        category={"person"}
                                        onClose={() => setOpenEditProfilePhotoDialog(false)}
                                        filesLimit={1}
                                        acceptedTypes={['image/*']}/>
                                </XDialog>

                            </Typography> : ""
                        }

                    </div>

                    <Typography variant="h5">{person.firstname} {person.lastname}</Typography>

                    {!canEdit && !isConnected &&
                        <Box mt={2} mb={2}>
                            <Button
                                onClick={() => handleConnect(person.id)}
                                className={clsx(classes.flat)}
                                variant="contained"
                                color={"primary"}
                                size={"medium"}>Connect</Button>
                        </Box>
                    }

                    {person.bio ?
                        <Box mb={4} mt={4}>
                            <Typography
                                style={{
                                    whiteSpace: 'pre-line',
                                    textAlign: isMobile ? 'center' : 'justify'
                                }}
                                variant={"body2"}>
                                {person.bio}
                            </Typography>
                        </Box>
                        : ""}

                    <Divider/>

                    <Box mb={4} mt={4}>

                        <Typography style={{color: grey[400], marginBottom: 5}}>
                            <small>Categories</small>
                        </Typography>

                        {person.categories?.map((c: any, index: number) =>
                            (canEdit ? <Chip
                                    color={"secondary"}
                                    onDelete={() => handleDeleteCategory(c.categoryId)}
                                    key={index} style={{margin: "3px"}}
                                    label={c.category.name}/> :
                                <Chip
                                    color={"secondary"}
                                    key={index} style={{margin: "3px"}}
                                    label={c.category.name}/>)
                        )}

                        {canEdit ? (
                            <>
                                <Chip
                                    onClick={() => setOpenAddCategoryDialog(true)}
                                    label={<AddIcon/>}
                                />

                                <XDialog title={"Update Categories"}
                                         open={openAddCategoryDialog}
                                         onClose={() => setOpenAddCategoryDialog(false)}>
                                    <UpdateCategoryForm
                                        person={person}
                                        onClose={() => setOpenAddCategoryDialog(false)}/>
                                </XDialog>
                            </>
                        ) : ""}
                    </Box>

                    {/*<ProfileRating readonly rating={3}/>*/}

                </CardContent>
            </Card>
        </Box>
    )
}

export default PersonCard