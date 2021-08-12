import {IPerson} from "../modules/profiles/people/IPerson";

export interface IArticle {
    id: string
    summary?: string
    authorId: string
    author: IPerson
    title: string
    details: string
    dateCreated: string
    category: string
    tags: []
    uploads: []
}