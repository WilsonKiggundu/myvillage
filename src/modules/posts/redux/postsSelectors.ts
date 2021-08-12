import {takeEvery, takeLatest} from "redux-saga/effects"
import {
    fetchCommentsAction,
    fetchPostsAction,
    saveCommentAction,
    savePostAction,
    savePostLikeAction
} from "./postsActions";
import {ADD_POST, ADD_POST_COMMENT, FETCH_COMMENTS, FETCH_POSTS, LIKE_POST} from "./postsReducer";
import {IPost} from "../../../interfaces/IPost";

export const postsSelector = (state: any) => state.posts
export const commentsSelector = (state: any, entityId?: string, entityType?: string) =>
{
    if (entityType === "article")
        return state.articles.data.find((f: any) => f.id === entityId)?.comments
    return state.posts.data.find((f: IPost) => f.id === entityId)?.comments
}

export function* likePostWatcher(){
    yield takeLatest(LIKE_POST, savePostLikeAction)
}

export function* postsListWatcher(){
    yield takeLatest(FETCH_POSTS, fetchPostsAction)
}
export function* createPostWatcher(){
    yield takeLatest(ADD_POST, savePostAction)
}

export function* addCommentWatcher(){
    yield takeLatest(ADD_POST_COMMENT, saveCommentAction)
}
export function* commentsListWatcher(){
    yield takeLatest(FETCH_COMMENTS, fetchCommentsAction)
}
