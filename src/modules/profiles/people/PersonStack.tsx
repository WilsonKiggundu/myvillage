import {IPerson} from "./IPerson";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import React, {useState} from "react";
import Chip from "@material-ui/core/Chip";
import UpdateStackForm from "./forms/profile/UpdateStackForm";
import CardHeader from "@material-ui/core/CardHeader";
import { deletePersonStack } from "./redux/peopleActions";
import {useDispatch} from "react-redux";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import {ThumbsUpDown, ThumbUp} from "@material-ui/icons";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonStack = ({person, canEdit}: IProps) => {

    const dispatch = useDispatch()
    const {interests} = person
    const [openEditStackDialog, setOpenEditStackDialog] = useState<boolean>(false)

    const handleDeleteInterest = (interestId: string) => {
        dispatch(deletePersonStack({interestId, personId: person.id}))
    }

    return (
        <Box mb={2}>

            <Card>
                <CardHeader
                    action={
                        canEdit ? (
                            <IconButton
                                onClick={() => setOpenEditStackDialog(true)}
                                aria-label="settings">
                                <EditIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title={
                        <Grid container spacing={1} justify={"flex-start"}>
                            <Grid item><ThumbUp /></Grid>
                            <Grid item><div className="card-title">Stuff I am interested in</div></Grid>
                        </Grid>
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
                             onClose={() => setOpenEditStackDialog(false)}
                             open={openEditStackDialog}>
                        <UpdateStackForm
                            person={person}
                            onClose={() => setOpenEditStackDialog(false)}/>
                    </XDialog>
                ) : ""}
            </Card>
        </Box>
    )
}

export default PersonStack