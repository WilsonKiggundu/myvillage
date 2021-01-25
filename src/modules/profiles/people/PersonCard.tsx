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
import React, {useState} from "react";
import {globalStyles} from "../../../theme/styles";
import Chip from "@material-ui/core/Chip";
import UpdateCategoryForm from "./forms/profile/UpdateCategoryForm";
import UploadFile from "../../posts/forms/UploadFile";
import palette from "../../../theme/palette";
import CardHeader from "@material-ui/core/CardHeader";
import AddIcon from '@material-ui/icons/Add';
import {useDispatch} from "react-redux";
import {deletePersonCategories} from "./redux/peopleActions";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonCard = ({person, canEdit}: IProps) => {

    const classes = globalStyles()
    const dispatch = useDispatch()

    const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false)
    const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState<boolean>(false)
    const [openEditProfilePhotoDialog, setOpenEditProfilePhotoDialog] = useState<boolean>(false)

    const handleDeleteCategory = (categoryId: string) => {
        dispatch(deletePersonCategories({categoryId, personId: person.id}))
    }

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

                <CardContent style={{padding: 30, marginTop: -80}}>
                    <div className={classes.profilePhoto}>

                        <Avatar className={clsx(classes.largeAvatar, classes.avatar)}
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

                    {person.bio ?
                        <Box mb={4} mt={4}>
                            <Typography style={{whiteSpace: 'pre-line', textAlign: 'justify'}} variant={"body2"}>
                                {person.bio}
                            </Typography>
                        </Box>
                        : ""}

                    <Divider/>

                    <Box mb={4} mt={4}>

                        {person.categories?.map((c: any, index: number) =>
                            <Chip
                                onDelete={() => handleDeleteCategory(c.categoryId)}
                                key={index} style={{margin: "3px"}}
                                label={c.category.name}/>
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