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
import {CardContent} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {loadPersonConnection} from "./redux/peopleActions";
import {personSelector} from "./redux/peopleSelectors";
import { useHistory } from "react-router-dom";
import {Urls} from "../../../routes/Urls";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonConnections = ({person, canEdit}: IProps) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {connections} = useSelector((state: any) => personSelector(state, person.id))

    useEffect(() => {
        dispatch(loadPersonConnection({personId: person.id}))
    }, [person.id])

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
                    title="Connections"
                />

                {connections?.length ? (
                    <CardContent>
                        <XPersonGridList
                            people={
                                connections.map((connection: any) => {
                                    return connection.person
                                })
                            }/>
                    </CardContent>
                ) : ""}

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