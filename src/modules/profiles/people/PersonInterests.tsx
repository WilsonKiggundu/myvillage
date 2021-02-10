import {IPerson} from "./IPerson";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import React, {useState} from "react";
import Chip from "@material-ui/core/Chip";
import UpdateInterestsForm from "./forms/profile/UpdateInterestsForm";
import CardHeader from "@material-ui/core/CardHeader";
import { deletePersonInterests } from "./redux/peopleActions";
import {useDispatch} from "react-redux";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonInterests = ({person, canEdit}: IProps) => {

    const dispatch = useDispatch()
    const {interests} = person
    const [openEditInterestsDialog, setOpenEditInterestsDialog] = useState<boolean>(false)

    const handleDeleteInterest = (interestId: string) => {
        dispatch(deletePersonInterests({interestId, personId: person.id}))
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
                    title={
                        canEdit ? "Your interests" : `${person.firstname}'s interests`
                    }
                />

                {interests?.length ? (
                    <CardContent>
                        {interests ? interests.map((i: any) => (
                                canEdit ? <Chip
                                    onDelete={() => handleDeleteInterest(i.interest.id)}
                                    label={i.interest.category}
                                    key={i.interest.id}
                                    style={{marginRight: 5, marginBottom: 5}}
                                    clickable
                                    color="default"
                                    variant="default"/> :
                                    <Chip
                                        label={i.interest.category}
                                        key={i.interest.id}
                                        style={{marginRight: 5, marginBottom: 5}}
                                        clickable
                                        color="default"
                                        variant="default"/>
                            )) : ""}
                    </CardContent>
                ) : ""}

                {canEdit ? (
                    <XDialog title={"Update your interests"}
                             maxWidth={"sm"}
                             onClose={() => setOpenEditInterestsDialog(false)}
                             open={openEditInterestsDialog}>
                        <UpdateInterestsForm
                            person={person}
                            onClose={() => setOpenEditInterestsDialog(false)}/>
                    </XDialog>
                ) : ""}
            </Card>
        </Box>
    )
}

export default PersonInterests