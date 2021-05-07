import {
    ADD_FREELANCE_PROJECT, ADD_FREELANCE_PROJECT_FAILED, ADD_FREELANCE_PROJECT_SUCCEEDED,
    DELETE_FREELANCE_PROJECT, DELETE_FREELANCE_PROJECT_FAILED, DELETE_FREELANCE_PROJECT_SUCCEEDED,
    EDIT_FREELANCE_PROJECT, EDIT_FREELANCE_PROJECT_FAILED, EDIT_FREELANCE_PROJECT_SUCCEEDED,
    FETCH_FREELANCE_PROJECTS, FETCH_FREELANCE_PROJECTS_FAILED, FETCH_FREELANCE_PROJECTS_SUCCEEDED
} from "./freelanceProjectReducer";
import {call, put} from "redux-saga/effects";
import {
    deleteFreelanceProjectEndpoint,
    fetchFreelanceProjectsEndpoint,
    postFreelanceProjectEndpoint,
    putFreelanceProjectEndpoint
} from "./freelanceProjectEndpoints";

export function addFreelanceProject(payload?: any) {
    return { type: ADD_FREELANCE_PROJECT, payload };
}
export function addFreelanceProjectSuccess(payload?: any) {
    return { type: ADD_FREELANCE_PROJECT_SUCCEEDED, payload };
}
export function addFreelanceProjectFailed(payload?: any) {
    return { type: ADD_FREELANCE_PROJECT_FAILED, payload };
}

export function editFreelanceProject(payload?: any) {
    return { type: EDIT_FREELANCE_PROJECT, payload };
}
export function editFreelanceProjectSuccess(payload?: any) {
    return { type: EDIT_FREELANCE_PROJECT_SUCCEEDED, payload };
}
export function editFreelanceProjectFailed(payload?: any) {
    return { type: EDIT_FREELANCE_PROJECT_FAILED, payload };
}

export function delFreelanceProject(payload?: any) {
    return { type: DELETE_FREELANCE_PROJECT, payload };
}
export function delFreelanceProjectSuccess(payload?: any) {
    return { type: DELETE_FREELANCE_PROJECT_SUCCEEDED, payload };
}
export function delFreelanceProjectFailed(payload?: any) {
    return { type: DELETE_FREELANCE_PROJECT_FAILED, payload };
}

export function getFreelanceProjects(payload?: any) {
    return { type: FETCH_FREELANCE_PROJECTS, payload };
}
export function getFreelanceProjectsSuccess(payload?: any) {
    return { type: FETCH_FREELANCE_PROJECTS_SUCCEEDED, payload };
}
export function getFreelanceProjectsFailed(payload?: any) {
    return { type: FETCH_FREELANCE_PROJECTS_FAILED, payload };
}

export function* fetchFreelanceProjectsAction(action: any){
    try {
        const response = yield call<any>(fetchFreelanceProjectsEndpoint, action.payload)
        yield put(getFreelanceProjectsSuccess(response))
    } catch (error) {
        yield put(getFreelanceProjectsFailed(error.message));
    }
}

export function* createFreelanceProjectAction(action: any){
    try {
        const response = yield call<any>(postFreelanceProjectEndpoint, action.payload)
        yield put(addFreelanceProjectSuccess(response))
    } catch (error) {
        yield put(addFreelanceProjectFailed(error.message));
    }
}

export function* updateFreelanceProjectAction(action: any){
    try {
        const response = yield call<any>(putFreelanceProjectEndpoint, action.payload)
        yield put(editFreelanceProjectSuccess(response))
    } catch (error) {
        yield put(editFreelanceProjectFailed(error.message));
    }
}

export function* removeFreelanceProjectAction(action: any){
    try {
        const response = yield call<any>(deleteFreelanceProjectEndpoint, action.payload)
        yield put(delFreelanceProjectSuccess(response))
    } catch (error) {
        yield put(delFreelanceProjectFailed(error.message));
    }
}