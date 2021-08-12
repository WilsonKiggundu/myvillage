import {IArticle} from "../../../interfaces/IArticle";
import {IComment} from "../../../interfaces/IComment";
import update from 'immutability-helper'

export const LIKE_ARTICLE = 'articles/LIKE_ARTICLE'
export const LIKE_ARTICLE_SUCCEEDED = 'articles/LIKE_ARTICLE_SUCCEEDED'
export const LIKE_ARTICLE_FAILED = 'articles/LIKE_ARTICLE_FAILED'

export const ADD_ARTICLE_COMMENT = 'articles/ADD_ARTICLE_COMMENT'
export const ADD_ARTICLE_COMMENT_SUCCEEDED = 'articles/ADD_ARTICLE_COMMENT_SUCCEEDED'
export const ADD_ARTICLE_COMMENT_FAILED = 'articles/ADD_ARTICLE_COMMENT_FAILED'

export const ADD_ARTICLE = 'articles/ADD_ARTICLE'
export const ADD_ARTICLE_SUCCEEDED = 'articles/ADD_ARTICLE_SUCCEEDED'
export const ADD_ARTICLE_FAILED = 'articles/ADD_ARTICLE_FAILED'

export const DELETE_ARTICLE = 'articles/DELETE_ARTICLE'
export const DELETE_ARTICLE_SUCCEEDED = 'articles/DELETE_ARTICLE_SUCCEEDED'
export const DELETE_ARTICLE_FAILED = 'articles/DELETE_ARTICLE_FAILED'

export const FETCH_ARTICLES = 'articles/FETCH_ARTICLES';
export const FETCH_ARTICLES_SUCCEEDED = 'articles/FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILED = 'articles/FETCH_ARTICLES_FAILURE';
export const INCREMENT = 'articles/INCREMENT'

export const FETCH_COMMENTS = "articles/FETCH_COMMENTS";
export const FETCH_COMMENTS_SUCCEEDED = "articles/FETCH_COMMENTS_SUCCEEDED";
export const FETCH_COMMENTS_FAILED = "articles/FETCH_COMMENTS_FAILED";

export const DISPLAY_MORE_ARTICLES_BEGIN = "articles/DISPLAY_MORE_ARTICLES_BEGIN";
export const DISPLAY_MORE_ARTICLES_END = "articles/DISPLAY_MORE_ARTICLES_END";

const initialState: any = {
    data: [],
    request: {
        prevPage: 1,
        nextPage: 1,
        hasMore: false
    },
    isLoading: false,
    error: ""
}

export default function reducer(state = initialState, action: any) {
    if (action.type === LIKE_ARTICLE) {
        return {
            ...state
        }
    } else if (action.type === LIKE_ARTICLE_SUCCEEDED) {
        const like: any = action.payload.body

        state.data.find((p: IArticle) => p.id === like.entityId).likes.push(like)
        state.data.find((p: IArticle) => p.id === like.entityId).likesCount += 1
        state.data.find((p: IArticle) => p.id === like.entityId).alreadyLikedByUser = true

        return {
            ...state
        }
    } else if (action.type === LIKE_ARTICLE_FAILED) {
        return {
            ...state
        }
    } else if (action.type === ADD_ARTICLE) {
        return {
            ...state
        }
    } else if (action.type === ADD_ARTICLE_SUCCEEDED) {
        const article = action.payload.body

        article.uploads = JSON.parse(article.uploads)
        article.comments = []
        article.commentsCount = 0
        article.likes = []
        article.likesCount = 0
        article.alreadyLikedByUser = false

        state.data = [article, ...state.data]

        return {
            ...state
        }
    } else if (action.type === ADD_ARTICLE_FAILED) {
        return {
            ...state
        }
    }  else if (action.type === DELETE_ARTICLE) {

        const {id} = action.payload

        const article = state.data.find((f: any) => f.id === id)
        const articleIndex = state.data.indexOf(article)

        state.data = update(state.data, {$splice: [[articleIndex, 1]]})

        return {
            ...state
        }
    } else if (action.type === DELETE_ARTICLE_SUCCEEDED) {

        console.log(action.payload.body)

        return {
            ...state
        }
    } else if (action.type === DELETE_ARTICLE_FAILED) {
        return {
            ...state
        }
    } else if (action.type === ADD_ARTICLE_COMMENT) {
        return {
            ...state
        }
    } else if (action.type === ADD_ARTICLE_COMMENT_SUCCEEDED) {
        const comment: IComment = action.payload.body
        state.data.find((p: IArticle) => p.id === comment.articleId).comments.push(comment)
        state.data.find((p: IArticle) => p.id === comment.articleId).commentsCount += 1
        return {
            ...state
        }
    } else if (action.type === ADD_ARTICLE_COMMENT_FAILED) {
        return {
            ...state
        }
    } else if (action.type === INCREMENT) {
        return {
            ...state,
            request: {
                prevPage: state.request.prevPage,
                nextPage: state.request.prevPage + 1,
                hasMore: state.request.hasMore
            }
        }
    } else if (action.type === FETCH_ARTICLES) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === FETCH_ARTICLES_SUCCEEDED) {
        const {articles, request, hasMore} = action.payload.body

        return {
            ...state,
            data: [...state.data, ...articles],
            request: {
                prevPage: request.page,
                nextPage: hasMore ? request.page + 1 : request.page,
                hasMore: hasMore
            },
            isLoading: false
        }
    } else if (action.type === FETCH_ARTICLES_FAILED) {

        console.log(action)

        return {
            ...state,
            error: action.payload,
            isLoading: false
        }
    } else if (action.type === FETCH_COMMENTS) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === FETCH_COMMENTS_SUCCEEDED) {
        const response = action.payload.body
        const {comments, articleId} = response
        state.data.find((p: IArticle) => p.id === articleId).comments = comments

        return {
            ...state,
            // data: [...state.data, ...articles],
            // request: {
            //     prevPage: request.page,
            //     nextPage: hasMore ? request.page + 1 : request.page,
            //     hasMore: hasMore
            // }
            isLoading: false
        }
    } else if (action.type === FETCH_COMMENTS_FAILED) {
        return {
            ...state,
            error: action.payload,
            isLoading: false
        }
    } else if (action.type === DISPLAY_MORE_ARTICLES_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    } else if (action.type === DISPLAY_MORE_ARTICLES_END) {
        return {
            ...state,
            isLoading: false,
        }
    } else {
        return state;
    }
}