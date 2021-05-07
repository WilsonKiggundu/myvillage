
import {Endpoints} from "../../../services/Endpoints";
import {getAsync, getWithoutLoginAsync, makeUrl, postAsync, postWithoutLoginAsync} from "../../../utils/ajax";
import {IJob} from "../../../interfaces/IJob";

export const postJob = async (job: IJob) => {
    const url = makeUrl("Jobs", Endpoints.jobs.api)
    return await postWithoutLoginAsync(url, job)
}

export const applyForJob = async (params: any) => {
    let url = makeUrl("Jobs", Endpoints.jobs.api)
    url = url + '/' + params.id + '/apply'
    return await postWithoutLoginAsync(url, params)
}

export const getJobById = async (id: any) => {
    const url = makeUrl("Profiles", Endpoints.jobs.api)
    return await getWithoutLoginAsync(url, {id: id})
}

export const getJobs = async (params?: any) => {
    const url = makeUrl("Profiles", Endpoints.jobs.api)
    return await getWithoutLoginAsync(url, params)
}

export const getJobCategories = async (params?: any) => {
    const url = makeUrl("Jobs", Endpoints.jobs.api + "/categories")
    return await getWithoutLoginAsync(url, params)
}