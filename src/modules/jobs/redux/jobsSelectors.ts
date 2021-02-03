import { takeLatest,  } from "redux-saga/effects"
import {createJob, fetchJobCategories, fetchJobs} from "./jobsActions"
import {ADD_JOB, FETCH_JOB_CATEGORIES, FETCH_JOBS} from "./jobsReducer"

export const jobsSelector = (state: any) => state.jobs
export const jobCategoriesSelector = (state: any) => state.jobs.categories
export const jobSelector = (state: any, id: number) => state.jobs.data.find((job: any) => job.id === id)

export function* addJobWatcher(){
    yield takeLatest(ADD_JOB, createJob)
}

export function* jobsListWatcher(){
    yield takeLatest(FETCH_JOBS, fetchJobs)
}

export function* jobCategoriesListWatcher(){
    yield takeLatest(FETCH_JOB_CATEGORIES, fetchJobCategories)
}

