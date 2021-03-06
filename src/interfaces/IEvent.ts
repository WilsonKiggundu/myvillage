import {IUpload} from "./IUpload";

export interface IEvent {
    type: string
    title: string
    startDateTime: string
    endDateTime: string
    location: string
    id?: number
    interval: number
    frequency: number
    days?: number[]
    details: string
    conferenceUrl: string
    createdBy: string,
    uploads?: IUpload[],
    featured?: boolean
    attendances?: []
    webinar?: any
    challengesFaced?: string
    lessonsLearnt?: string
    achievements?: string
}