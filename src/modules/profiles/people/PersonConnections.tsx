import {IPerson} from "./IPerson";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import React, {useEffect, useState} from "react";
import CardHeader from "@material-ui/core/CardHeader";
import AddConnectionsForm from "./forms/profile/AddConnectionsForm";
import {globalStyles} from "../../../theme/styles";
import {getAsync, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import ListItem from "@material-ui/core/ListItem";
import {Urls} from "../../../routes/Urls";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import {List} from "@material-ui/core";
import {useHistory} from "react-router-dom";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonConnections = ({person, canEdit}: IProps) => {

    const classes = globalStyles()
    const history = useHistory()
    const [connections, setConnections] = useState<any>([])

    useEffect(() => {
        (async () => {
            const url = makeUrl("Profiles", Endpoints.person.connection)
            const response: any = await getAsync(url, {personId: person.id})

            setConnections([...connections, ...response.body])

        })()
    }, [person.id])

    const [openAddConnectionsDialog, setOpenAddConnectionsDialog] = useState<boolean>(false)

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    action={
                        canEdit ? (
                            <IconButton
                                onClick={() => setOpenAddConnectionsDialog(true)}
                                aria-label="settings">
                                <AddIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title="Add connections"
                />

                {connections?.length ? (
                    <CardContent>
                        <List>
                            {connections?.map((connection: any, index: number) => {
                                return (
                                    <Box key={index}>
                                        <ListItem button
                                                  onClick={() => history.push(Urls.profiles.onePerson(connection.person.id))}
                                                  alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={connection.person.firstname}
                                                        src={connection.person.avatar}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`${connection.person.firstname} ${connection.person.lastname}`}
                                                secondary={
                                                    <Typography
                                                        noWrap
                                                        className={classes.ellipsis}
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >
                                                        {/*{connection.person.bio}*/}
                                                    </Typography>
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="more">
                                                    <ChevronRightIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider variant="fullWidth" component="li"/>
                                    </Box>
                                )
                            })}
                        </List>
                    </CardContent>
                ) : ""}

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
            </Card>
        </Box>
    )
}

export default PersonConnections