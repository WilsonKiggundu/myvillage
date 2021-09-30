import {call, put} from "redux-saga/effects"
import {
    ADD_EVENT,
    ADD_EVENT_FAILED,
    ADD_EVENT_SUCCEEDED,
    FETCH_EVENTS,
    FETCH_EVENTS_FAILED,
    FETCH_EVENTS_SUCCEEDED
} from "./eventsReducer";
import {getEvents, postEvent} from "./eventsEndpoints";

export function addEvent(payload?: any) {
    return { type: ADD_EVENT, payload };
}

export function addEventSuccess(payload: any) {
    return { type: ADD_EVENT_SUCCEEDED, payload };
}

export function addEventFailed(payload: any) {
    return { type: ADD_EVENT_FAILED, payload };
}

export function loadEvents(payload?: any) {
    return { type: FETCH_EVENTS, payload };
}

export function loadEventsSuccess(payload: any) {
    return { type: FETCH_EVENTS_SUCCEEDED, payload };
}

export function loadEventsFailed(payload: any) {
    return { type: FETCH_EVENTS_FAILED, payload };
}

export function* createEvent(action: any){
    try {
        const response = yield call<any>(postEvent, action.payload)
        yield put(addEventSuccess(response))
    } catch (error) {
        yield put(addEventFailed(error.message));
    }
}

export function* fetchEvents(){
    try {
        const response = yield call<any>(getEvents)
        yield put(loadEventsSuccess(response))
    } catch (error) {
        yield put(loadEventsFailed(error.message));
    }
}
