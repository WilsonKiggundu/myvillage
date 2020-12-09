import {IPost} from "./IPost";
import {IEvent} from "./IEvent";
import {IJob} from "./IJob";
import {IPerson} from "../modules/profiles/people/IPerson";
import {IStartup} from "./IStartup";

type EntityType = 1 | 2 | 3 | 4 | 5 | 6

export interface IFeed {
    dateCreated: any
    entityType: EntityType
    entity: any
}