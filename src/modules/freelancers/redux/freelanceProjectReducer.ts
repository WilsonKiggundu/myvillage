import update from "immutability-helper";

export const ADD_FREELANCE_PROJECT = 'jobs/ADD_FREELANCE_PROJECT'
export const ADD_FREELANCE_PROJECT_SUCCEEDED = 'jobs/ADD_FREELANCE_PROJECT_SUCCEEDED'
export const ADD_FREELANCE_PROJECT_FAILED = 'jobs/ADD_FREELANCE_PROJECT_FAILED'

export const EDIT_FREELANCE_PROJECT = 'jobs/EDIT_FREELANCE_PROJECT'
export const EDIT_FREELANCE_PROJECT_SUCCEEDED = 'jobs/EDIT_FREELANCE_PROJECT_SUCCEEDED'
export const EDIT_FREELANCE_PROJECT_FAILED = 'jobs/EDIT_FREELANCE_PROJECT_FAILED'

export const DELETE_FREELANCE_PROJECT = 'jobs/DELETE_FREELANCE_PROJECT'
export const DELETE_FREELANCE_PROJECT_SUCCEEDED = 'jobs/DELETE_FREELANCE_PROJECT_SUCCEEDED'
export const DELETE_FREELANCE_PROJECT_FAILED = 'jobs/DELETE_FREELANCE_PROJECT_FAILED'

export const FETCH_FREELANCE_PROJECTS = 'jobs/FETCH_FREELANCE_PROJECTS'
export const FETCH_FREELANCE_PROJECTS_SUCCEEDED = 'jobs/FETCH_FREELANCE_PROJECTS_SUCCEEDED'
export const FETCH_FREELANCE_PROJECTS_FAILED = 'jobs/FETCH_FREELANCE_PROJECTS_FAILED'

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

    // FETCH
    if (action.type === FETCH_FREELANCE_PROJECTS) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === FETCH_FREELANCE_PROJECTS_SUCCEEDED) {

        const {projects, request, hasMore} = action.payload.body

        return {
            ...state,
            data: [...state.data, ...projects],
            request: {
                prevPage: request.page,
                nextPage: hasMore ? request.page + 1 : request.page,
                hasMore
            },
            isLoading: false
        }
    } else if (action.type === FETCH_FREELANCE_PROJECTS_FAILED) {
        return {
            ...state
        }
    }

    // ADD
    else if (action.type === ADD_FREELANCE_PROJECT) {
        return {...state}
    } else if (action.type === ADD_FREELANCE_PROJECT_SUCCEEDED) {

        const project = action.payload.body

        return {
            ...state,
            data: [...state.data, project]
        }
    } else if (action.type === ADD_FREELANCE_PROJECT_FAILED) {
        return {
            ...state
        }
    }

    // EDIT
    else if (action.type === EDIT_FREELANCE_PROJECT) {
        return {...state}
    } else if (action.type === EDIT_FREELANCE_PROJECT_SUCCEEDED) {

        const {id} = action.payload.body

        const project = state.data.find((f: any) => f.id === id)
        const projectIndex = state.data.indexOf(project)

        state.data = update(state.data, {
            [projectIndex]: {
                $set: action.payload.body
            }
        })

        return {
            ...state,
        }
    } else if (action.type === EDIT_FREELANCE_PROJECT_FAILED) {
        return {
            ...state
        }
    }

    // DELETE
    else if (action.type === DELETE_FREELANCE_PROJECT) {
        return {...state}
    } else if (action.type === DELETE_FREELANCE_PROJECT_SUCCEEDED) {

        const {id} = action.payload.body

        const project = state.data.find((f: any) => f.id === id)
        const projectIndex = state.data.indexOf(project)

        state.data = update(state.data, {
            $splice: [[projectIndex, 1]]
        })

        return {
            ...state,
        }
    } else if (action.type === DELETE_FREELANCE_PROJECT_FAILED) {
        return {
            ...state
        }
    } else {
        return state
    }
}