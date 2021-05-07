import {deleteAsync, getWithoutLoginAsync, makeUrl, postWithoutLoginAsync, putAsync} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import {IFreelanceProject} from "../IFreelanceProject";

export const postFreelanceProjectEndpoint = async (project: IFreelanceProject) => {
    const url = makeUrl("Profiles", Endpoints.freelanceProjects.api)
    return await postWithoutLoginAsync(url, project)
}

export const deleteFreelanceProjectEndpoint = async (params: any) => {
    let url = makeUrl("Profiles", Endpoints.freelanceProjects.api)
    return await deleteAsync(url, params)
}

export const putFreelanceProjectEndpoint = async (params: any) => {
    let url = makeUrl("Profiles", Endpoints.freelanceProjects.api)
    return await putAsync(url, params)
}

export const getFreelanceProjectByIdEndpoint = async (id: any) => {
    const url = makeUrl("Profiles", Endpoints.freelanceProjects.api)
    return await getWithoutLoginAsync(url + "/" + id)
}

export const fetchFreelanceProjectsEndpoint = async (params?: any) => {
    const url = makeUrl("Profiles", Endpoints.freelanceProjects.api)
    return await getWithoutLoginAsync(url, params)
}