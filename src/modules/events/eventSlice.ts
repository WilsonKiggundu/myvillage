import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IEvent} from "../../interfaces/IEvent";
import {getAsync, makeUrl, postAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";

type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    events: [],
    status: 'idle',
    error: null
}

export const getEvents = createAsyncThunk('events/fetchEvents', async () => {
    const url = makeUrl("Events", Endpoints.events.api)
    const response: any = await getAsync(url)
    return response.body
})

export const addEvent = createAsyncThunk(
    'events/addEvent',
    async (event: IEvent) => {
        const url = makeUrl("Events", Endpoints.events.api)
        const response: any = await postAsync(url, event)
        return response.body
    }
)

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        // fetchEvents: (state: any) => {
        //     return state.events.events
        // },
        eventAdded: (state: any, action: any) => {
            state.events.events.push(action.payload)
        }
    },
    extraReducers: {
        [getEvents.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getEvents.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.events.push(...action.payload)
        },
        [getEvents.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addEvent.fulfilled.toString()]: (state: any, action: any) => {
            state.events.push(action.payload)
        }

    }
})


export const {eventAdded} = eventsSlice.actions
export default eventsSlice.reducer

export const selectAllEvents = (state: any) => state.events.events