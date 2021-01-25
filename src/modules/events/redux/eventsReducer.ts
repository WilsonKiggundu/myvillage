import Toast from "../../../utils/Toast";

export const ADD_EVENT = 'events/ADD_EVENT'
export const ADD_EVENT_SUCCEEDED = 'events/ADD_EVENT_SUCCEEDED'
export const ADD_EVENT_FAILED = 'events/ADD_EVENT_FAILED'

export const FETCH_EVENTS = 'events/FETCH_EVENTS';
export const FETCH_EVENTS_SUCCEEDED = 'events/FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILED = 'events/FETCH_EVENTS_FAILURE';

export const DISPLAY_MORE_EVENTS_BEGIN = "events/DISPLAY_MORE_EVENTS_BEGIN";
export const DISPLAY_MORE_EVENTS_END = "events/DISPLAY_MORE_EVENTS_END";

const initialState: any = {
    data: [],
    request: {
        prevPage: 1,
        nextPage: 1,
        hasMore: false
    },
    isLoading: false,
    error: ""
}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {

        case ADD_EVENT:
            return {
                ...state
            }

        case ADD_EVENT_SUCCEEDED:
            return {
                ...state,
                data: [...state.data, action.payload.body]
            }

        case ADD_EVENT_FAILED:
            Toast.error(action.payload)
            return {
                ...state,
                error: action.payload
            }

        case FETCH_EVENTS:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_EVENTS_SUCCEEDED:
            const events = action.payload.body
            return {
                ...state,
                data: [...state.data, ...events],
                request: {
                    prevPage: 1,
                    nextPage: 1,
                    hasMore: false
                },
                isLoading: false
            }

        case FETCH_EVENTS_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }

        case DISPLAY_MORE_EVENTS_BEGIN:
            return {
                ...state,
                isLoading: true,
            }

        case DISPLAY_MORE_EVENTS_END:
            return {
                ...state,
                isLoading: false,
            }

        default:
            return state;
    }
}