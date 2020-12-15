import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import React, {useEffect, useState} from "react";
import {getUser} from "../../../services/User";
import {IOption} from "../../../components/inputs/inputHelpers";
import {get, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import Chip from "@material-ui/core/Chip";
import CardHeader from "@material-ui/core/CardHeader";
import {IStartup} from "../../../interfaces/IStartup";
import UpdateStartupInterestsForm from "./forms/UpdateStartupInterestsForm";

interface IProps {
    profile: IStartup,
    canEdit: boolean
}

const StartupInterests = ({profile, canEdit}: IProps) => {

    const user = getUser()
    const {id} = profile
    const {interests} = profile

    const [openEditInterestsDialog, setOpenEditInterestsDialog] = useState<boolean>(false)

    return (
        <Box mb={2}>

            <Card>
                <CardHeader
                    action={
                        canEdit ? (
                            <IconButton
                                onClick={() => setOpenEditInterestsDialog(true)}
                                aria-label="settings">
                                <EditIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title={"Our interests"}
                />

                {interests?.length ? (
                    <CardContent>
                        {interests ? interests.map((i: any, index: number) =>
                            <Chip
                                label={i.label}
                                key={index}
                                style={{marginRight: 5, marginBottom: 5}}
                                clickable
                                color="secondary"
                                variant="default"/>) : ""}
                    </CardContent>
                ) : ""}

                {canEdit ? (
                    <XDialog title={"Update your interests"}
                             maxWidth={"sm"}
                             onClose={() => setOpenEditInterestsDialog(false)}
                             open={openEditInterestsDialog}>
                        <UpdateStartupInterestsForm
                            onClose={() => setOpenEditInterestsDialog(false)}
                            interests={interests} profile={profile}/>
                    </XDialog>
                ) : ""}
            </Card>
        </Box>
    )
}

export default StartupInterests