import {call, put, delay} from "redux-saga/effects"

import {
    ADD_POST,
    ADD_POST_COMMENT, ADD_POST_COMMENT_FAILED, ADD_POST_COMMENT_SUCCEEDED, ADD_POST_FAILED, ADD_POST_SUCCEEDED,
    FETCH_COMMENTS, FETCH_COMMENTS_FAILED, FETCH_COMMENTS_SUCCEEDED,
    FETCH_POSTS,
    FETCH_POSTS_FAILED,
    FETCH_POSTS_SUCCEEDED, INCREMENT, LIKE_POST, LIKE_POST_FAILED, LIKE_POST_SUCCEEDED
} from "./postsReducer";
import {addLikeEndpoint, createComment, createPost, getComments, getPosts} from "./postsEndpoints";
import {ADD_JOB, ADD_JOB_FAILED, ADD_JOB_SUCCEEDED} from "../../jobs/redux/jobsReducer";
import {postJob} from "../../jobs/redux/jobsEndpoints";
import {addJobFailed, addJobSuccess} from "../../jobs/redux/jobsActions";

export const increment = () => ({type: INCREMENT})

export function likePost(payload?: any) {
    return { type: LIKE_POST, payload };
}

export function likePostSuccess(payload: any) {
    return { type: LIKE_POST_SUCCEEDED, payload };
}

export function likePostFailed(payload: any) {
    return { type: LIKE_POST_FAILED, payload };
}

export function addPost(payload?: any) {
    return { type: ADD_POST, payload };
}

export function addPostSuccess(payload: any) {
    return { type: ADD_POST_SUCCEEDED, payload };
}

export function addPostFailed(payload: any) {
    return { type: ADD_POST_FAILED, payload };
}

export function addComment(payload?: any) {
    return { type: ADD_POST_COMMENT, payload };
}

export function addCommentSuccess(payload: any) {
    return { type: ADD_POST_COMMENT_SUCCEEDED, payload };
}

export function addCommentFailed(payload: any) {
    return { type: ADD_POST_COMMENT_FAILED, payload };
}

export function loadPosts(payload?: any) {
    return { type: FETCH_POSTS, payload };
}

export function loadPostsSuccess(payload: any) {
    return { type: FETCH_POSTS_SUCCEEDED, payload };
}

export function loadPostsFailed(payload: any) {
    return { type: FETCH_POSTS_FAILED, payload };
}

export function loadComments(payload?: any) {
    return { type: FETCH_COMMENTS, payload };
}

export function loadCommentsSuccess(payload: any) {
    return { type: FETCH_COMMENTS_SUCCEEDED, payload };
}

export function loadCommentsFailed(payload: any) {
    return { type: FETCH_COMMENTS_FAILED, payload };
}

// Posts
export function* savePostAction(action: any){
    try {
        const response = yield call<any>(createPost, action.payload)
        yield put(addPostSuccess(response))
    } catch (error: any) {
        yield put(addPostFailed(error.message));
    }
}

export function* fetchPostsAction(){
    try {
        const response = yield call<any>(getPosts)
        yield put(loadPostsSuccess(response))
        yield put(increment())
    } catch (error: any) {
        yield put(loadPostsFailed(error.message));
    }
}

// Comments
export function* saveCommentAction(action: any){
    try {
        const response = yield call<any>(createComment, action.payload)
        yield put(addCommentSuccess(response))
    } catch (error: any) {
        yield put(addCommentFailed(error.message));
    }
}

export function* fetchCommentsAction(action: any){
    try {
        const response = yield call<any>(getComments, action.payload)
        yield put(loadCommentsSuccess(response))
    } catch (error: any) {
        yield put(loadCommentsFailed(error.message));
    }
}

// Likes
export function* savePostLikeAction(action: any){
    try {
        const response = yield call<any>(addLikeEndpoint, action.payload)
        yield put(likePostSuccess(response))
    } catch (error: any) {
        yield put(likePostFailed(error.message));
    }
}
