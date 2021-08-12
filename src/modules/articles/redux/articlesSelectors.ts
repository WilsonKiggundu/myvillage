import {takeLatest} from "redux-saga/effects"
import {
    fetchCommentsAction,
    fetchArticlesAction,
    saveCommentAction,
    saveArticleAction,
    saveArticleLikeAction
} from "./articlesActions";
import {ADD_ARTICLE, ADD_ARTICLE_COMMENT, FETCH_COMMENTS, FETCH_ARTICLES, LIKE_ARTICLE} from "./articlesReducer";
import {IArticle} from "../../../interfaces/IArticle";

export const articlesSelector = (state: any) => state.articles
export const commentsSelector = (state: any, articleId: string) => state.articles.data.find((f: IArticle) => f.id === articleId)?.comments

export function* likeArticleWatcher(){
    yield takeLatest(LIKE_ARTICLE, saveArticleLikeAction)
}

export function* articlesListWatcher(){
    yield takeLatest(FETCH_ARTICLES, fetchArticlesAction)
}
export function* createArticleWatcher(){
    yield takeLatest(ADD_ARTICLE, saveArticleAction)
}

export function* addCommentWatcher(){
    yield takeLatest(ADD_ARTICLE_COMMENT, saveCommentAction)
}
export function* commentsListWatcher(){
    yield takeLatest(FETCH_COMMENTS, fetchCommentsAction)
}
