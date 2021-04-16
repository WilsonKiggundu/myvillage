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
import {LazyLoadImage} from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css';
import XImageLoader from "../../components/XImageLoader";

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
        if (user){
            if (startup){
                const hasRoles = startup.roles?.some((role: any) => role.personId === user?.profile.sub)
                setCanEdit(hasRoles)
            }else if(person){
                setCanEdit(person.id === user.profile.sub)
            }
        }
    }, [person, startup])

    return (
        <>
            {coverPhoto || canEdit ? (
                <Grid className={classes.coverPhoto}
                      alignItems={"center"}
                      style={{backgroundColor: '#fbfafa'}}
                      alignContent={"center"}
                      container>

                    {coverPhoto ?
                        <XImageLoader
                            src={coverPhoto}
                            effect={"opacity"}
                            width={'100%'}
                            height={'auto'}
                            alt={'Cover photo'}
                        />
                        : ""
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
                                style={{color: "#c1c1c1"}}
                                onClick={() => setOpenUploadDialog(true)}
                                size={"medium"}>
                                <AddAPhoto fontSize={"large"}/>
                            </IconButton>
                        </Typography>

                        <Typography style={{color: "#c1c1c1"}} component={"small"}>
                            {coverPhoto ? "" : "Add a cover photo"}
                        </Typography>

                        <XDialog open={openUploadDialog}
                                 title={"Upload a cover photo"}
                                 onClose={() => setOpenUploadDialog(false)}>
                            <UploadFile
                                type={"coverPhoto"}
                                category={category}
                                filesLimit={1}
                                showUploadButton={true}
                                id={person?.id || startup?.id}
                                onClose={() => setOpenUploadDialog(false)}
                                acceptedTypes={['image/*']}/>
                        </XDialog>

                    </Typography> : ""}

                </Grid>
            ) : <div className={classes.coverPhoto}></div>}
        </>
    )
}

export default ProfileCoverPhoto