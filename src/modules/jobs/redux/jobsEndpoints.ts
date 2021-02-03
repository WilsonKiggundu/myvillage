
import {Endpoints} from "../../../services/Endpoints";
import {getAsync, makeUrl, postAsync} from "../../../utils/ajax";
import store from "../../../data/store";
import {IJob} from "../../../interfaces/IJob";

export const postJob = async (job: IJob) => {
    const url = makeUrl("Jobs", Endpoints.jobs.api)
    return await postAsync(url, job)
}

export const getJobs = async (params?: any) => {
    const url = makeUrl("Jobs", Endpoints.jobs.api)
    return await getAsync(url, params)
}

export const getJobCategories = async (params?: any) => {
    const url = makeUrl("Jobs", Endpoints.jobs.api + "/categories")
    return await getAsync(url, params)
}