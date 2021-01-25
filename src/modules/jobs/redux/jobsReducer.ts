
export const FETCH_JOBS = 'jobs/FETCH_JOBS';
export const FETCH_JOBS_SUCCEEDED = 'jobs/FETCH_JOBS_SUCCESS';
export const FETCH_JOBS_FAILED = 'jobs/FETCH_JOBS_FAILURE';
export const FETCH_JOB_CATEGORIES = 'jobs/FETCH_JOB_CATEGORIES';
export const FETCH_JOB_CATEGORIES_SUCCEEDED = 'jobs/FETCH_JOB_CATEGORIES_SUCCEEDED';
export const FETCH_JOB_CATEGORIES_FAILED = 'jobs/FETCH_JOB_CATEGORIES_FAILED';

export const ADD_JOB = 'jobs/ADD_JOB'
export const ADD_JOB_SUCCEEDED = 'jobs/ADD_JOB_SUCCEEDED'
export const ADD_JOB_FAILED = 'jobs/ADD_JOB_FAILED'

export const DISPLAY_MORE_JOBS_BEGIN = "jobs/DISPLAY_MORE_JOBS_BEGIN";
export const DISPLAY_MORE_JOBS_END = "jobs/DISPLAY_MORE_JOBS_END";

const initialState: any = {
    data: [],
    request: {
        prevPage: 1,
        nextPage: 1,
        hasMore: false
    },
    isLoading: false,
    error: "",
    categories: []
}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {

        case ADD_JOB:
            return {
                ...state,
                isLoading: false
            }

        case ADD_JOB_SUCCEEDED:
            const job = action.payload.body
            return {
                ...state,
                data: [...state.data, job]
            }

        case ADD_JOB_FAILED:
            console.log(action)
            return {
                ...state,
                error: action.payload
            }

        case FETCH_JOBS:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_JOBS_SUCCEEDED:
            const jobs = action.payload.body
            return {
                ...state,
                data: jobs,
                request: {
                    prevPage: 1,
                    nextPage: 1,
                    hasMore: false
                },
                isLoading: false
            }

        case FETCH_JOBS_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }

        case FETCH_JOB_CATEGORIES:
            return {
                ...state
            }

        case FETCH_JOB_CATEGORIES_SUCCEEDED:
            const categories = action.payload.body
            return {
                ...state,
                categories: [...categories]
            }

        case FETCH_JOB_CATEGORIES_FAILED:
            return {
                ...state
            }

        case DISPLAY_MORE_JOBS_BEGIN:
            return {
                ...state,
                isLoading: true,
            }

        case DISPLAY_MORE_JOBS_END:
            return {
                ...state,
                isLoading: false,
            }

        default:
            return state;
    }
}