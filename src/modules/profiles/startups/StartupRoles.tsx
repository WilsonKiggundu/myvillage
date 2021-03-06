import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {IStartup} from "../../../interfaces/IStartup";
import XDialog from "../../../components/dialogs/XDialog";
import {CardHeader, List} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add"
import AddStartupRole from "./forms/AddStartupRole";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {useHistory} from 'react-router-dom';
import {Urls} from "../../../routes/Urls";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import DeleteIcon from "@material-ui/icons/Delete"
import {deleteStartupRoles} from "./redux/startupsActions";
import {grey} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import AddIcCallIcon from "@material-ui/icons/AddIcCall";
import GroupIcon from '@material-ui/icons/Group';

interface IProps {
    startup: IStartup
}

export default function StartupRoles({startup}: IProps) {
    const history = useHistory()
    const dispatch = useDispatch()
    const {roles} = startup
    const [addDialog, setAddDialog] = useState<boolean>(false)

    const people = roles?.filter((r: any) => r.role !== 'PageAdmin')

    const user = useSelector(userSelector)
    let canEdit = startup.roles?.some((role: any) => role.personId === user?.profile.sub) ?? false

    const handleDelete = (personId: string) => {
        dispatch(deleteStartupRoles({businessId: startup.id, personId: personId}))
    }

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    title={
                        <Grid container spacing={1} justify={"flex-start"}>
                            <Grid item><GroupIcon /></Grid>
                            <Grid item><div className="card-title">Meet our team</div></Grid>
                        </Grid>
                    }
                    action={
                        canEdit ? (
                            <IconButton onClick={() => setAddDialog(true)}>
                                <AddIcon/>
                            </IconButton>
                        ) : ""
                    }
                />
                <Divider/>
                <CardContent style={{margin: -15}}>
                    {people && people.length > 0 ? (
                        <List>
                            {people?.map((role: any, index: number) => {
                                return (
                                    <Box key={index}>
                                        <ListItem
                                            button
                                            onClick={() => history.push(Urls.profiles.onePerson(role.personId))}
                                            alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={role.person.firstname} src={role.person.avatar}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`${role.person.firstname} ${role.person.lastname}`}
                                                secondary={
                                                    <span style={{color: grey[400]}}>
                                                        {role.role === 'PageAdmin' ? 'Administrator' : role.role}
                                                    </span>
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                {canEdit ? (
                                                    <IconButton onClick={() => handleDelete(role.personId)} edge="end" aria-label="more">
                                                        <DeleteIcon style={{color: "red"}}/>
                                                    </IconButton>
                                                ) : ""}
                                                <IconButton
                                                    onClick={() => history.push(Urls.profiles.onePerson(role.personId))}
                                                    edge="end"
                                                    aria-label="more">
                                                    <ChevronRightIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        {index < people?.length - 1 ? <Divider variant="fullWidth" component="li"/> : ""}
                                    </Box>
                                )
                            })}
                        </List>
                    ) : "No persons found"}
                </CardContent>
            </Card>

            <XDialog
                maxWidth={"sm"}
                title={"Add a person to your profile"}
                open={addDialog}
                onClose={() => setAddDialog(false)}>
                <AddStartupRole profile={startup} onClose={() => setAddDialog(false)}/>
            </XDialog>

        </Box>
    );
}