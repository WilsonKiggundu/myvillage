import {IPerson} from "./IPerson";
import {Typography} from "@material-ui/core";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import React, {useState} from "react";
import Chip from "@material-ui/core/Chip";
import UpdateSkillsForm from "./forms/profile/UpdateSkillsForm";
import CardHeader from "@material-ui/core/CardHeader";
import grey from "@material-ui/core/colors/grey";
import {useDispatch} from "react-redux";
import {deletePersonSkills} from "./redux/peopleActions";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonSkills = ({person, canEdit}: IProps) => {

    const dispatch = useDispatch()
    const {skills} = person
    const [openEditSkillsDialog, setOpenEditSkillsDialog] = useState<boolean>(false)

    const handleSkillDelete = (skillId: string) => {
        dispatch(deletePersonSkills({skillId, personId: person.id}))
    }

    return (
        <Box mb={2}>

            <Card>
                <CardHeader
                    action={
                        canEdit ? (
                            <IconButton
                                onClick={() => setOpenEditSkillsDialog(true)}
                                aria-label="settings">
                                <EditIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title={"Personal skills"}
                />

                {skills?.length ? (
                    <CardContent>
                        {skills ? skills.map((item: any) =>
                            item.skill ? (
                             canEdit ? <Chip
                                 label={item.skill.name}
                                 onDelete={() => handleSkillDelete(item.skillId)}
                                 key={item.skillId}
                                 style={{marginRight: 5, marginBottom: 5}}
                                 clickable
                                 variant="outlined"/> :
                                 <Chip
                                     label={item.skill.name}
                                     key={item.skillId}
                                     style={{marginRight: 5, marginBottom: 5}}
                                     clickable
                                     variant="outlined"/>

                            ) : ""
                        ) : (
                            <Typography>
                                Not found
                            </Typography>
                        )}

                    </CardContent>
                ) : ""}


                <XDialog title={"Update your skills"}
                         maxWidth={"sm"}
                         onClose={() => setOpenEditSkillsDialog(false)}
                         open={openEditSkillsDialog}>
                    <UpdateSkillsForm
                        onClose={() => setOpenEditSkillsDialog(false)}
                        person={person}/>
                </XDialog>
            </Card>
        </Box>
    )
}

export default PersonSkills