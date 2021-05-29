import React, {useState} from "react"
import {Divider, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {IJob} from "../../interfaces/IJob";
import Button from "@material-ui/core/Button";
import XDrawer, {Anchor} from "../../components/drawer/XDrawer";
import {IApplicant} from "../../interfaces/IApplicant";
import {getAsync, makeUrl} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import {IPerson} from "../profiles/people/IPerson";
import {timeAgo} from "../../utils/dateHelpers";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {Urls} from "../../routes/Urls";
import {useHistory} from "react-router-dom";
import {PleaseWait} from "../../components/PleaseWait";
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import CancelIcon from "@material-ui/icons/Cancel"
import HourglassFullIcon from "@material-ui/icons/HourglassFull"
import Badge from "@material-ui/core/Badge";

interface IProps {
    job: IJob
}

const ViewApplicants = ({job}: IProps) => {

    const history = useHistory()

    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const [drawerAnchor, setDrawerAnchor] = useState<Anchor>("right")
    const [applicants, setApplicants] = useState<IApplicant[] | undefined>(undefined)
    const [allApplications, setAllApplications] = useState<any>([])
    const [acceptedApplications, setAcceptedApplications] = useState<any>([])
    const [rejectedApplications, setRejectedApplications] = useState<any>([])
    const [pendingApplications, setPendingApplications] = useState<any>([])

    const handleViewApplicant = (id: string, requestId: any, status: string) => {
        const query: any = {
            jobId: job?.id,
            requestId: requestId,
            status: status,
            context: "job_application"
        }

        const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');

        const url = Urls.profiles.onePerson(id)
        history.push({
            pathname: url,
            search: `?${queryString}`
        })
    }

    const toggleDrawer = async (anchor: Anchor, open: boolean) => {
        setOpenDrawer(open)
        setDrawerAnchor(anchor)

        if (open) {
            const applicants: any = []

            if (job?.applications) {

                job.applications.map((application: any) => {
                    applicants.push({
                        requestId: application.id,
                        avatar: application.avatar ?? "",
                        profileId: application.profileId,
                        date: timeAgo(application.dateTime),
                        name: application.name,
                        status: application.status
                    })
                })

                setAllApplications(applicants)
                setAcceptedApplications(applicants.filter((f: any) => f.status === 4))
                setRejectedApplications(applicants.filter((f: any) => f.status === 2))
                setPendingApplications(applicants.filter((f: any) => f.status === 1))

                setApplicants(applicants)
            }

        }

    }

    return (
        <>
            <Divider/>
            <CardContent>
                <Grid container justify={"center"}>
                    <Grid item>
                        {job.applications?.length ?
                            <Badge color={"secondary"} badgeContent={job.applications?.length}>
                                <Button
                                    style={{textTransform: 'inherit'}}
                                    onClick={() => toggleDrawer("right", true)}
                                    color={"default"}
                                    variant={"outlined"}>
                                    View Applications
                                </Button>
                            </Badge> :
                            <span style={{color: "red"}}>No applications yet</span>
                        }
                    </Grid>
                </Grid>
            </CardContent>

            <XDrawer
                onClose={() => toggleDrawer("right", false)}
                open={openDrawer}
                anchor={drawerAnchor}>
                <div className="Drawer">
                    {
                        applicants ?
                            <>

                                <List
                                    subheader={
                                        <ListSubheader
                                            className="Drawer-subheader">
                                            Applications
                                        </ListSubheader>
                                    }>

                                    <div
                                        className="application-button-group">
                                        <ButtonGroup color={"default"}>
                                            <Button
                                                onClick={() => setApplicants(allApplications)}>
                                                All
                                                ({allApplications.length})
                                            </Button>
                                            {
                                                pendingApplications.length ?
                                                    <Button
                                                        onClick={() => setApplicants(pendingApplications)}
                                                    >
                                                        Pending
                                                        ({pendingApplications.length})
                                                    </Button> : ""
                                            }
                                            {
                                                acceptedApplications.length ?
                                                    <Button
                                                        onClick={() => setApplicants(acceptedApplications)}
                                                        className="application-accept-button">
                                                        Accepted
                                                        ({acceptedApplications.length})
                                                    </Button> : ""
                                            }
                                            {
                                                rejectedApplications.length ?
                                                    <Button
                                                        onClick={() => setApplicants(rejectedApplications)}
                                                        className="application-reject-button">
                                                        Rejected
                                                        ({rejectedApplications.length})
                                                    </Button> : ""
                                            }
                                        </ButtonGroup>
                                    </div>

                                    {applicants ? applicants.map((applicant: IApplicant, index: number) => (
                                        <div key={index}>
                                            <ListItem
                                                onClick={
                                                    () => handleViewApplicant(
                                                        applicant.profileId,
                                                        applicant.id,
                                                        applicant.status ?? 'pending'
                                                    )
                                                }
                                                button
                                                alignItems="flex-start">
                                                <ListItemText
                                                    primary={
                                                        applicant.name
                                                    }
                                                    secondary={
                                                        <span className="Drawer-timeago">
                                                            {applicant.date}
                                                        </span>
                                                    }/>
                                                <ListItemSecondaryAction>
                                                    {
                                                        applicant.status === 'accepted' ?
                                                            <CheckCircleIcon
                                                                className="application-accept-icon"/> :
                                                            applicant.status === 'rejected' ?
                                                                <CancelIcon
                                                                    className="application-reject-icon"/> :
                                                                <HourglassFullIcon/>
                                                    }
                                                </ListItemSecondaryAction>

                                            </ListItem>
                                            <Divider/>
                                        </div>
                                    )) : ""}
                                </List>
                            </> :
                            <PleaseWait label={"Loading applicants..."}/>
                    }
                </div>
            </XDrawer>
        </>
    )
}

export default ViewApplicants