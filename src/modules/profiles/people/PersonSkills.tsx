import {IPerson} from "./IPerson";
import UpdateProfileForm from "./forms/profile/UpdateProfileForm";
import {Typography} from "@material-ui/core";
import ProfileRating from "../../../components/ProfileRating";
import Fab from "@material-ui/core/Fab";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditIcon from "@material-ui/icons/Edit";
import React, {useEffect, useState} from "react";
import {globalStyles} from "../../../theme/styles";
import {getUser} from "../../../services/User";
import {IOption} from "../../../components/inputs/inputHelpers";
import {get, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import Chip from "@material-ui/core/Chip";
import UpdateSkillsForm from "./forms/profile/UpdateSkillsForm";

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
            <Typography style={{padding: '15px 0'}}>
                {
                    isMyProfile ? "My skills" : `${person.firstname}'s skills`
                }
            </Typography>

            <Card>
                <CardContent>
                    {skills ? skills.map(i =>
                        <Chip
                            label={i.name}
                            key={i.id}
                            style={{marginRight: 5, marginBottom: 5}}
                            clickable
                            color="primary"
                            variant="outlined"/>) : ""}

                    {isMyProfile ?
                        (
                            <Typography component={"div"} style={{position: "relative"}}>
                                <Fab
                                    style={{position: 'absolute', bottom: 0, right: 0}}
                                    size={"small"}
                                    onClick={() => setOpenEditSkillsDialog(true)}>
                                    <EditIcon/>
                                </Fab>

                                <XDialog title={"Update your skills"}
                                         maxWidth={"sm"}
                                         onClose={() => setOpenEditSkillsDialog(false)}
                                         open={openEditSkillsDialog}>
                                    <UpdateSkillsForm skills={skills} person={person}/>
                                </XDialog>

                            </Typography>
                        ) : ""}
                </CardContent>
            </Card>
        </Box>
    )
}

export default PersonSkills