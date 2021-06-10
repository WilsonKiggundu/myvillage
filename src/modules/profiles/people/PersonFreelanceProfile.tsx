import {IPerson} from "./IPerson";
import {Divider, Typography} from "@material-ui/core";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import React, {useEffect, useState} from "react";
import Chip from "@material-ui/core/Chip";
import UpdateSkillsForm from "./forms/profile/UpdateSkillsForm";
import CardHeader from "@material-ui/core/CardHeader";
import {useDispatch} from "react-redux";
import {deletePersonSkills} from "./redux/peopleActions";
import Grid from "@material-ui/core/Grid";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

import './People.css'
import UpdateFreelanceTermsForm from "../../freelancers/forms/UpdateFreelanceTerms";
import {AttachMoney, MoneyRounded} from "@material-ui/icons";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonFreelanceProfile = ({person, canEdit}: IProps) => {

    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const getRateTypeLabel = (type: number) => {
        switch (type) {
            case 1:
                return 'hour'
            case 2:
                return 'day'
            case 3:
                return 'week'
            case 4:
                return 'month'
            case 5:
                return 'quarter'
            case 6:
                return 'year'
            default:
                return type
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
                                <EditIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title={
                        <Grid container spacing={1} justify={"flex-start"}>
                            <Grid item><AttachMoney /></Grid>
                            <Grid item><div className="card-title">Freelance profile</div></Grid>
                        </Grid>
                    }
                />

                {person.freelanceTerms ? (
                    <CardContent>
                        <Box mb={2}>
                            <strong>Rates</strong><br/>
                            {person.freelanceTerms.currency} {person.freelanceTerms.rate} per {getRateTypeLabel(person.freelanceTerms.rateType)}
                        </Box>

                        <Divider />

                        <Box mt={2}>
                            <div dangerouslySetInnerHTML={{__html: person.freelanceTerms.details}} />
                        </Box>

                    </CardContent>
                ) : ""}

                <XDialog title={"Update your freelance profile"}
                         maxWidth={"sm"}
                         onClose={() => setOpenDialog(false)}
                         open={openDialog}>
                    <UpdateFreelanceTermsForm
                        onClose={() => setOpenDialog(false)}
                        freelanceTerms={person.freelanceTerms}/>
                </XDialog>
            </Card>
        </Box>
    )
}

export default PersonFreelanceProfile