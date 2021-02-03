import {IPerson} from "../modules/profiles/people/IPerson";
import {IUpload} from "./IUpload";
import {IComment} from "./IComment";

export interface IPost {
    id: string
    type: any
    details: string | undefined
    dateCreated: string
    authorId: string
    author?: IPerson
    uploads?: IUpload[]
    comments?: IComment[]
    likes: IPostLike[]
    commentsCount: number,
    likesCount: number,
    alreadyLikedByUser: boolean
}

export interface IPostLike {
    entityId: string
    personId: string
    person?: IPerson
}