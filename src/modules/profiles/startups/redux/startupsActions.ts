import {call, put} from "redux-saga/effects"

import {
    ADD_STARTUP,
    ADD_STARTUP_FAILED,
    ADD_STARTUP_SUCCEEDED,
    FETCH_STARTUPS,
    FETCH_STARTUPS_FAILED,
    FETCH_STARTUPS_SUCCEEDED,
    EDIT_STARTUP,
    EDIT_STARTUP_FAILED,
    EDIT_STARTUP_SUCCEEDED,
    EDIT_STARTUP_ADDRESS,
    EDIT_STARTUP_ADDRESS_SUCCEEDED,
    EDIT_STARTUP_ADDRESS_FAILED,
    EDIT_STARTUP_CONTACT,
    EDIT_STARTUP_CONTACT_SUCCEEDED,
    EDIT_STARTUP_CONTACT_FAILED,
    EDIT_STARTUP_PRODUCT,
    EDIT_STARTUP_PRODUCT_SUCCEEDED,
    EDIT_STARTUP_PRODUCT_FAILED,
    EDIT_STARTUP_INTERESTS,
    EDIT_STARTUP_INTERESTS_SUCCEEDED,
    EDIT_STARTUP_INTERESTS_FAILED,
    DELETE_STARTUP_INTERESTS,
    DELETE_STARTUP_INTERESTS_SUCCEEDED,
    DELETE_STARTUP_INTERESTS_FAILED,
    EDIT_STARTUP_ROLES,
    EDIT_STARTUP_ROLES_SUCCEEDED,
    EDIT_STARTUP_ROLES_FAILED,
    DELETE_STARTUP_ROLES,
    DELETE_STARTUP_ROLES_SUCCEEDED,
    DELETE_STARTUP_ROLES_FAILED,
    ADD_STARTUP_ADDRESS,
    ADD_STARTUP_ADDRESS_SUCCEEDED,
    ADD_STARTUP_ADDRESS_FAILED,
    DELETE_STARTUP_ADDRESS,
    DELETE_STARTUP_ADDRESS_SUCCEEDED,
    DELETE_STARTUP_ADDRESS_FAILED,
    ADD_STARTUP_PRODUCT,
    ADD_STARTUP_PRODUCT_SUCCEEDED,
    ADD_STARTUP_PRODUCT_FAILED,
    DELETE_STARTUP_PRODUCT,
    DELETE_STARTUP_PRODUCT_SUCCEEDED,
    DELETE_STARTUP_PRODUCT_FAILED,
    ADD_STARTUP_CONTACT,
    ADD_STARTUP_CONTACT_SUCCEEDED,
    ADD_STARTUP_CONTACT_FAILED,
    DELETE_STARTUP_CONTACT,
    DELETE_STARTUP_CONTACT_SUCCEEDED,
    DELETE_STARTUP_CONTACT_FAILED
} from "./startupsReducer";
import {
    delStartupAddress, delStartupContact,
    delStartupInterests, delStartupProduct, delStartupRoles,
    getStartups,
    postStartup, postStartupAddress, postStartupContact,
    putStartup,
    putStartupAddress,
    putStartupContact, putStartupInterests,
    putStartupProduct, putStartupRoles
} from "./startupsEndpoints";
import {UploadType} from "../../../posts/forms/UploadFile";

export type StartupData = 'avatar' | 'coverPhoto' | 'bioData'

export function addStartup(payload?: any) {
    return { type: ADD_STARTUP, payload };
}

export function addStartupSuccess(payload: any) {
    return { type: ADD_STARTUP_SUCCEEDED, payload };
}

export function addStartupFailed(payload: any) {
    return { type: ADD_STARTUP_FAILED, payload };
}

export function editStartup(payload: any, uploadType?: UploadType) {
    return { type: EDIT_STARTUP, payload, uploadType };
}

export function editStartupSuccess(payload: any) {
    return { type: EDIT_STARTUP_SUCCEEDED, payload };
}

export function editStartupFailed(payload: any) {
    return { type: EDIT_STARTUP_FAILED, payload };
}

export function editStartupAddress(payload?: any) {
    return { type: EDIT_STARTUP_ADDRESS, payload };
}

export function editStartupAddressSuccess(payload: any) {
    return { type: EDIT_STARTUP_ADDRESS_SUCCEEDED, payload };
}

export function editStartupAddressFailed(payload: any) {
    return { type: EDIT_STARTUP_ADDRESS_FAILED, payload };
}

export function addStartupAddress(payload?: any) {
    return { type: ADD_STARTUP_ADDRESS, payload };
}

export function addStartupAddressSuccess(payload: any) {
    return { type: ADD_STARTUP_ADDRESS_SUCCEEDED, payload };
}

export function addStartupAddressFailed(payload: any) {
    return { type: ADD_STARTUP_ADDRESS_FAILED, payload };
}

export function deleteStartupAddress(payload?: any) {
    return { type: DELETE_STARTUP_ADDRESS, payload };
}

export function deleteStartupAddressSuccess(payload: any) {
    return { type: DELETE_STARTUP_ADDRESS_SUCCEEDED, payload };
}

export function deleteStartupAddressFailed(payload: any) {
    return { type: DELETE_STARTUP_ADDRESS_FAILED, payload };
}

export function editStartupContact(payload?: any) {
    return { type: EDIT_STARTUP_CONTACT, payload };
}

export function editStartupContactSuccess(payload: any) {
    return { type: EDIT_STARTUP_CONTACT_SUCCEEDED, payload };
}

export function editStartupContactFailed(payload: any) {
    return { type: EDIT_STARTUP_CONTACT_FAILED, payload };
}

export function addStartupContact(payload?: any) {
    return { type: ADD_STARTUP_CONTACT, payload };
}

export function addStartupContactSuccess(payload: any) {
    return { type: ADD_STARTUP_CONTACT_SUCCEEDED, payload };
}

export function addStartupContactFailed(payload: any) {
    return { type: ADD_STARTUP_CONTACT_FAILED, payload };
}

export function deleteStartupContact(payload?: any) {
    return { type: DELETE_STARTUP_CONTACT, payload };
}

export function deleteStartupContactSuccess(payload: any) {
    return { type: DELETE_STARTUP_CONTACT_SUCCEEDED, payload };
}

export function deleteStartupContactFailed(payload: any) {
    return { type: DELETE_STARTUP_CONTACT_FAILED, payload };
}

export function editStartupProduct(payload?: any) {
    return { type: EDIT_STARTUP_PRODUCT, payload };
}

export function editStartupProductSuccess(payload: any) {
    return { type: EDIT_STARTUP_PRODUCT_SUCCEEDED, payload };
}

export function editStartupProductFailed(payload: any) {
    return { type: EDIT_STARTUP_PRODUCT_FAILED, payload };
}

export function addStartupProduct(payload?: any) {
    return { type: ADD_STARTUP_PRODUCT, payload };
}

export function addStartupProductSuccess(payload: any) {
    return { type: ADD_STARTUP_PRODUCT_SUCCEEDED, payload };
}

export function addStartupProductFailed(payload: any) {
    return { type: ADD_STARTUP_PRODUCT_FAILED, payload };
}

export function deleteStartupProduct(payload?: any) {
    return { type: DELETE_STARTUP_PRODUCT, payload };
}

export function deleteStartupProductSuccess(payload: any) {
    return { type: DELETE_STARTUP_PRODUCT_SUCCEEDED, payload };
}

export function deleteStartupProductFailed(payload: any) {
    return { type: DELETE_STARTUP_PRODUCT_FAILED, payload };
}

export function editStartupInterests(payload?: any) {
    return { type: EDIT_STARTUP_INTERESTS, payload };
}

export function editStartupInterestsSuccess(payload: any) {
    return { type: EDIT_STARTUP_INTERESTS_SUCCEEDED, payload };
}

export function editStartupInterestsFailed(payload: any) {
    return { type: EDIT_STARTUP_INTERESTS_FAILED, payload };
}

export function deleteStartupInterests(payload?: any) {
    return { type: DELETE_STARTUP_INTERESTS, payload };
}

export function deleteStartupInterestsSuccess(payload: any) {
    return { type: DELETE_STARTUP_INTERESTS_SUCCEEDED, payload };
}

export function deleteStartupInterestsFailed(payload: any) {
    return { type: DELETE_STARTUP_INTERESTS_FAILED, payload };
}

export function editStartupRoles(payload?: any) {
    return { type: EDIT_STARTUP_ROLES, payload };
}

export function editStartupRolesSuccess(payload: any) {
    return { type: EDIT_STARTUP_ROLES_SUCCEEDED, payload };
}

export function editStartupRolesFailed(payload: any) {
    return { type: EDIT_STARTUP_ROLES_FAILED, payload };
}

export function deleteStartupRoles(payload?: any) {
    return { type: DELETE_STARTUP_ROLES, payload };
}

export function deleteStartupRolesSuccess(payload: any) {
    return { type: DELETE_STARTUP_ROLES_SUCCEEDED, payload };
}

export function deleteStartupRolesFailed(payload: any) {
    return { type: DELETE_STARTUP_ROLES_FAILED, payload };
}

export function loadStartups(payload?: any) {
    return { type: FETCH_STARTUPS, payload };
}

export function loadStartupsSuccess(payload: any) {
    return { type: FETCH_STARTUPS_SUCCEEDED, payload };
}

export function loadStartupsFailed(payload: any) {
    return { type: FETCH_STARTUPS_FAILED, payload };
}

export function* createStartup(action: any){
    try {
        const response = yield call<any>(postStartup, action.payload)
        yield put(addStartupSuccess(response))
    } catch (error) {
        yield put(addStartupFailed(error.message));
    }
}

export function* updateStartup(action: any){
    try {
        const response = yield call<any>(putStartup, action.payload, action.uploadType)
        yield put(editStartupSuccess(response))
    } catch (error) {
        yield put(editStartupFailed(error.message));
    }
}

export function* updateStartupAddress(action: any){
    try {
        const response = yield call<any>(putStartupAddress, action.payload)
        yield put(editStartupAddressSuccess(response))
    } catch (error) {
        yield put(editStartupAddressFailed(error.message));
    }
}

export function* createStartupAddress(action: any){
    try {
        const response = yield call<any>(postStartupAddress, action.payload)
        yield put(addStartupAddressSuccess(response))
    } catch (error) {
        yield put(addStartupAddressFailed(error.message));
    }
}

export function* removeStartupAddress(action: any){
    try {
        const response = yield call<any>(delStartupAddress, action.payload)
        yield put(deleteStartupAddressSuccess(response))
    } catch (error) {
        yield put(deleteStartupAddressFailed(error.message));
    }
}

export function* updateStartupContact(action: any){
    try {
        const response = yield call<any>(putStartupContact, action.payload)
        yield put(editStartupContactSuccess(response))
    } catch (error) {
        yield put(editStartupContactFailed(error.message));
    }
}

export function* createStartupContact(action: any){
    try {
        const response = yield call<any>(postStartupContact, action.payload)
        yield put(addStartupContactSuccess(response))
    } catch (error) {
        yield put(addStartupContactFailed(error.message));
    }
}

export function* removeStartupContact(action: any){
    try {
        const response = yield call<any>(delStartupContact, action.payload)
        yield put(deleteStartupContactSuccess(response))
    } catch (error) {
        yield put(deleteStartupContactFailed(error.message));
    }
}

export function* updateStartupProduct(action: any){
    try {
        const response = yield call<any>(putStartupProduct, action.payload)
        yield put(editStartupProductSuccess(response))
    } catch (error) {
        yield put(editStartupProductFailed(error.message));
    }
}

export function* createStartupProduct(action: any){
    try {
        const response = yield call<any>(putStartupProduct, action.payload)
        yield put(addStartupProductSuccess(response))
    } catch (error) {
        yield put(addStartupProductFailed(error.message));
    }
}

export function* removeStartupProduct(action: any){
    try {
        const response = yield call<any>(delStartupProduct, action.payload)
        yield put(deleteStartupProductSuccess(response))
    } catch (error) {
        yield put(deleteStartupProductFailed(error.message));
    }
}

export function* updateStartupInterests(action: any){
    try {
        const response = yield call<any>(putStartupInterests, action.payload)
        yield put(editStartupInterestsSuccess(response))
    } catch (error) {
        yield put(editStartupInterestsFailed(error.message));
    }
}

export function* removeStartupInterests(action: any){
    try {
        const response = yield call<any>(delStartupInterests, action.payload)
        yield put(deleteStartupInterestsSuccess(response))
    } catch (error) {
        yield put(deleteStartupInterestsFailed(error.message));
    }
}

export function* updateStartupRoles(action: any){
    try {
        const response = yield call<any>(putStartupRoles, action.payload)
        yield put(editStartupRolesSuccess(response))
    } catch (error) {
        yield put(editStartupRolesFailed(error.message));
    }
}

export function* removeStartupRoles(action: any){
    try {
        const response = yield call<any>(delStartupRoles, action.payload)
        yield put(deleteStartupRolesSuccess(response))
    } catch (error) {
        yield put(deleteStartupRolesFailed(error.message));
    }
}

export function* fetchStartups(){
    try {
        const response = yield call<any>(getStartups)
        yield put(loadStartupsSuccess(response))
    } catch (error) {
        yield put(loadStartupsFailed(error.message));
    }
}
