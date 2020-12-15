import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAsync, makeUrl, postAsync} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import {getProfile} from "../../../services/User";
import {IProfile} from "../../../interfaces/IProfile";

const initialState = {
    people: [],
    status: 'idle',
    error: null
}

export const getPersons = createAsyncThunk('people/fetchPersons', async () => {
    const url = makeUrl("Profiles", Endpoints.person.base)
    const response: any = await getAsync(url)
    return response.body
})

export const addPerson = createAsyncThunk(
    'people/addPerson',
    async (person: any) => {
        const url = makeUrl("Profiles", Endpoints.person.base)
        const response: any = await postAsync(url, person)
        return response.body
    }
)

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        personAdded: {
            reducer(state: any, action: any){
                state.people.push(action.payload)
            },
            prepare(person) {
                return {
                    payload: {
                        dateCreated: new Date().toISOString()
                    }
                }
            }
        },
    },
    extraReducers: {
        [getPersons.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getPersons.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.people.push(...action.payload)
        },
        [getPersons.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },

        [addPerson.fulfilled.toString()]: (state: any, action: any) => {
            const profile: IProfile = getProfile()

            action.payload.dateCreated = new Date()
            action.payload.author = profile

            if (action.payload.uploads){
                action.payload.uploads = JSON.parse(action.payload.uploads)
            }

            state.people.push(action.payload)
        }

    }
})

export const {personAdded} = peopleSlice.actions
export default peopleSlice.reducer

export const selectAllPersons = (state: any) => state.people.people