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
import UpdateInterestsForm from "./forms/profile/UpdateInterestsForm";
import AddIcon from "@material-ui/icons/Add";
import CardHeader from "@material-ui/core/CardHeader";

interface IProps {
    person: IPerson
}

const PersonInterests = ({person}: IProps) => {

    const [user, setUser] = useState<any>(null)
    const [interests, setInterests] = useState<IOption[]>([])
    const isMyProfile: boolean = person.id === user?.profile?.sub
    const [openEditInterestsDialog, setOpenEditInterestsDialog] = useState<boolean>(false)


    useEffect(() => {
        const loggedInUser = getUser()
        setUser(loggedInUser)

        // person interests
        const url = makeUrl("Profiles", Endpoints.person.interest)
        get(url, {personId: person.id}, (response) => {
            if (response) {
                const interests = response.map((m: any) => ({id: m.interest.id, name: m.interest.category}))
                setInterests([...interests])
            }
        })

    }, [get, person, setInterests])

    return (
        <Box mb={2}>

            <Card>
                <CardHeader
                    action={
                        isMyProfile ? (
                            <IconButton
                                onClick={() => setOpenEditInterestsDialog(true)}
                                aria-label="settings">
                                <EditIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title={
                        isMyProfile ? "Your interests" : `${person.firstname}'s interests`
                    }
                />

                {interests.length ? (
                    <CardContent>
                        {interests ? interests.map(i =>
                            <Chip
                                label={i.name}
                                key={i.id}
                                style={{marginRight: 5, marginBottom: 5}}
                                clickable
                                color="secondary"
                                variant="default"/>) : ""}
                    </CardContent>
                ) : ""}

                {isMyProfile ? (
                    <XDialog title={"Update your interests"}
                             maxWidth={"sm"}
                             onClose={() => setOpenEditInterestsDialog(false)}
                             open={openEditInterestsDialog}>
                        <UpdateInterestsForm interests={interests} person={person}/>
                    </XDialog>
                ) : ""}
            </Card>
        </Box>
    )
}

export default PersonInterests