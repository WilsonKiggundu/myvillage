
import {Endpoints} from "../../../services/Endpoints";
import {getAsync, makeUrl, postAsync} from "../../../utils/ajax";
import {IJob} from "../../../interfaces/IJob";

export const postJob = async (job: IJob) => {
    const url = makeUrl("Jobs", Endpoints.jobs.api)
    return await postAsync(url, job)
}

export const applyForJob = async (params: any) => {
    let url = makeUrl("Jobs", Endpoints.jobs.api)
    url = url + '/' + params.id + '/apply'
    return await postAsync(url, params)
}

export const getJobById = async (id: any) => {
    const url = makeUrl("Jobs", Endpoints.jobs.api)
    return await getAsync(url + '/' + id)
}

export const getJobs = async (params?: any) => {
    const url = makeUrl("Jobs", Endpoints.jobs.api)
    return await getAsync(url, params)
}

export const getJobCategories = async (params?: any) => {
    const url = makeUrl("Jobs", Endpoints.jobs.api + "/categories")
    return await getAsync(url, params)
}