import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import React, {useState} from "react";
import Chip from "@material-ui/core/Chip";
import CardHeader from "@material-ui/core/CardHeader";
import {IStartup} from "../../../interfaces/IStartup";
import UpdateStartupInterestsForm from "./forms/UpdateStartupInterestsForm";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import {deleteStartupInterests} from "./redux/startupsActions";
import {startupInterestsSelector} from "./redux/startupsSelectors";

interface IProps {
    startup: IStartup
}

const StartupInterests = ({startup}: IProps) => {

    const dispatch = useDispatch()
    const interests = useSelector((state) => startupInterestsSelector(state, startup.id))
    const user = useSelector(userSelector)
    const canEdit = startup.roles?.some((role: any) => role.personId === user?.profile.sub) ?? false

    const [openEditInterestsDialog, setOpenEditInterestsDialog] = useState<boolean>(false)

    const handleDelete = (interestId: string) => {
        dispatch(deleteStartupInterests({id: interestId, businessId: startup?.id}))
    }

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
                                label={i.interest?.category}
                                key={index}
                                onDelete={() => handleDelete(i.interestId)}
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
                            interests={interests} profile={startup}/>
                    </XDialog>
                ) : ""}
            </Card>
        </Box>
    )
}

export default StartupInterests