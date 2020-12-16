import {IPerson} from "./people/IPerson";
import {Grid} from "@material-ui/core";
import React, {useState} from "react";
import {globalStyles} from "../../theme/styles";
import IconButton from "@material-ui/core/IconButton";
import {AddAPhoto} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import XDialog from "../../components/dialogs/XDialog";
import UploadFile from "../posts/forms/UploadFile";
import useTheme from "@material-ui/core/styles/useTheme";
import {IStartup} from "../../interfaces/IStartup";

interface IProps {
    person?: IPerson
    startup?: IStartup
    canEdit: boolean
}

const ProfileCoverPhoto = ({person, startup, canEdit}: IProps) => {
    const classes = globalStyles()
    const theme = useTheme()

    const [openUploadDialog, setOpenUploadDialog] = useState<boolean>(false)
    const coverPhoto = person?.coverPhoto ?? startup?.coverPhoto
    const category = person ? "person" : "startup"

    return (
        <Grid className={classes.coverPhoto}
              alignItems={"center"}
              style={{marginTop: -20}}
              alignContent={"center"}
              container>

            <img src={coverPhoto} style={{width: '100%'}}/>

            {canEdit ? <Typography component={"div"} style={{
                position: 'absolute',
                zIndex: theme.zIndex.appBar - 1,
                top: '50%',
                left: '50%',
                textAlign: 'center',
                transform: 'translate(-50%, -50%)'
            }}>
                <Typography component={"div"}>
                    <IconButton
                        style={{color: "white"}}
                        onClick={() => setOpenUploadDialog(true)}
                        size={"medium"}>
                        <AddAPhoto fontSize={"large"}/>
                    </IconButton>
                </Typography>

                <Typography component={"small"}>
                    {coverPhoto ? "" : "Add a cover photo"}
                </Typography>

                <XDialog open={openUploadDialog}
                         title={"Upload a cover photo"}
                         onClose={() => setOpenUploadDialog(false)}>
                    <UploadFile
                        type={"coverPhoto"}
                        category={category}
                        filesLimit={1}
                        onClose={() => setOpenUploadDialog(false)}
                        acceptedTypes={['image/*']}/>
                </XDialog>

            </Typography> : ""}

        </Grid>
    )
}

export default ProfileCoverPhoto