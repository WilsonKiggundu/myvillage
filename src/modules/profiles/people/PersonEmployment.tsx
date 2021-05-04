import {IPerson} from "./IPerson";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import React, {useState} from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import {useDispatch} from "react-redux";
import {Work} from "@material-ui/icons";
import UpdateEmploymentForm from "./forms/profile/UpdateEmploymentForm";
import {deletePersonEmployment} from "./redux/peopleActions";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonEmployment = ({person, canEdit}: IProps) => {

    const dispatch = useDispatch()
    const {employment} = person
    const [openDialog, toggleDialog] = useState<boolean>(false)
    const [selected, setSelected] = useState<any>(null)

    const handleUpdate = (employment: any) => {
        setSelected(employment)
        toggleDialog(true)
    }

    const handleDelete = (employment: any) => {
        dispatch(deletePersonEmployment({
            personId: employment.personId,
            employmentId: employment.id
        }))
    }

    const handleClose = () => {
        toggleDialog(false)
        setSelected(null)
    }

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    action={
                        canEdit ? (
                            <IconButton
                                onClick={() => toggleDialog(true)}
                                aria-label="settings">
                                <AddIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title={
                        <Grid container spacing={1} justify={"flex-start"}>
                            <Grid item><Work/></Grid>
                            <Grid item>
                                <div className="card-title">Employment History</div>
                            </Grid>
                        </Grid>
                    }
                />

                {employment.length ? (
                    <CardContent>
                        {
                            employment.map((it: any, index: number) => (
                                <Box key={index}>
                                    <Grid container key={index}>
                                        <Grid xs={11} item>
                                            <Typography variant={"h6"} component={"div"}>
                                                {it.title}
                                            </Typography>
                                            <Typography component={"div"}>
                                                {it.company}
                                            </Typography>
                                            <Typography component={"div"} style={{color: grey[400]}}>
                                                {it.from} - {it.until}
                                            </Typography>

                                            <Box mt={2}>
                                                <Typography style={{color: grey[400]}}>
                                                    <small>Details</small>
                                                </Typography>
                                                <div
                                                    style={{
                                                        paddingTop: 5,
                                                        color: grey[700],
                                                        fontSize: '0.9rem'
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: it.description
                                                    }}/>
                                            </Box>

                                        </Grid>

                                        {canEdit ?
                                            <Grid xs={1} style={{textAlign: "right"}} item>
                                                <IconButton onClick={() => handleUpdate(it)}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(it)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Grid> : ""}

                                    </Grid>

                                    {index < employment.length - 1 ? <Divider style={{marginTop: 30, marginBottom: 30}}/> : ""}
                                </Box>
                            ))
                        }
                    </CardContent>
                ) : ""}

                {canEdit ? (
                    <XDialog title={"Update employment"}
                             maxWidth={"md"}
                             onClose={handleClose}
                             open={openDialog}>
                        <UpdateEmploymentForm
                            employment={selected}
                            onClose={handleClose}
                            person={person}/>
                    </XDialog>
                ) : ""}
            </Card>
        </Box>
    )
}

export default PersonEmployment