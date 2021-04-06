import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
import UploadFile from "../../posts/forms/UploadFile";
import {useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import ProfileCoverPhoto from "../ProfileCoverPhoto";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import './css/StartupSummary.css'

interface IProps {
    startup: IStartup
}

export default function StartupSummary({startup}: IProps) {

    const classes = globalStyles()
    const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false)
    const [openEditProfilePhotoDialog, setOpenEditProfilePhotoDialog] = useState<boolean>(false)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)

    const user = useSelector(userSelector)
    const canEdit = startup.roles?.some((role: any) => role.personId === user?.profile.sub)

    const handleEditIconClick = (event: any) => {
        setMenuAnchorEl(event.currentTarget)
    }
    const handleMenuClose = () => {
        setMenuAnchorEl(null)
    }

    const handleOpenEditProfilePhotoDialog = () => {
        handleMenuClose()
        setOpenEditProfilePhotoDialog(true)
    }

    const handleOpenEditProfileDialog = () => {
        handleMenuClose()
        setOpenEditProfileDialog(true)
    }

    return (
        <>
            <Box mb={2}>
                <Card>

                    <div className="StartupSummary-logo">
                        <LazyLoadImage
                            src={startup.avatar}
                            alt={startup.name}
                            effect={'blur'}
                        />
                    </div>

                    <ProfileCoverPhoto startup={startup}/>

                    {canEdit ? (
                        <>
                            <Typography component={"div"} style={{position: "relative"}}>
                                <IconButton
                                    aria-controls="edit-menu"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0
                                    }}
                                    onClick={handleEditIconClick}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </Typography>

                            <Menu
                                anchorEl={menuAnchorEl}
                                keepMounted
                                id="edit-menu"
                                onClose={handleMenuClose}
                                open={Boolean(menuAnchorEl)}>
                                <MenuItem onClick={handleOpenEditProfilePhotoDialog}>Profile photo</MenuItem>
                                <MenuItem onClick={handleOpenEditProfileDialog}>Details</MenuItem>
                            </Menu>

                            <XDialog title={"Update your profile photo"}
                                     maxWidth={"sm"}
                                     onClose={() => setOpenEditProfilePhotoDialog(false)}
                                     open={openEditProfilePhotoDialog}>
                                <UploadFile
                                    id={startup.id}
                                    onClose={() => setOpenEditProfilePhotoDialog(false)}
                                    type={"profilePhoto"}
                                    showUploadButton={true}
                                    category={"startup"}
                                    filesLimit={1}
                                    acceptedTypes={['image/*']}/>
                            </XDialog>
                        </>

                    ) : ""}

                    <CardContent style={{textAlign: "center"}}>

                        <div className="StartupSummary-name">{startup.name}</div>
                        {/*<Typography style={{whiteSpace: 'pre-line'}} component={"div"} variant={"body2"}>*/}
                        {/*    {startup.description}*/}
                        {/*</Typography>*/}

                        <Box mt={1} mb={2}>
                            {
                                startup.category.split(',')
                                    .map((c, index) =>
                                        <Chip
                                            className="StartupSummary-category"
                                            key={index}
                                            size="small"
                                            label={c}
                                        />)
                            }
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