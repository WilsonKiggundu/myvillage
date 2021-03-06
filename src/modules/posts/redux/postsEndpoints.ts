import apiRequest from "../../../utils/apiRequest";
import {Endpoints} from "../../../services/Endpoints";
import {getAsync, getWithoutLoginAsync, makeUrl, postAsync} from "../../../utils/ajax";
import Toast from "../../../utils/Toast";
import store from "../../../data/store";
import {IJob} from "../../../interfaces/IJob";
import {IPostLike} from "../../../interfaces/IPost";

export const addLikeEndpoint = async (like: IPostLike) => {
    const url = makeUrl("Profiles", Endpoints.blog.likes)
    return await postAsync(url, like)
}

export const createPost = async (post: any) => {
    const url = makeUrl("Profiles", Endpoints.blog.post)
    return await postAsync(url, post)
}

export const getPosts = async () => {
    const state = store.getState()
    const {nextPage} = state.posts.request

    const {user} = state.oidc
    const profileId = user?.profile?.sub

    const url = makeUrl("Profiles", Endpoints.blog.post)
    return await getAsync(url, {page: nextPage})
}

export const createComment = async (comment: any) => {
    const url = makeUrl("Profiles", Endpoints.blog.comment)
    return await postAsync(url, comment)
}

export const getComments = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.blog.comment)
    return await getWithoutLoginAsync(url, {...payload})
}