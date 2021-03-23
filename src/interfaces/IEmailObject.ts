export interface IEmailObject {
    subject: string
    recipient: string
    senderName: string | undefined
    senderEmail: string | undefined
    body: string
}