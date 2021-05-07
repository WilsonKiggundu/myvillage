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
import {deletePersonProject} from "./redux/peopleActions";
import GitHubIcon from '@material-ui/icons/GitHub';
import UpdateProjectForm from "./forms/profile/UpdateProjectForm";
import {IProject} from "../../../interfaces/IProject";
import {Chip, ListItem} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import LanguageIcon from '@material-ui/icons/Language';

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonProjects = ({person, canEdit}: IProps) => {

    const dispatch = useDispatch()
    const {projects} = person
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [selected, setSelected] = useState<any>(null)

    const handleUpdate = (project: any) => {
        setSelected(project)
        setOpenDialog(true)
    }

    const handleDelete = (project: any) => {
        dispatch(deletePersonProject({
            projectId: project.id,
            personId: project.personId
        }))
    }

    const handleClose = () => {
        setOpenDialog(false)
        setSelected(null)
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
                            <Grid item><GitHubIcon/></Grid>
                            <Grid item>
                                <div className="card-title">Projects worked on</div>
                            </Grid>
                        </Grid>
                    }
                />

                {projects?.length ? (
                    <CardContent>
                        {
                            projects.map((project: IProject, index: number) => (
                                <Box key={index}>
                                    <Grid container key={index}>
                                        <Grid xs={11} item>
                                            <Typography variant={"h6"} component={"div"}>
                                                {project.title}
                                            </Typography>
                                            <Typography component={"div"}>
                                                {project.role}, {project.client}
                                            </Typography>
                                            <Typography component={"div"} style={{color: grey[400]}}>
                                                {project.from} - {project.until}
                                            </Typography>

                                            <Box mt={2}>
                                                <Typography style={{color: grey[400]}}>
                                                    <small>Details</small>
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        whiteSpace: 'pre-line',
                                                        paddingTop: 5,
                                                        color: grey[700],
                                                        fontSize: '0.9rem'
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: project.description
                                                    }}
                                                    component={"div"}/>
                                            </Box>

                                            {project.techStack && <Box mt={4} mb={4}>
                                                <Typography
                                                    component={"div"}
                                                    style={{color: grey[700], fontSize: '0.9rem'}}>
                                                    <Chip variant={"default"} color={"secondary"} label={"Tech stack"} style={{marginRight: 5, marginBottom: 5}}/>
                                                    {project.techStack.split(',').map((m: string, index: number) => (
                                                        <Chip key={index} label={m} style={{marginRight: 5, marginBottom: 5}}/>
                                                    ))}
                                                </Typography>
                                            </Box>}

                                        </Grid>

                                        {canEdit ?
                                            <Grid xs={1} style={{textAlign: "right"}} item>
                                                <IconButton onClick={() => handleUpdate(project)}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(project)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Grid> : ""}

                                        <Grid item xs={12}>
                                            <Grid spacing={2} justify={"flex-start"} container>
                                                <Grid item>
                                                    {project.url && <Box mt={4}>
                                                        <Button href={project.url}
                                                                variant={"outlined"}
                                                                target={"_blank"}
                                                                color={"secondary"}
                                                                size={"medium"}>
                                                            <LanguageIcon/>&nbsp;&nbsp;View project
                                                        </Button>
                                                    </Box>}
                                                </Grid>
                                                <Grid item>
                                                    {project.linkToGitRepo && <Box mt={4}>
                                                        <Button href={project.linkToGitRepo}
                                                                target={"_blank"}
                                                                variant={"contained"}
                                                                disableElevation
                                                                color={"primary"}
                                                                size={"medium"}>
                                                            <GitHubIcon/>&nbsp;&nbsp;
                                                            Browse repository
                                                        </Button>
                                                    </Box>}
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                    {index < projects.length - 1 ? <Divider style={{marginTop: 30, marginBottom: 30}}/> : ""}


                                </Box>
                            ))
                        }
                    </CardContent>
                ) : ""}

                {canEdit ? (
                    <XDialog title={"Update project"}
                             maxWidth={"md"}
                             onClose={handleClose}
                             open={openDialog}>
                        <UpdateProjectForm
                            project={selected}
                            onClose={handleClose}/>
                    </XDialog>
                ) : ""}
            </Card>
        </Box>
    )
}

export default PersonProjects