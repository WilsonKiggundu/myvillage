import {IPerson} from "../modules/profiles/people/IPerson";
import {IUpload} from "./IUpload";
import {IComment} from "./IComment";

export interface IPost {
    id: string
    type: any
    details: string
    dateCreated: string
    authorId: string
    author: IPerson
    uploads?: IUpload[]
    comments?: IComment[]
}