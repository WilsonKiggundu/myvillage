import {call, put, delay} from "redux-saga/effects"

import {
    ADD_JOB,
    ADD_JOB_FAILED,
    ADD_JOB_SUCCEEDED,
    FETCH_JOB_CATEGORIES,
    FETCH_JOB_CATEGORIES_FAILED,
    FETCH_JOB_CATEGORIES_SUCCEEDED,
    FETCH_JOBS,
    FETCH_JOBS_FAILED,
    FETCH_JOBS_SUCCEEDED
} from "./jobsReducer";
import {getJobCategories, getJobs, postJob} from "./jobsEndpoints";
import {IJob} from "../../../interfaces/IJob";

export function addJob(payload?: any) {
    return { type: ADD_JOB, payload };
}

export function addJobSuccess(payload: any) {
    return { type: ADD_JOB_SUCCEEDED, payload };
}

export function addJobFailed(payload: any) {
    return { type: ADD_JOB_FAILED, payload };
}

export function loadJobs(payload?: any) {
    return { type: FETCH_JOBS, payload };
}

export function loadJobsSuccess(payload: any) {
    return { type: FETCH_JOBS_SUCCEEDED, payload };
}

export function loadJobsFailed(payload: any) {
    return { type: FETCH_JOBS_FAILED, payload };
}

export function loadJobCategories(payload?: any) {
    return { type: FETCH_JOB_CATEGORIES, payload };
}

export function loadJobCategoriesSuccess(payload: any) {
    return { type: FETCH_JOB_CATEGORIES_SUCCEEDED, payload };
}

export function loadJobCategoriesFailed(payload: any) {
    return { type: FETCH_JOB_CATEGORIES_FAILED, payload };
}

export function* createJob(action: any){
    try {
        const response = yield call<any>(postJob, action.payload)
        yield put(addJobSuccess(response))
    } catch (error) {
        yield put(addJobFailed(error.message));
    }
}

export function* fetchJobs(){
    try {
        const response = yield call<any>(getJobs)
        yield put(loadJobsSuccess(response))
    } catch (error) {
        yield put(loadJobsFailed(error.message));
    }
}

export function* fetchJobCategories(){
    try {
        const response = yield call<any>(getJobCategories)
        yield put(loadJobCategoriesSuccess(response))
    } catch (error) {
        yield put(loadJobCategoriesFailed(error.message));
    }
}
