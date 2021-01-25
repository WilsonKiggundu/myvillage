import {IPerson} from "./IPerson";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import React, {useState} from "react";
import UpdateEducationForm from "./forms/profile/UpdateEducationForm";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonAwards = ({person, canEdit}: IProps) => {

    const {awards} = person
    const [openAddEductionDialog, setOpenAddEductionDialog] = useState<boolean>(false)
    const [selectedAward, setSelectedAward] = useState<any>(null)

    const handleUpdate = (award: any) => {
        setSelectedAward(award)
        setOpenAddEductionDialog(true)
    }

    const handleClose = () => {
        setOpenAddEductionDialog(false)
        setSelectedAward(null)
    }

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    action={
                        canEdit ? (
                            <IconButton
                                onClick={() => setOpenAddEductionDialog(true)}
                                aria-label="settings">
                                <AddIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title="Education / Awards"
                />

                {awards?.length ? (
                    <CardContent>
                        {
                            awards.map((it: any, index: number) => (
                                <Box key={index}>
                                    <Grid container key={index}>
                                        <Grid xs={11} item>
                                            <Typography variant={"h6"} component={"div"}>
                                                {it.institute?.name}
                                            </Typography>
                                            <Typography component={"div"}>
                                                {it.title}, {it.fieldOfStudy}
                                            </Typography>
                                            <Typography component={"div"} style={{color: grey[400]}}>
                                                {it.grade}, {it.startYear} - {it.endYear}
                                            </Typography>
                                            <Typography
                                                component={"div"}
                                                style={{color: grey[400], fontSize: '0.9rem'}}>
                                                {it.activities}
                                            </Typography>
                                            <Typography
                                                style={{paddingTop: 5, fontSize: '0.9rem'}}
                                                component={"div"}>
                                                {it.description}
                                            </Typography>

                                        </Grid>

                                        {canEdit ?
                                            <Grid xs={1} style={{textAlign: "right"}} item>
                                                <IconButton onClick={() => handleUpdate(it)}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </Grid> : ""}

                                    </Grid>

                                    <Divider style={{marginTop: 15, marginBottom: 30}}/>
                                </Box>
                            ))
                        }
                    </CardContent>
                ) : ""}

                {canEdit ? (
                    <XDialog title={"Update education"}
                             maxWidth={"md"}
                             onClose={handleClose}
                             open={openAddEductionDialog}>
                        <UpdateEducationForm
                            education={selectedAward}
                            onClose={handleClose}
                            person={person}/>
                    </XDialog>
                ) : ""}
            </Card>
        </Box>
    )
}

export default PersonAwards