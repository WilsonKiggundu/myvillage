import {IPerson} from "./IPerson";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import React, {useEffect, useState} from "react";
import {getUser} from "../../../services/User";
import {get, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import {IEducation} from "../../../interfaces/IEducation";
import EducationTimeline from "../../../components/EducationTimeline";
import UpdateEducationForm from "./forms/profile/UpdateEducationForm";
import CardHeader from "@material-ui/core/CardHeader";

interface IProps {
    person: IPerson
}

const PersonAwards = ({person}: IProps) => {

    const [user, setUser] = useState<any>(null)
    const [awards, setAwards] = useState<IEducation[]>([])
    const isMyProfile: boolean = person.id === user?.profile?.sub
    const [openAddEductionDialog, setOpenAddEductionDialog] = useState<boolean>(false)


    useEffect(() => {
        const loggedInUser = getUser()
        setUser(loggedInUser)

        // person awards
        const url = makeUrl("Profiles", Endpoints.person.award)
        get(url, {personId: person.id}, (awards) => {
            if (awards) {
                setAwards([...awards])
            }
        })

    }, [get, person, setAwards])

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    action={
                        isMyProfile ? (
                            <IconButton
                                onClick={() => setOpenAddEductionDialog(true)}
                                aria-label="settings">
                                <AddIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title="Education / Awards"
                />

                {awards.length ? (
                    <CardContent>
                        <EducationTimeline awards={awards} person={person} isMine={isMyProfile}/>
                    </CardContent>
                ) : ""}

                {isMyProfile ? (
                    <XDialog title={"Add education"}
                             maxWidth={"md"}
                             onClose={() => setOpenAddEductionDialog(false)}
                             open={openAddEductionDialog}>
                        <UpdateEducationForm
                            onClose={() => setOpenAddEductionDialog(false)}
                            person={person}/>
                    </XDialog>
                ) : ""}
            </Card>
        </Box>
    )
}

export default PersonAwards