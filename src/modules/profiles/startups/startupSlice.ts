import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAsync, makeUrl, postAsync, putAsync} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import {IStartup} from "../../../interfaces/IStartup";
import {act} from "react-dom/test-utils";
import {IProduct} from "../../../interfaces/IProduct";

const initialState = {
    startup: null,
    status: 'idle',
    error: null
}

export const getStartup = createAsyncThunk('startup/fetchStartup', async (startupId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.business.base + '/' + startupId)
    const response: any = await getAsync(url)
    return response.body
})

export const updateStartup = createAsyncThunk(
    'startup/updateStartup',
    async (startup: IStartup) => {

        const toUpdate = {
            category: startup.category,
            dateOfIncorporation: startup.dateOfIncorporation,
            description: startup.description,
            id: startup.id,
            coverPhoto: startup.coverPhoto,
            avatar: startup.avatar,
            name: startup.name,
            numberOfEmployees: Number(startup.numberOfEmployees),
            website: startup.website
        }

        const url = makeUrl("Profiles", Endpoints.business.base)
        const response: any = await putAsync(url, toUpdate)
        return response.body
    }
)

export const addInterest = createAsyncThunk(
    'startup/addInterest',
    async (interest: any) => {
        const url = makeUrl("Profiles", Endpoints.business.interest)
        const response: any = await postAsync(url, interest)
        return response.body
    }
)

export const getInterests = createAsyncThunk('startup/fetchInterests', async (businessId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.business.interest)
    const response: any = await getAsync(url, {businessId})
    return response.body
})

export const addProduct = createAsyncThunk(
    'startup/addProduct',
    async (product: any) => {
        const url = makeUrl("Profiles", Endpoints.business.product)
        const response: any = await postAsync(url, product)
        return response.body
    }
)

export const updateProduct = createAsyncThunk(
    'startup/updateProduct',
    async (product: any) => {
        const url = makeUrl("Profiles", Endpoints.business.product)
        const response: any = await putAsync(url, product)
        return response.body
    }
)

export const getProducts = createAsyncThunk('startup/fetchProducts', async (businessId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.business.product)
    const response: any = await getAsync(url, {businessId})
    return response.body
})

export const addAward = createAsyncThunk(
    'startup/addAward',
    async (award: any) => {
        const url = makeUrl("Profiles", Endpoints.business.awards)
        const response: any = await postAsync(url, award)
        return response.body
    }
)

export const updateAward = createAsyncThunk(
    'startup/updateAward',
    async (award: any) => {
        const url = makeUrl("Profiles", Endpoints.business.awards)
        const response: any = await putAsync(url, award)

        return response.body
    }
)

export const getAwards = createAsyncThunk('startup/fetchAwards', async (businessId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.business.awards)
    const response: any = await getAsync(url, {businessId})
    return response.body
})

export const addNeed = createAsyncThunk(
    'startup/addNeed',
    async (need: any) => {
        const url = makeUrl("Profiles", Endpoints.business.need)
        const response: any = await postAsync(url, need)
        return response.body
    }
)

export const getNeeds = createAsyncThunk('startup/fetchNeeds', async (businessId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.business.need)
    const response: any = await getAsync(url, {businessId})
    return response.body
})

export const addRole = createAsyncThunk(
    'startup/addRole',
    async (role: any) => {
        const url = makeUrl("Profiles", Endpoints.business.role)
        const response: any = await postAsync(url, role)
        return response.body
    }
)

export const getRoles = createAsyncThunk('startup/fetchRoles', async (businessId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.business.role)
    const response: any = await getAsync(url, {businessId})
    return response.body
})

export const addContact = createAsyncThunk(
    'startup/addContact',
    async (contact: any) => {
        const url = makeUrl("Profiles", Endpoints.business.contact)
        const response: any = await postAsync(url, contact)
        return response.body
    }
)

export const getContacts = createAsyncThunk('startup/fetchContacts', async (businessId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.business.contact)
    const response: any = await getAsync(url, {businessId})
    return response.body
})

export const addAddress = createAsyncThunk(
    'startup/addAddress',
    async (contact: any) => {
        const url = makeUrl("Profiles", Endpoints.business.address)
        const response: any = await postAsync(url, contact)
        return response.body
    }
)

export const getAddresses = createAsyncThunk('startup/fetchAddresses', async (businessId: any, {getState, requestId}: any) => {
    const url = makeUrl("Profiles", Endpoints.business.address)
    const response: any = await getAsync(url, {businessId})
    return response.body
})


export const startupSlice = createSlice({
    name: 'startup',
    initialState,
    reducers: {
        startupUpdated: {
            reducer(state: any, action: any){
                state.startup = action.payload
            },
            prepare(startup) {
                return {
                    payload: {
                        dateCreated: new Date().toISOString()
                    }
                }
            }
        },
        interestAdded: {
            reducer(state: any, action: any){
                //state.startup.interests.push(action.payload)
            },
            prepare(startup) {
                return {
                    payload: {
                        dateCreated: new Date().toISOString()
                    }
                }
            }
        },
    },
    extraReducers: {
        [getStartup.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getStartup.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.startup = action.payload
        },
        [getStartup.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [updateStartup.fulfilled.toString()]: (state: any, action: any) => {
            action.payload.categories = []
            state.startup = action.payload
        },

        [getInterests.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getInterests.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            const interests = action.payload.map((interest: any) => ({businessId: interest.businessId, interestId: interest.interestId, label: interest.interest.category}))
            state.startup.interests = [...interests]
        },
        [getInterests.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addInterest.fulfilled.toString()]: (state: any, action: any) => {
            state.startup.interests.push({
                businessId: action.payload.businessId,
                interestId: action.payload.interestId,
                label: action.payload.interest.category
            })
        },

        [getAddresses.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getAddresses.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.startup.addresses = [...action.payload]
        },
        [getAddresses.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addAddress.fulfilled.toString()]: (state: any, action: any) => {
            state.startup.addresses.push(action.payload)
        },

        [getContacts.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getContacts.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.startup.contacts = [...action.payload]
        },
        [getContacts.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addContact.fulfilled.toString()]: (state: any, action: any) => {
            window.location.reload()
        },

        [getNeeds.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getNeeds.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.startup.needs = [...action.payload]
        },
        [getNeeds.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNeed.fulfilled.toString()]: (state: any, action: any) => {
            window.location.reload()
        },

        [getProducts.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getProducts.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.startup.products = [...action.payload]
        },
        [getProducts.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addProduct.fulfilled.toString()]: (state: any, action: any) => {
            state.startup.products.push(action.payload)
        },
        [updateProduct.fulfilled.toString()]: (state: any, action: any) => {
            const productId = action.payload.id
            const productIndex = state.startup.products.findIndex((p: any) => p.id === productId);
            state.startup.products[productIndex] = action.payload
        },

        [getAwards.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getAwards.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.startup.awards = [...action.payload]
        },
        [getAwards.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addAward.fulfilled.toString()]: (state: any, action: any) => {
            state.startup.awards.push(action.payload)
        },
        [updateAward.fulfilled.toString()]: (state: any, action: any) => {
            const awardId = action.payload.id
            state.startup.awards.map((award: any, index: number) => (
                award.id === awardId ? {...action.payload} : award
                )
            )
        },

        [getRoles.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getRoles.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.startup.roles = [...action.payload]
        },
        [getRoles.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addRole.fulfilled.toString()]: (state: any, action: any) => {
            window.location.reload()
        },

    }
})

export const { interestAdded } = startupSlice.actions
export default startupSlice.reducer

export const selectStartup = (state: any) => state.startup.startup