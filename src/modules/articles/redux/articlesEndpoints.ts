import {Endpoints} from "../../../services/Endpoints";
import {getAsync, getWithoutLoginAsync, makeUrl, postAsync, putAsync} from "../../../utils/ajax";
import store from "../../../data/store";

export const addLikeEndpoint = async (like: any) => {
    const url = makeUrl("Profiles", Endpoints.blog.likes)
    return await postAsync(url, like)
}

export const createArticle = async (article: any) => {
    const url = makeUrl("Profiles", Endpoints.blog.article)
    return await postAsync(url, article)
}

export const updateArticle = async (article: any) => {
    const url = makeUrl("Profiles", Endpoints.blog.article)
    return await putAsync(url, article)
}

export const getArticles = async () => {
    const state = store.getState()
    const {nextPage} = state.posts.request

    const {user} = state.oidc
    const profileId = user?.profile?.sub

    const url = makeUrl("Profiles", Endpoints.blog.article)
    return await getAsync(url, {page: nextPage})
}

export const getArticleById = async (id: string) => {
    const url = makeUrl("Profiles", Endpoints.blog.article)
    return await getAsync(url, {articleId: id})
}

export const createComment = async (comment: any) => {
    const url = makeUrl("Profiles", Endpoints.blog.comment)
    return await postAsync(url, comment)
}

export const getComments = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.blog.comment)
    return await getWithoutLoginAsync(url, {...payload})
}