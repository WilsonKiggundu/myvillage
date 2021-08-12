import {call, put} from "redux-saga/effects"

import {
    ADD_ARTICLE,
    ADD_ARTICLE_COMMENT, ADD_ARTICLE_COMMENT_FAILED, ADD_ARTICLE_COMMENT_SUCCEEDED, ADD_ARTICLE_FAILED, ADD_ARTICLE_SUCCEEDED,
    FETCH_COMMENTS, FETCH_COMMENTS_FAILED, FETCH_COMMENTS_SUCCEEDED,
    FETCH_ARTICLES,
    FETCH_ARTICLES_FAILED,
    FETCH_ARTICLES_SUCCEEDED, INCREMENT, LIKE_ARTICLE, LIKE_ARTICLE_FAILED, LIKE_ARTICLE_SUCCEEDED
} from "./articlesReducer";
import {addLikeEndpoint, createComment, createArticle, getComments, getArticles} from "./articlesEndpoints";

export const increment = () => ({type: INCREMENT})

export function likeArticle(payload?: any) {
    return { type: LIKE_ARTICLE, payload };
}

export function likeArticleSuccess(payload: any) {
    return { type: LIKE_ARTICLE_SUCCEEDED, payload };
}

export function likeArticleFailed(payload: any) {
    return { type: LIKE_ARTICLE_FAILED, payload };
}

export function addArticle(payload?: any) {
    return { type: ADD_ARTICLE, payload };
}

export function addArticleSuccess(payload: any) {
    return { type: ADD_ARTICLE_SUCCEEDED, payload };
}

export function addArticleFailed(payload: any) {
    return { type: ADD_ARTICLE_FAILED, payload };
}

export function addComment(payload?: any) {
    return { type: ADD_ARTICLE_COMMENT, payload };
}

export function addCommentSuccess(payload: any) {
    return { type: ADD_ARTICLE_COMMENT_SUCCEEDED, payload };
}

export function addCommentFailed(payload: any) {
    return { type: ADD_ARTICLE_COMMENT_FAILED, payload };
}

export function loadArticles(payload?: any) {
    return { type: FETCH_ARTICLES, payload };
}

export function loadArticlesSuccess(payload: any) {
    return { type: FETCH_ARTICLES_SUCCEEDED, payload };
}

export function loadArticlesFailed(payload: any) {
    return { type: FETCH_ARTICLES_FAILED, payload };
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

// Articles
export function* saveArticleAction(action: any){
    try {
        const response = yield call<any>(createArticle, action.payload)
        yield put(addArticleSuccess(response))
    } catch (error) {
        yield put(addArticleFailed(error.message));
    }
}

export function* fetchArticlesAction(){
    try {
        const response = yield call<any>(getArticles)
        yield put(loadArticlesSuccess(response))
        yield put(increment())
    } catch (error) {
        yield put(loadArticlesFailed(error.message));
    }
}

// Comments
export function* saveCommentAction(action: any){
    try {
        const response = yield call<any>(createComment, action.payload)
        yield put(addCommentSuccess(response))
    } catch (error) {
        yield put(addCommentFailed(error.message));
    }
}

export function* fetchCommentsAction(action: any){
    try {
        const response = yield call<any>(getComments, action.payload)
        yield put(loadCommentsSuccess(response))
    } catch (error) {
        yield put(loadCommentsFailed(error.message));
    }
}

// Likes
export function* saveArticleLikeAction(action: any){
    try {
        const response = yield call<any>(addLikeEndpoint, action.payload)
        yield put(likeArticleSuccess(response))
    } catch (error) {
        yield put(likeArticleFailed(error.message));
    }
}