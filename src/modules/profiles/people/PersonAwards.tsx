import {IPerson} from "./IPerson";
import XDialog from "../../../components/dialogs/XDialog";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import React, { useState} from "react";
import {getProfile, getUser} from "../../../services/User";
import EducationTimeline from "../../../components/EducationTimeline";
import UpdateEducationForm from "./forms/profile/UpdateEducationForm";
import CardHeader from "@material-ui/core/CardHeader";

interface IProps {
    person: IPerson
}

const PersonAwards = ({person}: IProps) => {

    const user: IPerson = getProfile()
    const {awards} = person
    const isMyProfile: boolean = person.id === user.id
    const [openAddEductionDialog, setOpenAddEductionDialog] = useState<boolean>(false)

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

                {awards?.length ? (
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