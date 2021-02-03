import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {IStartup} from "../../../interfaces/IStartup";
import XDialog from "../../../components/dialogs/XDialog";
import {CardHeader} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import UpdateContactForm from "./forms/UpdateContactForm";
import {IContact} from "../../../interfaces/IContact";
import {getContactCategoryLabel, getContactTypeLabel} from "../../../utils/enumHelpers";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import {deleteStartupContact} from "./redux/startupsActions";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

interface IProps {
    startup: IStartup
}

export default function StartupContacts({startup}: IProps) {

    const dispatch = useDispatch()
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [selected, setSelected] = useState<IContact>(Object.create({}))
    const {contacts} = startup

    const user = useSelector(userSelector)
    let canEdit = startup.roles?.some((role: any) => role.personId === user?.profile.sub) ?? false
    // canEdit = true

    const handleEdit = (contact: IContact) => {
        setSelected(contact)
        setOpenDialog(true)
    }

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    title={"Contacts"}
                    action={
                        canEdit ? (
                            <IconButton onClick={() => setOpenDialog(true)}>
                                <AddIcon/>
                            </IconButton>
                        ) : ""
                    }
                />
            </Card>
            <Box mt={2} mb={2}>
                {contacts?.length ? (
                    <Grid container spacing={2}>
                        {
                            contacts.map((item: any, index: number) => (
                                <Grid style={{position: 'relative'}} item xs={12} md={6} lg={4} key={index}>
                                    <Card>

                                        <CardHeader title={
                                            <Grid container justify={"space-between"}>
                                                <Grid item>
                                                    <Typography variant={"h6"}>
                                                        {getContactTypeLabel(item.contact.type)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Chip size={"small"}
                                                          label={getContactCategoryLabel(item.contact.category)}/>
                                                </Grid>
                                            </Grid>
                                        }
                                        />

                                        <Divider/>

                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography style={{textAlign: 'left', wordBreak: 'break-all'}}>
                                                        {item.contact.value}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography style={{
                                                        whiteSpace: 'pre-line',
                                                        fontSize: '0.9em',
                                                        textAlign: 'left'
                                                    }}>
                                                        <em>{item.contact.details}</em>
                                                    </Typography>
                                                </Grid>
                                            </Grid>


                                        </CardContent>

                                        {canEdit ? (
                                            <>
                                                <Divider/>

                                                <CardContent>
                                                    <Box pt={1}>
                                                        <Grid container justify={"center"} spacing={3}>
                                                            <ButtonGroup size={"small"}>
                                                                <Button onClick={() => handleEdit(item.contact)}>
                                                                    <EditIcon/>
                                                                </Button>
                                                                <Button onClick={() => dispatch(deleteStartupContact(
                                                                    {
                                                                        belongsTo: item.contact.belongsTo,
                                                                        contactId: item.contact.id
                                                                    }
                                                                ))}>
                                                                    <DeleteIcon color={"error"}/>
                                                                </Button>
                                                            </ButtonGroup>
                                                        </Grid>
                                                    </Box>
                                                </CardContent>
                                            </>
                                        ) : ""}
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                ) : ""}

                {canEdit ? (
                    <XDialog
                        title={"Update contacts"}
                        maxWidth={"sm"}
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}>
                        <UpdateContactForm
                            contact={selected}
                            onClose={() => setOpenDialog(false)}
                            profile={startup}/>
                    </XDialog>
                ) : ""}
            </Box>
        </Box>
    );
}