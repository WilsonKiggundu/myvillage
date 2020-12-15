import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAsync, makeUrl, postAsync, putAsync} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";

const initialState = {
    startups: [],
    status: 'idle',
    error: null
}

export const getStartups = createAsyncThunk('startups/fetchStartups', async () => {
    const url = makeUrl("Profiles", Endpoints.business.base)
    const response: any = await getAsync(url)
    return response.body
})

export const addStartup = createAsyncThunk(
    'startups/addStartup',
    async (startup: any) => {
        const url = makeUrl("Profiles", Endpoints.business.base)
        const response: any = await postAsync(url, startup)

        return response.body
    }
)

export const startupsSlice = createSlice({
    name: 'startups',
    initialState,
    reducers: {
        startupAdded: {
            reducer(state: any, action: any){
                state.startups.push(action.payload)
            },
            prepare(startup) {
                return {
                    payload: {
                        dateCreated: new Date().toISOString()
                    }
                }
            }
        }
    },
    extraReducers: {
        [getStartups.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getStartups.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.startups.push(...action.payload)
        },
        [getStartups.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addStartup.fulfilled.toString()]: (state: any, action: any) => {
            state.startups.push(action.payload)
        }
    }
})

export const {startupAdded} = startupsSlice.actions
export default startupsSlice.reducer

export const selectAllStartups = (state: any) => state.startups.startups