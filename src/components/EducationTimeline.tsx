import React, {useEffect, useState} from 'react';
import SchoolIcon from '@material-ui/icons/School';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {globalStyles} from "../theme/styles"
import clsx from "clsx";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {IconButton} from "@material-ui/core";
import UpdateEducationForm from "../modules/profiles/people/forms/profile/UpdateEducationForm";
import XDialog from "./dialogs/XDialog";
import XConfirmDialog from "./dialogs/XConfirmDialog";
import {IEducation} from "../interfaces/IEducation";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import grey from "@material-ui/core/colors/grey";
import Avatar from "@material-ui/core/Avatar";
import {IPerson} from "../modules/profiles/people/IPerson";
import {get, makeUrl} from "../utils/ajax";
import {Endpoints} from "../services/Endpoints";

interface IProps {
    awards?: IEducation[]
    person: IPerson
    isMine: boolean
}

export default function EducationTimeline({person, isMine, awards}: IProps) {
    const classes = globalStyles();

    const [selectedAward, setSelectedAward] = useState<IEducation | undefined>(undefined)
    const [openEditEductionDialog, setOpenEditEductionDialog] = useState<boolean>(false)
    const [openDeleteEductionDialog, setOpenDeleteEductionDialog] = useState<boolean>(false)

    const handleEditClick = (award: IEducation) => {
        setSelectedAward(award)
        setOpenEditEductionDialog(true)
    }

    return (
        <>
            {
                awards ?
                    awards.map((it: IEducation, index: number) => (
                        <Grid container key={index}>
                            <Grid xs={10} item>
                                <Typography variant={"h6"} component={"div"}>
                                    {it.awardedBy}
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

                                <Divider style={{marginTop: 15, marginBottom: 15}}/>
                            </Grid>

                            <Grid style={{textAlign: "right"}} item xs={2}>
                                {isMine ? (
                                    <>
                                        <IconButton
                                            onClick={() => handleEditClick(it)}
                                            style={{marginLeft: 15}} size={"small"}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            onClick={() => setOpenDeleteEductionDialog(true)}
                                            size={"small"}>
                                            <DeleteIcon/>
                                        </IconButton>

                                        <XDialog title={"Edit education"}
                                                 maxWidth={"md"}
                                                 onClose={() => setOpenEditEductionDialog(false)}
                                                 open={openEditEductionDialog}>
                                            <UpdateEducationForm education={selectedAward} person={person}/>
                                        </XDialog>

                                        <XConfirmDialog
                                            open={openDeleteEductionDialog}
                                            title={"Delete education record?"}
                                            message={"This means that this record will no longer " +
                                            "be visible on your profile."}
                                            onContinue={() => {
                                            }}
                                            onClose={() => setOpenDeleteEductionDialog(false)}
                                        />

                                    </>
                                ) : ""}
                            </Grid>
                        </Grid>
                    )) :
                    <Typography>
                        Have you received any awards?
                        <Button color="secondary"
                                variant="outlined"
                                style={{marginLeft: 15}}
                                className={clsx(classes.noShadow)}>Boost your profile</Button>
                    </Typography>
            }
        </>
    );
}