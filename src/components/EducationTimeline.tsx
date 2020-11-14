import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import SchoolIcon from '@material-ui/icons/School';
import Paper from '@material-ui/core/Paper';
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
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import {number} from "yup";
import grey from "@material-ui/core/colors/grey";
import Avatar from "@material-ui/core/Avatar";

interface IProps {
    education: any
    isMine: boolean
}

export default function EducationTimeline(props: IProps) {
    const classes = globalStyles();
    const {isMine, education} = props

    const [openEditEductionDialog, setOpenEditEductionDialog] = useState<boolean>(false)
    const [openDeleteEductionDialog, setOpenDeleteEductionDialog] = useState<boolean>(false)

    return (
        education ?
            education.map((it: IEducation, index: number) => (
                <Grid container key={index}>
                    <Grid item xs={1}>
                        <Avatar variant={"square"}>
                            <SchoolIcon />
                        </Avatar>
                    </Grid>
                    <Grid xs={9} item>
                        <Typography variant={"h6"} component={"div"}>
                            {it.school}
                        </Typography>
                        <Typography component={"div"}>
                            {it.degree}, {it.fieldOfStudy}
                        </Typography>
                        <Typography component={"div"} style={{color: grey[400]}}>
                            {it.startYear} - {it.endYear}
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
                                    onClick={() => setOpenEditEductionDialog(true)}
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
                                    <UpdateEducationForm/>
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

    );
}