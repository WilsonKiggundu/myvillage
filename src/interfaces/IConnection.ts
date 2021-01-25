import {IPerson} from "../modules/profiles/people/IPerson";

export interface IConnection {
    personId: string
    person: IPerson
    followerId: string
}