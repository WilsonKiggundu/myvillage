import {IPerson, isDeveloper} from "./IPerson";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import React, {useEffect, useState} from "react";
import CardHeader from "@material-ui/core/CardHeader";
import {deletePersonStack} from "./redux/peopleActions";
import {useDispatch} from "react-redux";
import Grid from "@material-ui/core/Grid";
import CodeIcon from "@material-ui/icons/Code";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateTechStackForm from "./forms/profile/UpdateTechStackForm";
import {Divider, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {ITechStack} from "../../../interfaces/ITechStack";
import {Rating} from "@material-ui/lab";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonStack = ({person, canEdit}: IProps) => {

    const dispatch = useDispatch()
    const {stacks} = person

    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [selected, setSelected] = useState<any>(null)

    const handleUpdate = (stack: any) => {
        setSelected(stack)
        setOpenDialog(true)
    }

    const handleDelete = (stack: any) => {
        dispatch(deletePersonStack({
            stackId: stack.id,
            personId: stack.personId
        }))
    }

    const handleClose = () => {
        setOpenDialog(false)
        setSelected(null)
    }

    const getRating = (value: string) => {
        switch (value) {
            case 'beginner':
                return 1
            case 'intermediate':
                return 2.5
            case 'expert':
                return 5
            default:
                return 2.5
        }
    }

    return (
        <Box mb={2}>

            <Card>
                <CardHeader
                    action={
                        canEdit ? (
                            <IconButton
                                onClick={() => setOpenDialog(true)}
                                aria-label="settings">
                                <AddIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title={
                        <Grid container spacing={1} justify={"flex-start"}>
                            <Grid item><CodeIcon/></Grid>
                            <Grid item>
                                <div className="card-title">Tech stack</div>
                            </Grid>
                        </Grid>
                    }
                />

                {stacks?.length ? (
                    <List>
                        {stacks.map((it: ITechStack, index: number) => (
                            <div key={index}>
                                <ListItem button>
                                    <ListItemText
                                        primary={it.stack}
                                        secondary={
                                            <>
                                                <Rating
                                                    precision={0.5}
                                                    size={"small"}
                                                    readOnly
                                                    name="disabled"
                                                    value={getRating(it.level)}
                                                />
                                            </>
                                        }
                                    />

                                    {canEdit && <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => handleUpdate(it)}
                                            edge="end" aria-label="edit">
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(it)}
                                            edge="end" aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>}
                                </ListItem>
                                {index < stacks.length - 1 ? <Divider/> : ""}
                            </div>
                        ))}
                    </List>
                ) : ""}

                {canEdit ? (
                    <XDialog title={"Update your stack"}
                             maxWidth={"sm"}
                             onClose={handleClose}
                             open={openDialog}>
                        <UpdateTechStackForm
                            stack={selected}
                            onClose={handleClose}/>
                    </XDialog>
                ) : ""}
            </Card>
        </Box>
    )
}

export default PersonStack