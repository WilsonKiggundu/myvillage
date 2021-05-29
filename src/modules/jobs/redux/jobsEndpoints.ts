
import {Endpoints} from "../../../services/Endpoints";
import {getAsync, getWithoutLoginAsync, makeUrl, postAsync, postWithoutLoginAsync} from "../../../utils/ajax";
import {IJob} from "../../../interfaces/IJob";
import {isUUID} from "../../../utils/stringHelpers";

export const postJob = async (job: IJob) => {
    const url = makeUrl("Profiles", Endpoints.jobs.api)
    return await postWithoutLoginAsync(url, job)
}

export const applyForJob = async (data: any) => {
    const url = makeUrl("Profiles", Endpoints.jobs.apply)
    return await postAsync(url, data)
}

export const getJobById = async (id: any) => {
    const url = makeUrl("Profiles", Endpoints.jobs.api)

    const params : any = { }

    if(isUUID(id)){
        params.jobId = id
    }else{
        params.id = id
    }

    return await getWithoutLoginAsync(url, params)
}

export const getJobs = async (params?: any) => {
    const url = makeUrl("Profiles", Endpoints.jobs.api)
    return await getWithoutLoginAsync(url, params)
}

export const getJobCategories = async (params?: any) => {
    const url = makeUrl("Jobs", Endpoints.jobs.api + "/categories")
    return await getWithoutLoginAsync(url, params)
}