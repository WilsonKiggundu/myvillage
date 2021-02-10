import {IPerson} from "./people/IPerson";
import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {globalStyles} from "../../theme/styles";
import IconButton from "@material-ui/core/IconButton";
import {AddAPhoto} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import XDialog from "../../components/dialogs/XDialog";
import UploadFile from "../posts/forms/UploadFile";
import useTheme from "@material-ui/core/styles/useTheme";
import {IStartup} from "../../interfaces/IStartup";
import {useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import grey from "@material-ui/core/colors/grey";

interface IProps {
    person?: IPerson
    startup?: IStartup
}

const ProfileCoverPhoto = ({person, startup}: IProps) => {
    const classes = globalStyles()
    const theme = useTheme()

    const user = useSelector(userSelector)
    const [canEdit, setCanEdit] = useState<boolean | undefined>(undefined)

    const [openUploadDialog, setOpenUploadDialog] = useState<boolean>(false)
    const coverPhoto = person?.coverPhoto ?? startup?.coverPhoto
    const category = person ? "person" : "startup"

    useEffect(() => {
        if (startup){
            const hasRoles = startup.roles?.some((role: any) => role.personId === user?.profile.sub)
            setCanEdit(hasRoles)
        }else if(person){
            setCanEdit(person.id === user.profile.sub)
        }
    }, [person, startup])

    return (
        <>
            {coverPhoto || canEdit ? (
                <Grid className={classes.coverPhoto}
                      alignItems={"center"}
                      style={{marginTop: -20, backgroundColor: grey[300]}}
                      alignContent={"center"}
                      container>

                    {coverPhoto ?
                        <img alt={""}
                             src={coverPhoto}
                             style={{width: '100%'}}
                        /> : ""
                    }

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

                        <Typography style={{color: "white"}} component={"small"}>
                            {coverPhoto ? "" : "Add a cover photo"}
                        </Typography>

                        <XDialog open={openUploadDialog}
                                 title={"Upload a cover photo"}
                                 onClose={() => setOpenUploadDialog(false)}>
                            <UploadFile
                                type={"coverPhoto"}
                                category={category}
                                filesLimit={1}
                                id={person?.id || startup?.id}
                                onClose={() => setOpenUploadDialog(false)}
                                acceptedTypes={['image/*']}/>
                        </XDialog>

                    </Typography> : ""}

                </Grid>
            ) : ""}
        </>
    )
}

export default ProfileCoverPhoto