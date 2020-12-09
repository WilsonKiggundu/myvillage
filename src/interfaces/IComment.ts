import {IPerson} from "../modules/profiles/people/IPerson";

export interface IComment {
    id?: string
    postId?: string
    articleId?: string
    details: string
    authorId: string
    author: IPerson
    dateCreated: string
}