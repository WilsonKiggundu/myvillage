import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAsync, makeUrl, postAsync, putAsync} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import {getProfile} from "../../../services/User";
import {IProfile} from "../../../interfaces/IProfile";
import {IProfileCategory} from "../../../interfaces/IProfileCategory";
import {IPerson} from "./IPerson";
import {IEducation} from "../../../interfaces/IEducation";

const initialState = {
    person: null,
    status: 'idle',
    error: null
}

export const getPerson = createAsyncThunk('person/fetchPerson', async (personId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.person.base + '/' + personId)
    const response: any = await getAsync(url)
    console.log(response.body)
    return response.body
})

export const updatePerson = createAsyncThunk(
    'person/updatePerson',
    async (person: IPerson) => {

        const profile: IPerson = {
            firstname: person.firstname,
            lastname: person.lastname,
            avatar: person.avatar,
            coverPhoto: person.coverPhoto,
            id: person.id,
            bio: person.bio,
            gender: person.gender,
            dateOfBirth: person.dateOfBirth
        }

        const url = makeUrl("Profiles", Endpoints.person.base)
        const response: any = await putAsync(url, profile)
        return response.body
    }
)

export const addCategory = createAsyncThunk(
    'person/addCategory',
    async (category: any) => {
        const url = makeUrl("Profiles", Endpoints.person.category)
        const response: any = await postAsync(url, category)
        return response.body
    }
)

export const getCategories = createAsyncThunk('person/fetchCategories', async (personId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.person.category)
    const response: any = await getAsync(url, {personId})
    return response.body
})

export const addInterest = createAsyncThunk(
    'person/addInterest',
    async (interest: any) => {
        const url = makeUrl("Profiles", Endpoints.person.interest)
        const response: any = await postAsync(url, interest)
        return response.body
    }
)

export const getInterests = createAsyncThunk('person/fetchInterests', async (personId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.person.interest)
    const response: any = await getAsync(url, {personId})
    return response.body
})

export const addSkill = createAsyncThunk(
    'person/addSkill',
    async (skill: any) => {
        const url = makeUrl("Profiles", Endpoints.person.skill)
        const response: any = await postAsync(url, skill)
        return response.body
    }
)

export const getSkills = createAsyncThunk('person/fetchSkills', async (personId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.person.skill)
    const response: any = await getAsync(url, {personId})
    return response.body
})

export const addEducation = createAsyncThunk(
    'person/addEducation',
    async (education: IEducation) => {
        const url = makeUrl("Profiles", Endpoints.person.award)
        const response: any = await postAsync(url, education)
        return response.body
    }
)

export const getEducation = createAsyncThunk('person/fetchEducation', async (personId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.person.award)
    const response: any = await getAsync(url, {personId})
    return response.body
})

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        personUpdated: {
            reducer(state: any, action: any){
                state.person = action.payload
            },
            prepare(person) {
                return {
                    payload: {
                        dateCreated: new Date().toISOString()
                    }
                }
            }
        },
        categoryAdded: {
            reducer(state: any, action: any){
                state.person.categories.push(action.payload)
            },
            prepare(person) {
                return {
                    payload: {
                        dateCreated: new Date().toISOString()
                    }
                }
            }
        },
        interestAdded: {
            reducer(state: any, action: any){
                state.person.interests.push(action.payload)
            },
            prepare(person) {

                console.log(person)

                return {
                    payload: {
                        dateCreated: new Date().toISOString()
                    }
                }
            }
        },
        skillAdded: {
            reducer(state: any, action: any){
                state.person.skills.push(action.payload)
            },
            prepare(person) {

                console.log(person)

                return {
                    payload: {
                        dateCreated: new Date().toISOString()
                    }
                }
            }
        },
        educationAdded: {
            reducer(state: any, action: any){
                state.person.educations.push(action.payload)
            },
            prepare(education) {

                return {
                    payload: {
                        dateCreated: new Date().toISOString()
                    }
                }
            }
        },
    },
    extraReducers: {
        [getPerson.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getPerson.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.person = action.payload
        },
        [getPerson.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },

        [getEducation.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },

        [getEducation.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.person.awards.push(...action.payload)
        },
        [getEducation.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },

        [addEducation.fulfilled.toString()]: (state: any, action: any) => {
            state.person.awards.push(action.payload)
        },

        [getCategories.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getCategories.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.person.categories.push(...action.payload)
        },
        [getCategories.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },

        [addCategory.fulfilled.toString()]: (state: any, action: any) => {
            state.person.categories.push([...action.payload])
        },

        [getInterests.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },

        [getInterests.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.person.interests.push(...action.payload)
        },
        [getInterests.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },

        [addInterest.fulfilled.toString()]: (state: any, action: any) => {
            window.location.reload()
        },
        
        [getSkills.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },

        [getSkills.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.person.skills.push(...action.payload)
        },

        [getSkills.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },

        [addSkill.fulfilled.toString()]: (state: any, action: any) => {
            state.person.skills.push(action.payload)
        },

        [updatePerson.fulfilled.toString()]: (state: any, action: any) => {
            action.payload.categories = []
            state.person = action.payload
        }

    }
})

export const {categoryAdded, interestAdded, educationAdded} = personSlice.actions
export default personSlice.reducer

export const selectPerson = (state: any) => state.person.person