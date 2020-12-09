import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAsync, makeUrl, postAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import {getProfile, getUser} from "../../services/User";
import {IProfile} from "../../interfaces/IProfile";

const initialState = {
    jobs: [],
    status: 'idle',
    error: null
}

export const getJobs = createAsyncThunk('jobs/fetchJobs', async () => {
    const url = makeUrl("Jobs", Endpoints.jobs.api)
    const response: any = await getAsync(url)
    return response.body
})

export const addJob = createAsyncThunk(
    'jobs/addJob',
    async (job: any) => {
        const url = makeUrl("Jobs", Endpoints.jobs.api)
        const response: any = await postAsync(url, job)

        return response.body
    }
)


export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        jobAdded: {
            reducer(state: any, action: any){
                state.jobs.push(action.payload)
            },
            prepare(job) {
                return {
                    payload: {
                        dateCreated: new Date().toISOString()
                    }
                }
            }
        }
    },
    extraReducers: {
        [getJobs.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getJobs.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.jobs.push(...action.payload)
        },
        [getJobs.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addJob.fulfilled.toString()]: (state: any, action: any) => {
            state.jobs.push(action.payload)
        }
    }
})

export const {jobAdded} = jobsSlice.actions
export default jobsSlice.reducer

export const selectAllJobs = (state: any) => state.jobs.jobs