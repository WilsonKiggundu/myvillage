import {IPerson} from "./IPerson";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import React, {useEffect, useState} from "react";
import CardHeader from "@material-ui/core/CardHeader";
import AddConnectionsForm from "./forms/profile/AddConnectionsForm";
import {XPersonGridList} from "../../../components/XPersonGridList";
import {useDispatch} from "react-redux";
import {loadPersonConnection} from "./redux/peopleActions";
import {useHistory} from "react-router-dom";
import {Urls} from "../../../routes/Urls";
import {PleaseWait} from "../../../components/PleaseWait";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import {AvatarGroup} from "@material-ui/lab";
import {Avatar, CardContent} from "@material-ui/core";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonConnections = ({person, canEdit}: IProps) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {connections} = person

    useEffect(() => {
        dispatch(loadPersonConnection({personId: person.id}))
    }, [person.id])

    const handleViewProfile = (personId: string) => {
        window.location.replace(Urls.profiles.onePerson(personId))
    }

    const [openAddConnectionsDialog, setOpenAddConnectionsDialog] = useState<boolean>(false)

    return (
        <Box mb={4} mt={4}>
            <Card>
                <CardHeader
                    action={
                        canEdit ? (
                            <IconButton
                                onClick={() => history.push(Urls.profiles.people)}
                                aria-label="settings">
                                <AddIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title={
                        <Grid container spacing={1} justify={"flex-start"}>
                            <Grid item><GroupIcon /></Grid>
                            <Grid item><div className="card-title">People in my network</div></Grid>
                        </Grid>
                    }
                />

                <CardContent>
                    {
                        connections?.length ?
                            (
                                <AvatarGroup spacing={"medium"} max={9}>
                                    {connections
                                        .map((conn: any, index: number) => (
                                            <Avatar
                                                style={{cursor: 'pointer'}}
                                                onClick={() => handleViewProfile(conn.personId)}
                                                key={index} alt={conn.person.firstname} src={conn.person.avatar}>
                                                <strong>{conn.person.firstname[0].toUpperCase()}{conn.person.lastname[0].toUpperCase()}</strong>
                                            </Avatar>
                                        ))}
                                </AvatarGroup>
                            ) :
                            <Box mb={2}>
                                <PleaseWait label={"Loading connections..."}/>
                            </Box>
                    }
                </CardContent>

            </Card>

            {canEdit ? (
                <XDialog title={"Grow your network"}
                         maxWidth={"sm"}
                         onClose={() => setOpenAddConnectionsDialog(false)}
                         open={openAddConnectionsDialog}>
                    <AddConnectionsForm
                        onClose={() => setOpenAddConnectionsDialog(false)}
                        person={person}/>
                </XDialog>
            ) : ""}
        </Box>
    )
}

export default PersonConnections