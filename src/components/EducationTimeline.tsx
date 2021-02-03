import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {globalStyles} from "../theme/styles"
import clsx from "clsx";
import {IEducation} from "../interfaces/IEducation";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import grey from "@material-ui/core/colors/grey";
import {IPerson} from "../modules/profiles/people/IPerson";
import {IconButton} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

interface IProps {
    awards?: IEducation[]
    person: IPerson
    isMine: boolean
}

export default function EducationTimeline({ awards}: IProps) {
    const classes = globalStyles();

    return (
        <>
            {
                awards ?
                    awards.map((it: any, index: number) => (
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

                            <Grid xs={1} style={{textAlign: "right"}} item>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Grid>

                            <Divider style={{marginTop: 15, marginBottom: 15}}/>

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