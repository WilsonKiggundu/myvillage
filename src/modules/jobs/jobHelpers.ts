import {IJob} from "../../interfaces/IJob";
import {IEmailObject} from "../../interfaces/IEmailObject";
import {EmailSettings} from "../../data/constants";
import {getPersonContact} from "../profiles/people/redux/peopleEndpoints";
import {IContact} from "../../interfaces/IContact";
import {getStartupContact} from "../profiles/startups/redux/startupsEndpoints";
import {sendEmail} from "../../services/NotificationService";
import {IPerson} from "../profiles/people/IPerson";

export const SendApplicationNotification = async (job: IJob, user: any) => {
    const {profileId, companyId} = job

    const emailToSend: IEmailObject = {
        body: "Applied for the job",
        recipient: "",
        senderEmail: EmailSettings.senderEmail,
        senderName: EmailSettings.senderName,
        subject: `${user.profile.given_name} ${user.profile.family_name} applied for the ${job.title} role`
    }
    let recipients: string[]

    const personContacts: any = await getPersonContact(profileId)
    let emails: IContact[] = personContacts.body.filter((contact: IContact) => contact.type === 2)

    if(emails.length){
        recipients = emails.map((contact: IContact) => contact.value)
    }
    else{
        const companyContacts: any = await getStartupContact(companyId)
        const companyEmails: IContact[] = companyContacts.body.filter((contact: IContact) => contact.type === 2)
        recipients = companyEmails.map((contact: IContact) => contact.value)
    }

    if (recipients){
        emailToSend.recipient = recipients.join(',')
        await sendEmail(emailToSend)
    }
}