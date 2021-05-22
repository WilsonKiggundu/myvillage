import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {globalStyles} from "../../../theme/styles";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import EditIconOutlined from "@material-ui/icons/EditOutlined";
import {IStartup} from "../../../interfaces/IStartup";
import XDialog from "../../../components/dialogs/XDialog";
import UpdateStartupDetails from "./forms/UpdateStartupDetails";
import IconButton from "@material-ui/core/IconButton";
import UploadFile from "../../posts/forms/UploadFile";
import {useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import ProfileCoverPhoto from "../ProfileCoverPhoto";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import './css/StartupSummary.css'
import XImageLoader from "../../../components/XImageLoader";
import {ChevronRight} from "@material-ui/icons";
import SocialShare from "../../../components/SocialShare";

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

    const handleOpenWebsite = (url: string) => {
        window.open(url, '_blank')
    }

    const bgColors = ['#636569', '#ff9015', '#62cbc9']
    const color = bgColors[Math.floor(Math.random() * bgColors.length)];
    const name = startup.name.replace(/^\s+|\s+$/gm, '');

    return (
        <>
            <Box mb={2}>
                <Card>

                    <CardContent>
                        <Grid container justify={"flex-start"} spacing={2}>
                            <Grid item xs={3} lg={2}>
                                <div className="StartupSummary-logo-holder">
                                    {startup.avatar ?
                                        <XImageLoader
                                            width="95%"
                                            height={"auto"}
                                            src={startup.avatar}
                                            effect={"opacity"}
                                            alt={startup.name}
                                        /> : <div style={{backgroundColor: color}} className="startup-initials">
                                            {name[0].toUpperCase()}
                                        </div>
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={9} lg={10}>
                                <div className="StartupSummary-name">{startup.name}</div>
                                <div className="StartupSummary-category">
                                    {
                                        startup.category.split(',')
                                            .map((category: string, index: number) => (
                                                <span key={index}>{category}</span>
                                            ))
                                    }
                                </div>

                                <Button
                                    variant={"outlined"}
                                    onClick={() => handleOpenWebsite(startup.website)}
                                    disabled={!startup.website}
                                    size={"small"}
                                    title={"Website"}>
                                    Visit Website <ChevronRight/>
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>

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
                        <Grid style={{marginTop: 15}} container justify={"center"}>
                            <SocialShare
                                description={startup.description}
                                title={`Checkout ${startup.name}'s profile on MyVillage`} />

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