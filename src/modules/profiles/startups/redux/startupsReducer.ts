import Toast from "../../../../utils/Toast";
import update from 'immutability-helper'

export const ADD_STARTUP = 'startups/ADD_STARTUP';
export const ADD_STARTUP_SUCCEEDED = 'startups/ADD_STARTUP_SUCCESS';
export const ADD_STARTUP_FAILED = 'startups/ADD_STARTUP_FAILURE';

export const EDIT_STARTUP = 'startups/EDIT_STARTUP';
export const EDIT_STARTUP_SUCCEEDED = 'startups/EDIT_STARTUP_SUCCEEDED';
export const EDIT_STARTUP_FAILED = 'startups/EDIT_STARTUP_FAILED';

export const APPEND_STARTUP = 'people/APPEND_STARTUP';
export const APPEND_STARTUP_SUCCEEDED = 'people/APPEND_STARTUP_SUCCESS';
export const APPEND_STARTUP_FAILED = 'people/APPEND_STARTUP_FAILURE';

export const EDIT_STARTUP_ADDRESS = 'startups/EDIT_STARTUP_ADDRESS';
export const EDIT_STARTUP_ADDRESS_SUCCEEDED = 'startups/EDIT_STARTUP_ADDRESS_SUCCEEDED';
export const EDIT_STARTUP_ADDRESS_FAILED = 'startups/EDIT_STARTUP_ADDRESS_FAILED';

export const ADD_STARTUP_ADDRESS = 'startups/ADD_STARTUP_ADDRESS';
export const ADD_STARTUP_ADDRESS_SUCCEEDED = 'startups/ADD_STARTUP_ADDRESS_SUCCEEDED';
export const ADD_STARTUP_ADDRESS_FAILED = 'startups/ADD_STARTUP_ADDRESS_FAILED';

export const DELETE_STARTUP_ADDRESS = 'startups/DELETE_STARTUP_ADDRESS';
export const DELETE_STARTUP_ADDRESS_SUCCEEDED = 'startups/DELETE_STARTUP_ADDRESS_SUCCEEDED';
export const DELETE_STARTUP_ADDRESS_FAILED = 'startups/DELETE_STARTUP_ADDRESS_FAILED';

export const EDIT_STARTUP_CONTACT = 'startups/EDIT_STARTUP_CONTACT';
export const EDIT_STARTUP_CONTACT_SUCCEEDED = 'startups/EDIT_STARTUP_CONTACT_SUCCEEDED';
export const EDIT_STARTUP_CONTACT_FAILED = 'startups/EDIT_STARTUP_CONTACT_FAILED';

export const DELETE_STARTUP_CONTACT = 'startups/DELETE_STARTUP_CONTACT';
export const DELETE_STARTUP_CONTACT_SUCCEEDED = 'startups/DELETE_STARTUP_CONTACT_SUCCEEDED';
export const DELETE_STARTUP_CONTACT_FAILED = 'startups/DELETE_STARTUP_CONTACT_FAILED';

export const ADD_STARTUP_CONTACT = 'startups/ADD_STARTUP_CONTACT';
export const ADD_STARTUP_CONTACT_SUCCEEDED = 'startups/ADD_STARTUP_CONTACT_SUCCEEDED';
export const ADD_STARTUP_CONTACT_FAILED = 'startups/ADD_STARTUP_CONTACT_FAILED';

export const EDIT_STARTUP_PRODUCT = 'startups/EDIT_STARTUP_PRODUCT';
export const EDIT_STARTUP_PRODUCT_SUCCEEDED = 'startups/EDIT_STARTUP_PRODUCT_SUCCEEDED';
export const EDIT_STARTUP_PRODUCT_FAILED = 'startups/EDIT_STARTUP_PRODUCT_FAILED';

export const ADD_STARTUP_PRODUCT = 'startups/ADD_STARTUP_PRODUCT';
export const ADD_STARTUP_PRODUCT_SUCCEEDED = 'startups/ADD_STARTUP_PRODUCT_SUCCEEDED';
export const ADD_STARTUP_PRODUCT_FAILED = 'startups/ADD_STARTUP_PRODUCT_FAILED';

export const DELETE_STARTUP_PRODUCT = 'startups/DELETE_STARTUP_PRODUCT';
export const DELETE_STARTUP_PRODUCT_SUCCEEDED = 'startups/DELETE_STARTUP_PRODUCT_SUCCEEDED';
export const DELETE_STARTUP_PRODUCT_FAILED = 'startups/DELETE_STARTUP_PRODUCT_FAILED';

export const EDIT_STARTUP_INTERESTS = 'startups/EDIT_STARTUP_INTERESTS';
export const EDIT_STARTUP_INTERESTS_SUCCEEDED = 'startups/EDIT_STARTUP_INTERESTS_SUCCEEDED';
export const EDIT_STARTUP_INTERESTS_FAILED = 'startups/EDIT_STARTUP_INTERESTS_FAILED';

export const DELETE_STARTUP_INTERESTS = 'startups/DELETE_STARTUP_INTERESTS';
export const DELETE_STARTUP_INTERESTS_SUCCEEDED = 'startups/DELETE_STARTUP_INTERESTS_SUCCEEDED';
export const DELETE_STARTUP_INTERESTS_FAILED = 'startups/DELETE_STARTUP_INTERESTS_FAILED';

export const EDIT_STARTUP_ROLES = 'startups/EDIT_STARTUP_ROLES';
export const EDIT_STARTUP_ROLES_SUCCEEDED = 'startups/EDIT_STARTUP_ROLES_SUCCEEDED';
export const EDIT_STARTUP_ROLES_FAILED = 'startups/EDIT_STARTUP_ROLES_FAILED';

export const DELETE_STARTUP_ROLES = 'startups/DELETE_STARTUP_ROLES';
export const DELETE_STARTUP_ROLES_SUCCEEDED = 'startups/DELETE_STARTUP_ROLES_SUCCEEDED';
export const DELETE_STARTUP_ROLES_FAILED = 'startups/DELETE_STARTUP_ROLES_FAILED';

export const FETCH_STARTUPS = 'startups/FETCH_STARTUPS';
export const FETCH_STARTUPS_SUCCEEDED = 'startups/FETCH_STARTUPS_SUCCESS';
export const FETCH_STARTUPS_FAILED = 'startups/FETCH_STARTUPS_FAILURE';

export const DISPLAY_MORE_STARTUPS_BEGIN = "startups/DISPLAY_MORE_STARTUPS_BEGIN";
export const DISPLAY_MORE_STARTUPS_END = "startups/DISPLAY_MORE_STARTUPS_END";

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
    if (action.type === APPEND_STARTUP){
        return {
            ...state,
            data: [...state.data, action.payload],
            isLoading: false
        }
    }else if (action.type === ADD_STARTUP) {
        return {
            ...state
        }
    } else if (action.type === ADD_STARTUP_SUCCEEDED) {
        return {
            ...state,
            data: [...state.data, action.payload.body]
        }
    } else if (action.type === ADD_STARTUP_FAILED) {
        Toast.error(action.payload)
        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP) {
        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_SUCCEEDED) {
        const {
            id,
            name,
            category,
            description,
            employeeCount,
            incorporationDate,
            website,
            avatar,
            coverPhoto
        } = action.payload.body

        const startup = state.data.find((f: any) => f.id === id)
        const index = state.data.indexOf(startup)

        state.data = update(state.data, {
            [index]: {
                name: {$set: name},
                category: {$set: category},
                description: {$set: description},
                employeeCount: {$set: employeeCount},
                incorporationDate: {$set: incorporationDate},
                website: {$set: website},
                avatar: {$set: avatar},
                coverPhoto: {$set: coverPhoto}
            }
        })

        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_FAILED) {
        Toast.error(action.payload)
        return {
            ...state
        }
    } else if (action.type === FETCH_STARTUPS) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === FETCH_STARTUPS_SUCCEEDED) {
        const {startups, request, hasMore} = action.payload.body

        return {
            ...state,
            data: [...state.data, ...startups],
            request: {
                prevPage: request.page,
                nextPage: hasMore ? request.page + 1 : request.page,
                hasMore
            },
            isLoading: false
        }
    } else if (action.type === FETCH_STARTUPS_FAILED) {
        return {
            ...state,
            error: action.payload,
            isLoading: false
        }
    } else if (action.type === EDIT_STARTUP_ADDRESS) {
        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_ADDRESS_SUCCEEDED) {
        console.log(action.payload.body)
        // const startup = state.data.filter((f: any) => f.id === action.payload.body[0].businessId)[0]
        // const index = state.data.indexOf(startup)
        //
        // state.data = update(state.data, {[index]: {addresses: {$push: action.payload.body}}})

        return {
            ...state,
            data: [...state.data]
        }
    } else if (action.type === EDIT_STARTUP_ADDRESS_FAILED) {
        return {
            ...state
        }
    } else if (action.type === ADD_STARTUP_ADDRESS) {
        return {
            ...state
        }
    } else if (action.type === ADD_STARTUP_ADDRESS_SUCCEEDED) {
        const startup = state.data.filter((f: any) => f.id === action.payload.body[0].businessId)[0]
        const index = state.data.indexOf(startup)

        state.data = update(state.data, {[index]: {addresses: {$push: action.payload.body}}})

        return {
            ...state,
            data: [...state.data]
        }
    } else if (action.type === ADD_STARTUP_ADDRESS_FAILED) {
        Toast.error(action.payload.body)
        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_ADDRESS) {
        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_ADDRESS_SUCCEEDED) {

        const startup = state.data.filter((f: any) => f.id === action.payload.businessId)[0]
        const startupIndex = state.data.indexOf(startup)

        const toRemove = startup.addresses.find((f: any) => f.addressId === action.payload.id)
        const addressIndex = startup.addresses.indexOf(toRemove)

        state.data = update(state.data, {[startupIndex]: {addresses: {$splice: [[addressIndex, 1]]}}})

        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_ADDRESS_FAILED) {
        Toast.error(action.payload.body)
        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_CONTACT) {
        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_CONTACT_SUCCEEDED) {
        const startup = state.data.find((f: any) => f.id === action.payload.body.businessId)
        const startupIndex = state.data.indexOf(startup)

        const contact = startup.contacts.find((f: any) => f.contactId === action.payload.body.contactId)
        const contactIndex = startup.contacts.indexOf(contact)

        state.data = update(state.data, {
            [startupIndex]: {
                contacts: {
                    [contactIndex]: {
                        $set: action.payload.body
                    }
                }
            }
        })

        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_CONTACT_FAILED) {
        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_CONTACT) {
        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_CONTACT_SUCCEEDED) {

        const startup = state.data.find((f: any) => f.id === action.payload.belongsTo)
        const startupIndex = state.data.indexOf(startup)

        const contact = startup.contacts.find((f: any) => f.contactId === action.payload.contactId)
        const contactIndex = startup.contacts.indexOf(contact)

        state.data = update(state.data, {
            [startupIndex]: {
                contacts: {
                    $splice: [[contactIndex, 1]]
                }
            }
        })

        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_CONTACT_FAILED) {
        return {
            ...state
        }
    } else if (action.type === ADD_STARTUP_CONTACT) {
        return {
            ...state
        }
    } else if (action.type === ADD_STARTUP_CONTACT_SUCCEEDED) {

        const startup = state.data.find((f: any) => f.id === action.payload.body.businessId)
        const index = state.data.indexOf(startup)

        state.data = update(state.data, {[index]: {contacts: {$push: [action.payload.body]}}})

        return {
            ...state
        }
    } else if (action.type === ADD_STARTUP_CONTACT_FAILED) {
        return {
            ...state
        }
    } else if (action.type === ADD_STARTUP_PRODUCT) {
        return {
            ...state
        }
    } else if (action.type === ADD_STARTUP_PRODUCT_SUCCEEDED) {

        const startup = state.data.find((f: any) => f.id === action.payload.body.businessId)
        const index = state.data.indexOf(startup)

        state.data = update(state.data, {[index]: {products: {$push: [action.payload.body]}}})

        return {
            ...state
        }
    } else if (action.type === ADD_STARTUP_PRODUCT_FAILED) {
        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_PRODUCT) {
        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_PRODUCT_SUCCEEDED) {

        const startup = state.data.find((f: any) => f.id === action.payload.body.businessId)
        const index = state.data.indexOf(startup)

        const product = startup.products.find((f: any) => f.id === action.payload.body.id)
        const productIndex = startup.products.indexOf(product)

        state.data = update(state.data, {
            [index]: {
                products: {
                    [productIndex]: {
                        $set: action.payload.body
                    }
                }
            }
        })

        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_PRODUCT_FAILED) {

        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_PRODUCT) {
        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_PRODUCT_SUCCEEDED) {

        const startup = state.data.find((f: any) => f.id === action.payload.businessId)
        const startupIndex = state.data.indexOf(startup)

        const product = startup.products.find((f: any) => f.id === action.payload.productId)
        const productIndex = startup.products.indexOf(product)

        state.data = update(state.data, {
            [startupIndex]: {
                products: {
                    $splice: [[productIndex, 1]]
                }
            }
        })

        return {
            ...state,
            data: [...state.data]
        }
    } else if (action.type === DELETE_STARTUP_PRODUCT_FAILED) {
        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_INTERESTS) {
        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_INTERESTS_SUCCEEDED) {
        const startup = state.data.filter((f: any) => f.id === action.payload.body[0].businessId)[0]
        const index = state.data.indexOf(startup)

        state.data = update(state.data, {[index]: {interests: {$push: action.payload.body}}})

        return {
            ...state,
            data: [...state.data]
        }
    } else if (action.type === EDIT_STARTUP_INTERESTS_FAILED) {
        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_INTERESTS) {
        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_INTERESTS_SUCCEEDED) {

        const startup = state.data.filter((f: any) => f.id === action.payload.businessId)[0]
        const startupIndex = state.data.indexOf(startup)

        const toRemove = startup.interests.find((f: any) => f.interestId === action.payload.id)
        const interestIndex = startup.interests.indexOf(toRemove)

        state.data = update(state.data, {[startupIndex]: {interests: {$splice: [[interestIndex, 1]]}}})

        return {
            ...state,
            data: [...state.data]
        }
    } else if (action.type === DELETE_STARTUP_INTERESTS_FAILED) {
        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_ROLES) {
        return {
            ...state
        }
    } else if (action.type === EDIT_STARTUP_ROLES_SUCCEEDED) {

        const startup = state.data.find((f: any) => f.id === action.payload.body.businessId)
        const index = state.data.indexOf(startup)

        state.data = update(state.data, {[index]: {roles: {$push: [action.payload.body]}}})

        return {
            ...state,
        }
    } else if (action.type === EDIT_STARTUP_ROLES_FAILED) {
        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_ROLES) {
        return {
            ...state
        }
    } else if (action.type === DELETE_STARTUP_ROLES_SUCCEEDED) {

        const startup = state.data.filter((f: any) => f.id === action.payload.businessId)[0]
        const startupIndex = state.data.indexOf(startup)

        const toRemove = startup.roles.find((f: any) => f.personId === action.payload.personId)
        const roleIndex = startup.roles.indexOf(toRemove)

        state.data = update(state.data, {[startupIndex]: {roles: {$splice: [[roleIndex, 1]]}}})

        return {
            ...state,
        }
    } else if (action.type === DELETE_STARTUP_ROLES_FAILED) {
        return {
            ...state
        }
    } else if (action.type === DISPLAY_MORE_STARTUPS_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    } else if (action.type === DISPLAY_MORE_STARTUPS_END) {
        return {
            ...state,
            isLoading: false,
        }
    } else {
        return state;
    }
}