import {takeLatest} from "redux-saga/effects";
import {
    ADD_FREELANCE_PROJECT,
    DELETE_FREELANCE_PROJECT,
    EDIT_FREELANCE_PROJECT,
    FETCH_FREELANCE_PROJECTS
} from "./freelanceProjectReducer";
import {
    createFreelanceProjectAction,
    fetchFreelanceProjectsAction,
    removeFreelanceProjectAction,
    updateFreelanceProjectAction
} from "./freelanceProjectActions";

export function* fetchFreelanceProjectsWatcher() {
    yield takeLatest(FETCH_FREELANCE_PROJECTS, fetchFreelanceProjectsAction)
}

export function* updateFreelanceProjectsWatcher() {
    yield takeLatest(EDIT_FREELANCE_PROJECT, updateFreelanceProjectAction)
}

export function* createFreelanceProjectsWatcher() {
    yield takeLatest(ADD_FREELANCE_PROJECT, createFreelanceProjectAction)
}

export function* deleteFreelanceProjectsWatcher() {
    yield takeLatest(DELETE_FREELANCE_PROJECT, removeFreelanceProjectAction)
}