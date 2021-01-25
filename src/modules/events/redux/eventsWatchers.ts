import {takeLatest} from "redux-saga/effects";
import {ADD_EVENT, FETCH_EVENTS} from "./eventsReducer";
import {createEvent, fetchEvents} from "./eventsActions";

export function* eventsListWatcher(){
    yield takeLatest(FETCH_EVENTS, fetchEvents)
}

export function* addEventWatcher(){
    yield takeLatest(ADD_EVENT, createEvent)
}