import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import XDialog from "../../../components/dialogs/XDialog";
import XForm from "../../../components/forms/XForm";
import XRichTextArea from "../../../components/inputs/XRichTextArea";
import React, {useState} from "react";
import * as yup from "yup";
import {reqString} from "../../../data/validations";
import {makeUrl, putAsync} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import Toast from "../../../utils/Toast";
import {IPerson} from "./IPerson";
import {Urls} from "../../../routes/Urls";

interface IProps {
    person: IPerson
    jobId: string
    requestId: string
}

const schema = yup.object().shape(
    {
        message: reqString
    }
)

const initialValues: any = {
    message: undefined
}

const PersonJobApplicationActions = ({person, jobId, requestId}: IProps) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [showAcceptDialog, setShowAcceptDialog] = useState<boolean>(false)
    const [showRejectDialog, setShowRejectDialog] = useState<boolean>(false)
    const [showGetDetailsDialog, setShowGetDetailsDialog] = useState<boolean>(false)
    const [status, setStatus] = useState<number | undefined>(undefined);

    const handleAction = (status: number) => {
        setStatus(status)
        if (status === 2) {
            setShowRejectDialog(true)
        } else if (status === 3) {
            setShowGetDetailsDialog(true)
        } else if (status === 4) {
            setShowAcceptDialog(true)
        }
    }

    const handleSubmit = (values: any) => {
        const url = makeUrl("Profiles", Endpoints.jobs.application.update)

        putAsync(url, {id: requestId, jobId, status, applicantId: person.id, remarks: values.message})
            .then((response: any) => {

                setShowRejectDialog(false)
                setShowGetDetailsDialog(false)
                setShowAcceptDialog(false)

                Toast.success("The applicant has been notified")

                window.location.replace(Urls.jobs.singleJob(jobId))
            }).catch(error => {
            Toast.error(error.toString())
            setLoading(false)
        })
    }

    return (
        <div className="action-buttons-wrapper">
            <Grid spacing={2} alignContent={"center"} container justify={"center"}>
                <Grid item>
                    <Button
                        style={{textTransform: 'inherit'}}
                        onClick={() => handleAction(2)}
                        color={"default"}
                        variant={"outlined"}>Reject</Button>

                    <XDialog
                        title={"Reject request"}
                        contentText={"Rejections are never easy. Please specify the message that you want to send to the applicant."}
                        open={showRejectDialog}
                        onClose={() => setShowRejectDialog(false)}>
                        <XForm
                            loading={loading}
                            schema={schema}
                            initialValues={initialValues}
                            submitButtonLabel={"Send Rejection"}
                            onSubmit={handleSubmit}>
                            <XRichTextArea
                                helperText={"This will be sent via email to the applicant"}
                                name={"message"}/>
                        </XForm>
                    </XDialog>
                </Grid>
                <Grid item>
                    <Button
                        style={{textTransform: 'inherit'}}
                        onClick={() => handleAction(3)}
                        color={"primary"}
                        disableElevation
                        variant={"contained"}>Request more info</Button>
                    <XDialog
                        title={"Request more info"}
                        contentText={"What additional information do you need from the applicant?"}
                        open={showGetDetailsDialog}
                        onClose={() => setShowGetDetailsDialog(false)}>
                        <XForm
                            initialValues={initialValues}
                            submitButtonLabel={"Send Request"}
                            onSubmit={handleSubmit}>
                            <XRichTextArea
                                helperText={"This will be sent via email to the applicant"}
                                name={"message"}/>
                        </XForm>
                    </XDialog>
                </Grid>
                <Grid item>
                    <Button
                        style={{textTransform: 'inherit', fontWeight: 'bold'}}
                        disableElevation
                        onClick={() => handleAction(4)}
                        color={"secondary"} variant={"contained"}>
                        All good? Hire {person.firstname}
                    </Button>

                    <XDialog
                        title={`Hire ${person.firstname}`}
                        contentText={`Let ${person.firstname} know what the next steps are.`}
                        open={showAcceptDialog}
                        onClose={() => setShowAcceptDialog(false)}>

                        <XForm
                            initialValues={initialValues}
                            submitButtonLabel={"Notify applicant"}
                            onSubmit={handleSubmit}>
                            <XRichTextArea
                                helperText={"This will be sent via email to the applicant"}
                                label={"Acceptance message"}
                                name={"message"}/>
                        </XForm>
                    </XDialog>

                </Grid>
            </Grid>
        </div>
    )
}

export default PersonJobApplicationActions