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
import Toast from "../../../utils/Toast";
import UpdateStartupInterestsForm from "./forms/UpdateStartupInterestsForm";

interface IProps {
    profile: IStartup,
    canEdit: boolean
}

const StartupInterests = ({profile, canEdit}: IProps) => {

    const user = getUser()
    const {id} = profile
    const [interests, setInterests] = useState<IOption[]>([])

    const [openEditInterestsDialog, setOpenEditInterestsDialog] = useState<boolean>(false)

    useEffect(() => {

        // startup interests
        const url = makeUrl("Profiles", Endpoints.business.interest)
        get(url, {businessId: id}, (response) => {
            if (response) {
                const interests = response.map((m: any) => ({id: m.interest.id, name: m.interest.category}))
                setInterests([...interests])
            }
        })
    }, [id])

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

                {interests.length ? (
                    <CardContent>
                        {interests ? interests.map(i =>
                            <Chip
                                label={i.name}
                                key={i.id}
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
                        <UpdateStartupInterestsForm interests={interests} profile={profile}/>
                    </XDialog>
                ) : ""}
            </Card>
        </Box>
    )
}

export default StartupInterests