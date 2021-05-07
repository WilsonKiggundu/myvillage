import {IPerson} from "../profiles/people/IPerson";

export interface IFreelanceProject{
    id?: string
    name: string
    description: string
    skills: string
    paymentOption: string
    budget: string
    uploads: []
    ownerId?: string
    ownerEmail?: string
    hiredPersonId?: string
    HiredPerson?: IPerson
}