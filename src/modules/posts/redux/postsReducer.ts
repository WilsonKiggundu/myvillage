import {IPost, IPostLike} from "../../../interfaces/IPost";
import {IComment} from "../../../interfaces/IComment";
import {IEvent} from "../../../interfaces/IEvent";
import update from 'immutability-helper'
import {act} from "react-dom/test-utils";

export const LIKE_POST = 'posts/LIKE_POST'
export const LIKE_POST_SUCCEEDED = 'posts/LIKE_POST_SUCCEEDED'
export const LIKE_POST_FAILED = 'posts/LIKE_POST_FAILED'

export const ADD_POST_COMMENT = 'posts/ADD_POST_COMMENT'
export const ADD_POST_COMMENT_SUCCEEDED = 'posts/ADD_POST_COMMENT_SUCCEEDED'
export const ADD_POST_COMMENT_FAILED = 'posts/ADD_POST_COMMENT_FAILED'

export const ADD_POST = 'posts/ADD_POST'
export const ADD_POST_SUCCEEDED = 'posts/ADD_POST_SUCCEEDED'
export const ADD_POST_FAILED = 'posts/ADD_POST_FAILED'

export const DELETE_POST = 'posts/DELETE_POST'
export const DELETE_POST_SUCCEEDED = 'posts/DELETE_POST_SUCCEEDED'
export const DELETE_POST_FAILED = 'posts/DELETE_POST_FAILED'

export const FETCH_POSTS = 'posts/FETCH_POSTS';
export const FETCH_POSTS_SUCCEEDED = 'posts/FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILED = 'posts/FETCH_POSTS_FAILURE';
export const INCREMENT = 'posts/INCREMENT'

export const FETCH_COMMENTS = "posts/FETCH_COMMENTS";
export const FETCH_COMMENTS_SUCCEEDED = "posts/FETCH_COMMENTS_SUCCEEDED";
export const FETCH_COMMENTS_FAILED = "posts/FETCH_COMMENTS_FAILED";

export const DISPLAY_MORE_POSTS_BEGIN = "posts/DISPLAY_MORE_POSTS_BEGIN";
export const DISPLAY_MORE_POSTS_END = "posts/DISPLAY_MORE_POSTS_END";

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
    if (action.type === LIKE_POST) {
        return {
            ...state
        }
    } else if (action.type === LIKE_POST_SUCCEEDED) {
        const like: IPostLike = action.payload.body

        state.data.find((p: IPost) => p.id === like.entityId).likes.push(like)
        state.data.find((p: IPost) => p.id === like.entityId).likesCount += 1
        state.data.find((p: IPost) => p.id === like.entityId).alreadyLikedByUser = true

        return {
            ...state
        }
    } else if (action.type === LIKE_POST_FAILED) {
        return {
            ...state
        }
    } else if (action.type === ADD_POST) {
        return {
            ...state
        }
    } else if (action.type === ADD_POST_SUCCEEDED) {
        const post = action.payload.body

        post.uploads = JSON.parse(post.uploads)
        post.comments = []
        post.commentsCount = 0
        post.likes = []
        post.likesCount = 0
        post.alreadyLikedByUser = false

        state.data = [post, ...state.data]

        return {
            ...state
        }
    } else if (action.type === ADD_POST_FAILED) {
        return {
            ...state
        }
    }  else if (action.type === DELETE_POST) {

        const {id} = action.payload

        const post = state.data.find((f: any) => f.id === id)
        const postIndex = state.data.indexOf(post)

        state.data = update(state.data, {$splice: [[postIndex, 1]]})

        return {
            ...state
        }
    } else if (action.type === DELETE_POST_SUCCEEDED) {

        console.log(action.payload.body)

        return {
            ...state
        }
    } else if (action.type === DELETE_POST_FAILED) {
        return {
            ...state
        }
    } else if (action.type === ADD_POST_COMMENT) {
        return {
            ...state
        }
    } else if (action.type === ADD_POST_COMMENT_SUCCEEDED) {
        const comment: IComment = action.payload.body
        state.data.find((p: IPost) => p.id === comment.postId).comments.push(comment)
        state.data.find((p: IPost) => p.id === comment.postId).commentsCount += 1
        return {
            ...state
        }
    } else if (action.type === ADD_POST_COMMENT_FAILED) {
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
    } else if (action.type === FETCH_POSTS) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === FETCH_POSTS_SUCCEEDED) {
        const {posts, request, hasMore} = action.payload.body

        return {
            ...state,
            data: [...state.data, ...posts],
            request: {
                prevPage: request.page,
                nextPage: hasMore ? request.page + 1 : request.page,
                hasMore: hasMore
            },
            isLoading: false
        }
    } else if (action.type === FETCH_POSTS_FAILED) {

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
        const {comments, postId} = response
        state.data.find((p: IPost) => p.id === postId).comments = comments

        return {
            ...state,
            // data: [...state.data, ...posts],
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
    } else if (action.type === DISPLAY_MORE_POSTS_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    } else if (action.type === DISPLAY_MORE_POSTS_END) {
        return {
            ...state,
            isLoading: false,
        }
    } else {
        return state;
    }
}