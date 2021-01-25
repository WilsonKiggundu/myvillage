import Toast from "../../../../utils/Toast";

export const EDIT_PERSON = 'people/UPDATE_PERSON';
export const EDIT_PERSON_SUCCEEDED = 'people/UPDATE_PERSON_SUCCESS';
export const EDIT_PERSON_FAILED = 'people/UPDATE_PERSON_FAILURE';

export const EDIT_PERSON_CATEGORIES = 'people/EDIT_PERSON_CATEGORIES';
export const EDIT_PERSON_CATEGORIES_SUCCEEDED = 'people/EDIT_PERSON_CATEGORIES_SUCCEEDED';
export const EDIT_PERSON_CATEGORIES_FAILED = 'people/EDIT_PERSON_CATEGORIES_FAILED';

export const DELETE_PERSON_CATEGORIES = 'people/DELETE_PERSON_CATEGORIES';
export const DELETE_PERSON_CATEGORIES_SUCCEEDED = 'people/DELETE_PERSON_CATEGORIES_SUCCEEDED';
export const DELETE_PERSON_CATEGORIES_FAILED = 'people/DELETE_PERSON_CATEGORIES_FAILED';

export const EDIT_PERSON_INTERESTS = 'people/EDIT_PERSON_INTERESTS';
export const EDIT_PERSON_INTERESTS_SUCCEEDED = 'people/EDIT_PERSON_INTERESTS_SUCCEEDED';
export const EDIT_PERSON_INTERESTS_FAILED = 'people/EDIT_PERSON_INTERESTS_FAILED';

export const DELETE_PERSON_INTERESTS = 'people/DELETE_PERSON_INTERESTS';
export const DELETE_PERSON_INTERESTS_SUCCEEDED = 'people/DELETE_PERSON_INTERESTS_SUCCEEDED';
export const DELETE_PERSON_INTERESTS_FAILED = 'people/DELETE_PERSON_INTERESTS_FAILED';

export const EDIT_PERSON_SKILLS = 'people/EDIT_PERSON_SKILLS';
export const EDIT_PERSON_SKILLS_SUCCEEDED = 'people/EDIT_PERSON_SKILLS_SUCCEEDED';
export const EDIT_PERSON_SKILLS_FAILED = 'people/EDIT_PERSON_SKILLS_FAILED';

export const DELETE_PERSON_SKILLS = 'people/DELETE_PERSON_SKILLS';
export const DELETE_PERSON_SKILLS_SUCCEEDED = 'people/DELETE_PERSON_SKILLS_SUCCEEDED';
export const DELETE_PERSON_SKILLS_FAILED = 'people/DELETE_PERSON_SKILLS_FAILED';

export const EDIT_PERSON_EDUCATION = 'people/EDIT_PERSON_EDUCATION';
export const EDIT_PERSON_EDUCATION_SUCCEEDED = 'people/EDIT_PERSON_EDUCATION_SUCCEEDED';
export const EDIT_PERSON_EDUCATION_FAILED = 'people/EDIT_PERSON_EDUCATION_FAILED';

export const DELETE_PERSON_EDUCATION = 'people/DELETE_PERSON_EDUCATION';
export const DELETE_PERSON_EDUCATION_SUCCEEDED = 'people/DELETE_PERSON_EDUCATION_SUCCEEDED';
export const DELETE_PERSON_EDUCATION_FAILED = 'people/DELETE_PERSON_EDUCATION_FAILED';

export const EDIT_PERSON_CONNECTION = 'people/EDIT_PERSON_CONNECTION';
export const EDIT_PERSON_CONNECTION_SUCCEEDED = 'people/EDIT_PERSON_CONNECTION_SUCCEEDED';
export const EDIT_PERSON_CONNECTION_FAILED = 'people/EDIT_PERSON_CONNECTION_FAILED';

export const DELETE_PERSON_CONNECTION = 'people/DELETE_PERSON_CONNECTION';
export const DELETE_PERSON_CONNECTION_SUCCEEDED = 'people/DELETE_PERSON_CONNECTION_SUCCEEDED';
export const DELETE_PERSON_CONNECTION_FAILED = 'people/DELETE_PERSON_CONNECTION_FAILED';

export const FETCH_PEOPLE = 'people/FETCH_PEOPLE';
export const FETCH_PEOPLE_SUCCEEDED = 'people/FETCH_PEOPLE_SUCCESS';
export const FETCH_PEOPLE_FAILED = 'people/FETCH_PEOPLE_FAILURE';

export const DISPLAY_MORE_PEOPLE_BEGIN = "people/DISPLAY_MORE_PEOPLE_BEGIN";
export const DISPLAY_MORE_PEOPLE_END = "people/DISPLAY_MORE_PEOPLE_END";

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

        case FETCH_PEOPLE:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_PEOPLE_SUCCEEDED:
            const {persons, request, hasMore} = action.payload.body

            return {
                ...state,
                data: [...state.data, ...persons],
                request: {
                    prevPage: request.page,
                    nextPage: hasMore ? request.page + 1 : request.page,
                    hasMore
                },
                isLoading: false
            }

        case FETCH_PEOPLE_FAILED:
            return {
                ...state,
                error: action.payload,
            }

        case EDIT_PERSON:
            return {
                ...state
            }

        case EDIT_PERSON_SUCCEEDED:
            const person = action.payload.body

            return {
                ...state,
            }

        case EDIT_PERSON_FAILED:
            return {
                ...state
            }

        // Categories
        case EDIT_PERSON_CATEGORIES:
            return {
                ...state
            }

        case EDIT_PERSON_CATEGORIES_SUCCEEDED:

            return {
                ...state,
            }

        case EDIT_PERSON_CATEGORIES_FAILED:
            return {
                ...state
            }
        case DELETE_PERSON_CATEGORIES:
            return {
                ...state
            }

        case DELETE_PERSON_CATEGORIES_SUCCEEDED:
            Toast.success("Category removed")
            return {
                ...state,
            }

        case DELETE_PERSON_CATEGORIES_FAILED:
            return {
                ...state
            }

        // Interests
        case EDIT_PERSON_INTERESTS:
            return {
                ...state
            }

        case EDIT_PERSON_INTERESTS_SUCCEEDED:

            return {
                ...state,
            }

        case EDIT_PERSON_INTERESTS_FAILED:
            return {
                ...state
            }
        case DELETE_PERSON_INTERESTS:
            return {
                ...state
            }

        case DELETE_PERSON_INTERESTS_SUCCEEDED:
            Toast.success("Category removed")
            return {
                ...state,
            }

        case DELETE_PERSON_INTERESTS_FAILED:
            return {
                ...state
            }

        // Skills
        case EDIT_PERSON_SKILLS:
            return {
                ...state
            }

        case EDIT_PERSON_SKILLS_SUCCEEDED:

            return {
                ...state,
            }

        case EDIT_PERSON_SKILLS_FAILED:
            return {
                ...state
            }
        case DELETE_PERSON_SKILLS:
            return {
                ...state
            }

        case DELETE_PERSON_SKILLS_SUCCEEDED:
            Toast.success("Skill removed")
            return {
                ...state,
            }

        case DELETE_PERSON_SKILLS_FAILED:
            return {
                ...state
            }

        // Education
        case EDIT_PERSON_EDUCATION:
            return {
                ...state
            }

        case EDIT_PERSON_EDUCATION_SUCCEEDED:

            return {
                ...state,
            }

        case EDIT_PERSON_EDUCATION_FAILED:
            return {
                ...state
            }
        case DELETE_PERSON_EDUCATION:
            return {
                ...state
            }

        case DELETE_PERSON_EDUCATION_SUCCEEDED:
            Toast.success("Education removed")
            return {
                ...state,
            }

        case DELETE_PERSON_EDUCATION_FAILED:
            return {
                ...state
            }

        // Education
        case EDIT_PERSON_CONNECTION:
            return {
                ...state
            }

        case EDIT_PERSON_CONNECTION_SUCCEEDED:

            return {
                ...state,
            }

        case EDIT_PERSON_CONNECTION_FAILED:
            return {
                ...state
            }
        case DELETE_PERSON_CONNECTION:
            return {
                ...state
            }

        case DELETE_PERSON_CONNECTION_SUCCEEDED:
            Toast.success("Connection removed")
            return {
                ...state,
            }

        case DELETE_PERSON_CONNECTION_FAILED:
            Toast.error("Connection failed")
            return {
                ...state
            }

        case DISPLAY_MORE_PEOPLE_BEGIN:
            return {
                ...state,
                isLoading: true,
            }

        case DISPLAY_MORE_PEOPLE_END:
            return {
                ...state,
                isLoading: false,
            }

        default:
            return state;
    }
}