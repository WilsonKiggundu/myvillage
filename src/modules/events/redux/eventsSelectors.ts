import { takeLatest } from "redux-saga/effects"
import {createEvent, fetchEvents} from "./eventsActions"
import {ADD_EVENT, FETCH_EVENTS} from "./eventsReducer"

export const eventsSelector = (state: any) => state.events
export const eventSelector = (state: any, id: string) => state.events.data.find((event: any) => event.id === id)


