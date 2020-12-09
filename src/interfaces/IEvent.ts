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
}