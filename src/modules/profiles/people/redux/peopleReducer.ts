import Toast from "../../../../utils/Toast";
import update from "immutability-helper";

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

export const ADD_PERSON_STACK = 'people/ADD_PERSON_STACK';
export const ADD_PERSON_STACK_SUCCEEDED = 'people/ADD_PERSON_STACK_SUCCEEDED';
export const ADD_PERSON_STACK_FAILED = 'people/ADD_PERSON_STACK_FAILED';

export const EDIT_PERSON_STACK = 'people/EDIT_PERSON_STACK';
export const EDIT_PERSON_STACK_SUCCEEDED = 'people/EDIT_PERSON_STACK_SUCCEEDED';
export const EDIT_PERSON_STACK_FAILED = 'people/EDIT_PERSON_STACK_FAILED';

export const DELETE_PERSON_STACK = 'people/DELETE_PERSON_STACK';
export const DELETE_PERSON_STACK_SUCCEEDED = 'people/DELETE_PERSON_STACK_SUCCEEDED';
export const DELETE_PERSON_STACK_FAILED = 'people/DELETE_PERSON_STACK_FAILED';

export const EDIT_PERSON_SKILLS = 'people/EDIT_PERSON_SKILLS';
export const EDIT_PERSON_SKILLS_SUCCEEDED = 'people/EDIT_PERSON_SKILLS_SUCCEEDED';
export const EDIT_PERSON_SKILLS_FAILED = 'people/EDIT_PERSON_SKILLS_FAILED';

export const DELETE_PERSON_SKILLS = 'people/DELETE_PERSON_SKILLS';
export const DELETE_PERSON_SKILLS_SUCCEEDED = 'people/DELETE_PERSON_SKILLS_SUCCEEDED';
export const DELETE_PERSON_SKILLS_FAILED = 'people/DELETE_PERSON_SKILLS_FAILED';

export const EDIT_PERSON_EDUCATION = 'people/EDIT_PERSON_EDUCATION';
export const EDIT_PERSON_EDUCATION_SUCCEEDED = 'people/EDIT_PERSON_EDUCATION_SUCCEEDED';
export const EDIT_PERSON_EDUCATION_FAILED = 'people/EDIT_PERSON_EDUCATION_FAILED';

export const ADD_PERSON_EDUCATION = 'people/ADD_PERSON_EDUCATION';
export const ADD_PERSON_EDUCATION_SUCCEEDED = 'people/ADD_PERSON_EDUCATION_SUCCEEDED';
export const ADD_PERSON_EDUCATION_FAILED = 'people/ADD_PERSON_EDUCATION_FAILED';

export const DELETE_PERSON_EDUCATION = 'people/DELETE_PERSON_EDUCATION';
export const DELETE_PERSON_EDUCATION_SUCCEEDED = 'people/DELETE_PERSON_EDUCATION_SUCCEEDED';
export const DELETE_PERSON_EDUCATION_FAILED = 'people/DELETE_PERSON_EDUCATION_FAILED';

export const EDIT_PERSON_PROJECT = 'people/EDIT_PERSON_PROJECT';
export const EDIT_PERSON_PROJECT_SUCCEEDED = 'people/EDIT_PERSON_PROJECT_SUCCEEDED';
export const EDIT_PERSON_PROJECT_FAILED = 'people/EDIT_PERSON_PROJECT_FAILED';

export const ADD_PERSON_PROJECT = 'people/ADD_PERSON_PROJECT';
export const ADD_PERSON_PROJECT_SUCCEEDED = 'people/ADD_PERSON_PROJECT_SUCCEEDED';
export const ADD_PERSON_PROJECT_FAILED = 'people/ADD_PERSON_PROJECT_FAILED';

export const DELETE_PERSON_PROJECT = 'people/DELETE_PERSON_PROJECT';
export const DELETE_PERSON_PROJECT_SUCCEEDED = 'people/DELETE_PERSON_PROJECT_SUCCEEDED';
export const DELETE_PERSON_PROJECT_FAILED = 'people/DELETE_PERSON_PROJECT_FAILED';

export const EDIT_PERSON_EMPLOYMENT = 'people/EDIT_PERSON_EMPLOYMENT';
export const EDIT_PERSON_EMPLOYMENT_SUCCEEDED = 'people/EDIT_PERSON_EMPLOYMENT_SUCCEEDED';
export const EDIT_PERSON_EMPLOYMENT_FAILED = 'people/EDIT_PERSON_EMPLOYMENT_FAILED';

export const ADD_PERSON_EMPLOYMENT = 'people/ADD_PERSON_EMPLOYMENT';
export const ADD_PERSON_EMPLOYMENT_SUCCEEDED = 'people/ADD_PERSON_EMPLOYMENT_SUCCEEDED';
export const ADD_PERSON_EMPLOYMENT_FAILED = 'people/ADD_PERSON_EMPLOYMENT_FAILED';

export const DELETE_PERSON_EMPLOYMENT = 'people/DELETE_PERSON_EMPLOYMENT';
export const DELETE_PERSON_EMPLOYMENT_SUCCEEDED = 'people/DELETE_PERSON_EMPLOYMENT_SUCCEEDED';
export const DELETE_PERSON_EMPLOYMENT_FAILED = 'people/DELETE_PERSON_EMPLOYMENT_FAILED';

export const FETCH_PERSON_CONNECTION = 'people/FETCH_PERSON_CONNECTION';
export const FETCH_PERSON_CONNECTION_SUCCEEDED = 'people/FETCH_PERSON_CONNECTION_SUCCEEDED';
export const FETCH_PERSON_CONNECTION_FAILED = 'people/FETCH_PERSON_CONNECTION_FAILED';

export const EDIT_PERSON_CONNECTION = 'people/EDIT_PERSON_CONNECTION';
export const EDIT_PERSON_CONNECTION_SUCCEEDED = 'people/EDIT_PERSON_CONNECTION_SUCCEEDED';
export const EDIT_PERSON_CONNECTION_FAILED = 'people/EDIT_PERSON_CONNECTION_FAILED';

export const DELETE_PERSON_CONNECTION = 'people/DELETE_PERSON_CONNECTION';
export const DELETE_PERSON_CONNECTION_SUCCEEDED = 'people/DELETE_PERSON_CONNECTION_SUCCEEDED';
export const DELETE_PERSON_CONNECTION_FAILED = 'people/DELETE_PERSON_CONNECTION_FAILED';

export const APPEND_PERSON = 'people/APPEND_PERSON';
export const APPEND_PERSON_SUCCEEDED = 'people/APPEND_PERSON_SUCCESS';
export const APPEND_PERSON_FAILED = 'people/APPEND_PERSON_FAILURE';

export const FETCH_PEOPLE = 'people/FETCH_PEOPLE';
export const FETCH_PEOPLE_SUCCEEDED = 'people/FETCH_PEOPLE_SUCCESS';
export const FETCH_PEOPLE_FAILED = 'people/FETCH_PEOPLE_FAILURE';

export const EDIT_PERSON_CONTACT = 'startups/EDIT_PERSON_CONTACT';
export const EDIT_PERSON_CONTACT_SUCCEEDED = 'startups/EDIT_PERSON_CONTACT_SUCCEEDED';
export const EDIT_PERSON_CONTACT_FAILED = 'startups/EDIT_PERSON_CONTACT_FAILED';

export const DELETE_PERSON_CONTACT = 'startups/DELETE_PERSON_CONTACT';
export const DELETE_PERSON_CONTACT_SUCCEEDED = 'startups/DELETE_PERSON_CONTACT_SUCCEEDED';
export const DELETE_PERSON_CONTACT_FAILED = 'startups/DELETE_PERSON_CONTACT_FAILED';

export const ADD_PERSON_CONTACT = 'startups/ADD_PERSON_CONTACT';
export const ADD_PERSON_CONTACT_SUCCEEDED = 'startups/ADD_PERSON_CONTACT_SUCCEEDED';
export const ADD_PERSON_CONTACT_FAILED = 'startups/ADD_PERSON_CONTACT_FAILED';

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

    // APPEND PERSON

    if (action.type === APPEND_PERSON) {
        return {
            ...state,
            data: [...state.data, action.payload],
            isLoading: false
        }
    }

    // FETCH PEOPLE
    else if (action.type === FETCH_PEOPLE) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === FETCH_PEOPLE_SUCCEEDED) {

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
    } else if (action.type === FETCH_PEOPLE_FAILED) {
        return {
            ...state,
            error: action.payload,
        }
    }

    // EDIT PERSON
    else if (action.type === EDIT_PERSON) {
        return {
            ...state
        }
    } else if (action.type === EDIT_PERSON_SUCCEEDED) {
        const {
            id,
            firstName,
            lastName,
            bio,
            dateOfBirth,
            gender,
            avatar,
            coverPhoto
        } = action.payload.body

        const person = state.data.find((f: any) => f.id === id)
        const index = state.data.indexOf(person)

        state.data = update(state.data, {
            [index]: {
                firstname: {$set: firstName},
                lastname: {$set: lastName},
                bio: {$set: bio},
                dateOfBirth: {$set: dateOfBirth},
                gender: {$set: gender},
                avatar: {$set: avatar},
                coverPhoto: {$set: coverPhoto}
            }
        })

        return {
            ...state,
        }
    } else if (action.type === EDIT_PERSON_FAILED) {
        return {
            ...state
        }
    } else if (action.type === EDIT_PERSON_CATEGORIES) {
        return {
            ...state
        }
    }

    // CATEGORIES
    else if (action.type === EDIT_PERSON_CATEGORIES_SUCCEEDED) {

        const categories = action.payload.body

        const person = state.data.find((f: any) => f.id === categories[0].personId)
        const index = state.data.indexOf(person)

        state.data = update(state.data, {
            [index]: {
                categories: {
                    $push: [...categories]
                }
            }
        })

        return {
            ...state,
        }
    } else if (action.type === EDIT_PERSON_CATEGORIES_FAILED) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_CATEGORIES) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_CATEGORIES_SUCCEEDED) {

        const {personId, categoryId} = action.payload

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        const toRemove = person.categories.find((f: any) => f.categoryId === categoryId)
        const categoryIndex = person.categories.indexOf(toRemove)

        state.data = update(state.data, {[personIndex]: {categories: {$splice: [[categoryIndex, 1]]}}})

        return {
            ...state,
        }
    } else if (action.type === DELETE_PERSON_CATEGORIES_FAILED) {

        Toast.error(action.payload)

        return {
            ...state
        }
    }

    // INTERESTS
    else if (action.type === EDIT_PERSON_INTERESTS) {
        return {
            ...state
        }
    } else if (action.type === EDIT_PERSON_INTERESTS_SUCCEEDED) {

        const interests = action.payload.body

        const person = state.data.find((f: any) => f.id === interests[0].personId)
        const index = state.data.indexOf(person)

        state.data = update(state.data, {
            [index]: {
                interests: {
                    $push: [...interests]
                }
            }
        })

        return {
            ...state,
        }
    } else if (action.type === EDIT_PERSON_INTERESTS_FAILED) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_INTERESTS) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_INTERESTS_SUCCEEDED) {

        const {personId, interestId} = action.payload

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        const toRemove = person.interests.find((f: any) => f.interestId === interestId)
        const interestIndex = person.interests.indexOf(toRemove)

        state.data = update(state.data, {[personIndex]: {interests: {$splice: [[interestIndex, 1]]}}})

        return {
            ...state,
        }

    } else if (action.type === DELETE_PERSON_INTERESTS_FAILED) {
        return {
            ...state
        }
    }

    // SKILLS
    else if (action.type === EDIT_PERSON_SKILLS) {
        return {
            ...state
        }
    } else if (action.type === EDIT_PERSON_SKILLS_SUCCEEDED) {

        const skills = action.payload.body

        const person = state.data.find((f: any) => f.id === skills[0].personId)
        const index = state.data.indexOf(person)

        state.data = update(state.data, {
            [index]: {
                skills: {
                    $push: [...skills]
                }
            }
        })

        return {
            ...state,
        }
    } else if (action.type === EDIT_PERSON_SKILLS_FAILED) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_SKILLS) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_SKILLS_SUCCEEDED) {

        const {personId, skillId} = action.payload

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        const toRemove = person.skills.find((f: any) => f.skillId === skillId)
        const skillIndex = person.skills.indexOf(toRemove)

        state.data = update(state.data, {
            [personIndex]: {
                skills: {
                    $splice: [[skillIndex, 1]]
                }
            }
        })

        return {
            ...state,
        }
    } else if (action.type === DELETE_PERSON_SKILLS_FAILED) {
        return {
            ...state
        }
    }

    // EDUCATION
    else if (action.type === EDIT_PERSON_EDUCATION) {
        return {
            ...state
        }
    } else if (action.type === EDIT_PERSON_EDUCATION_SUCCEEDED) {

        const {personId, id} = action.payload.body

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        const award = person.awards.find((f: any) => f.id === id)
        const awardIndex = person.awards.indexOf(award)

        state.data = update(state.data, {
            [personIndex]: {
                awards: {
                    [awardIndex]: {
                        $set: action.payload.body
                    }
                }
            }
        })

        return {
            ...state,
        }
    } else if (action.type === EDIT_PERSON_EDUCATION_FAILED) {
        return {
            ...state
        }
    } else if (action.type === ADD_PERSON_EDUCATION) {
        return {
            ...state
        }
    } else if (action.type === ADD_PERSON_EDUCATION_SUCCEEDED) {

        const {personId} = action.payload.body

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        state.data = update(state.data, {
            [personIndex]: {
                awards: {
                    $push: [action.payload.body]
                }
            }
        })

        return {
            ...state,
        }
    } else if (action.type === ADD_PERSON_EDUCATION_FAILED) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_EDUCATION) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_EDUCATION_SUCCEEDED) {

        const {personId, awardId} = action.payload

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        const toRemove = person.awards.find((f: any) => f.id === awardId)
        const awardIndex = person.awards.indexOf(toRemove)

        state.data = update(state.data, {
            [personIndex]: {
                awards: {
                    $splice: [[awardIndex, 1]]
                }
            }
        })


        return {
            ...state,
        }
    } else if (action.type === DELETE_PERSON_EDUCATION_FAILED) {
        return {
            ...state
        }
    } else if (action.type === EDIT_PERSON_EDUCATION) {
        return {
            ...state
        }
    } else if (action.type === EDIT_PERSON_EDUCATION_SUCCEEDED) {

        const {personId, id} = action.payload.body

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        const award = person.awards.find((f: any) => f.id === id)
        const awardIndex = person.awards.indexOf(award)

        state.data = update(state.data, {
            [personIndex]: {
                awards: {
                    [awardIndex]: {
                        $set: action.payload.body
                    }
                }
            }
        })

        return {
            ...state,
        }
    } else if (action.type === EDIT_PERSON_EDUCATION_FAILED) {
        return {
            ...state
        }
    } else if (action.type === ADD_PERSON_EDUCATION) {
        return {
            ...state
        }
    } else if (action.type === ADD_PERSON_EDUCATION_SUCCEEDED) {

        const {personId} = action.payload.body

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        state.data = update(state.data, {
            [personIndex]: {
                awards: {
                    $push: [action.payload.body]
                }
            }
        })

        return {
            ...state,
        }
    } else if (action.type === ADD_PERSON_EDUCATION_FAILED) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_EDUCATION) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_EDUCATION_SUCCEEDED) {

        const {personId, awardId} = action.payload

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        const toRemove = person.awards.find((f: any) => f.id === awardId)
        const awardIndex = person.awards.indexOf(toRemove)

        state.data = update(state.data, {
            [personIndex]: {
                awards: {
                    $splice: [[awardIndex, 1]]
                }
            }
        })


        return {
            ...state,
        }
    } else if (action.type === DELETE_PERSON_EDUCATION_FAILED) {
        return {
            ...state
        }
    }

    // EMPLOYMENT
    else if (action.type === EDIT_PERSON_EMPLOYMENT) {
        return {...state}
    } else if (action.type === EDIT_PERSON_EMPLOYMENT_SUCCEEDED) {

        const {personId, id} = action.payload.body

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        const employment = person.employment.find((f: any) => f.id === id)
        const employmentIndex = person.employment.indexOf(employment)

        state.data = update(state.data, {
            [personIndex]: {
                employment: {
                    [employmentIndex]: {
                        $set: action.payload.body
                    }
                }
            }
        })

        return {
            ...state,
        }
    } else if (action.type === EDIT_PERSON_EMPLOYMENT_FAILED) {
        return {
            ...state
        }
    } else if (action.type === ADD_PERSON_EMPLOYMENT) {
        return {
            ...state
        }
    } else if (action.type === ADD_PERSON_EMPLOYMENT_SUCCEEDED) {

        const {personId} = action.payload.body

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        state.data = update(state.data, {
            [personIndex]: {
                employment: {
                    $push: [action.payload.body]
                }
            }
        })

        return {
            ...state,
        }
    } else if (action.type === ADD_PERSON_EMPLOYMENT_FAILED) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_EMPLOYMENT) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_EMPLOYMENT_SUCCEEDED) {

        const {personId, awardId} = action.payload

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        const toRemove = person.employment.find((f: any) => f.id === awardId)
        const employmentIndex = person.employment.indexOf(toRemove)

        state.data = update(state.data, {
            [personIndex]: {
                employment: {
                    $splice: [[employmentIndex, 1]]
                }
            }
        })


        return {
            ...state,
        }
    } else if (action.type === DELETE_PERSON_EMPLOYMENT_FAILED) {
        return {
            ...state
        }
    }

    // CONNECTION
    else if (action.type === FETCH_PERSON_CONNECTION) {
        return {
            ...state
        }
    } else if (action.type === FETCH_PERSON_CONNECTION_SUCCEEDED) {

        const personId = action.payload.body[0].followerId
        const person = state.data.find((f: any) => f.id === personId)

        const personIndex = state.data.indexOf(person)

        state.data = update(state.data, {
            [personIndex]: {
                connections: {
                    $set: [...action.payload.body]
                }
            }
        })

        return {
            ...state,
        }
    } else if (action.type === FETCH_PERSON_CONNECTION_FAILED) {

        console.log(action.payload)

        return {
            ...state
        }
    } else if (action.type === EDIT_PERSON_CONNECTION) {
        return {
            ...state
        }
    } else if (action.type === EDIT_PERSON_CONNECTION_SUCCEEDED) {

        const {personId} = action.payload.body

        const person = state.data.find((f: any) => f.id === personId)
        const personIndex = state.data.indexOf(person)

        state.data = update(state.data, {
            [personIndex]: {
                $set: {...person, isConnected: true}
            }
        })

        return {
            ...state,
        }
    } else if (action.type === EDIT_PERSON_CONNECTION_FAILED) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_CONNECTION) {
        return {
            ...state
        }
    } else if (action.type === DELETE_PERSON_CONNECTION_SUCCEEDED) {
        Toast.success("Connection removed")
        return {
            ...state,
        }
    } else if (action.type === DELETE_PERSON_CONNECTION_FAILED) {
        Toast.error("Connection failed")
        return {
            ...state
        }
    } else if (action.type === DISPLAY_MORE_PEOPLE_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    } else if (action.type === DISPLAY_MORE_PEOPLE_END) {
        return {
            ...state,
            isLoading: false,
        }
    } else {
        return state;
    }
}