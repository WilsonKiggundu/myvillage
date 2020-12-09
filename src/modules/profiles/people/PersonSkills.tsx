import {IPerson} from "./IPerson";
import {Typography} from "@material-ui/core";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import React, {useEffect, useState} from "react";
import {getUser} from "../../../services/User";
import {IOption} from "../../../components/inputs/inputHelpers";
import {get, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import Chip from "@material-ui/core/Chip";
import UpdateSkillsForm from "./forms/profile/UpdateSkillsForm";
import CardHeader from "@material-ui/core/CardHeader";

interface IProps {
    person: IPerson
}

const PersonSkills = ({person}: IProps) => {

    const [user, setUser] = useState<any>(null)
    const [skills, setSkills] = useState<IOption[]>([])
    const isMyProfile: boolean = person.id === user?.profile?.sub
    const [openEditSkillsDialog, setOpenEditSkillsDialog] = useState<boolean>(false)


    useEffect(() => {
        const loggedInUser = getUser()
        setUser(loggedInUser)

        // person skills
        const url = makeUrl("Profiles", Endpoints.person.skill)
        get(url, {personId: person.id}, (response) => {
            if (response) {
                const skills = response.map((m: any) => ({id: m.id, name: m.details}))
                setSkills([...skills])
            }
        })

    }, [get, person, setSkills])

    return (
        <Box mb={2}>

            <Card>
                <CardHeader
                    action={
                        isMyProfile ? (
                            <IconButton
                                onClick={() => setOpenEditSkillsDialog(true)}
                                aria-label="settings">
                                <EditIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title={
                        isMyProfile ? "Your skills" : `${person.firstname}'s skills`
                    }
                />

                {skills.length ? (
                    <CardContent>
                        {skills ? skills.map(i =>
                            <Chip
                                label={i.name}
                                key={i.id}
                                style={{marginRight: 5, marginBottom: 5}}
                                clickable
                                color="primary"
                                variant="outlined"/>) : (
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
                        skills={skills} person={person}/>
                </XDialog>
            </Card>
        </Box>
    )
}

export default PersonSkills