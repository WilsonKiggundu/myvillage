import {takeLatest} from "redux-saga/effects";
import {
    ADD_STARTUP,
    ADD_STARTUP_ADDRESS, ADD_STARTUP_CONTACT,
    ADD_STARTUP_PRODUCT,
    DELETE_STARTUP_ADDRESS, DELETE_STARTUP_CONTACT,
    DELETE_STARTUP_INTERESTS, DELETE_STARTUP_PRODUCT,
    DELETE_STARTUP_ROLES,
    EDIT_STARTUP,
    EDIT_STARTUP_ADDRESS,
    EDIT_STARTUP_CONTACT,
    EDIT_STARTUP_INTERESTS,
    EDIT_STARTUP_PRODUCT,
    EDIT_STARTUP_ROLES,
    FETCH_STARTUPS
} from "./startupsReducer";
import {
    createStartup,
    createStartupAddress, createStartupContact,
    createStartupProduct,
    fetchStartups,
    removeStartupAddress,
    removeStartupContact,
    removeStartupInterests,
    removeStartupProduct,
    removeStartupRoles,
    updateStartup,
    updateStartupAddress,
    updateStartupContact,
    updateStartupInterests,
    updateStartupProduct,
    updateStartupRoles
} from "./startupsActions";

export function* startupsListWatcher(){
    yield takeLatest(FETCH_STARTUPS, fetchStartups)
}

export function* addStartupWatcher(){
    yield takeLatest(ADD_STARTUP, createStartup)
}

export function* updateStartupWatcher(){
    yield takeLatest(EDIT_STARTUP, updateStartup)
}

export function* updateStartupAddressWatcher(){
    yield takeLatest(EDIT_STARTUP_ADDRESS, updateStartupAddress)
}

export function* addStartupAddressWatcher(){
    yield takeLatest(ADD_STARTUP_ADDRESS, createStartupAddress)
}

export function* deleteStartupAddressWatcher(){
    yield takeLatest(DELETE_STARTUP_ADDRESS, removeStartupAddress)
}

export function* addStartupContactWatcher(){
    yield takeLatest(ADD_STARTUP_CONTACT, createStartupContact)
}

export function* updateStartupContactWatcher(){
    yield takeLatest(EDIT_STARTUP_CONTACT, updateStartupContact)
}

export function* deleteStartupContactWatcher(){
    yield takeLatest(DELETE_STARTUP_CONTACT, removeStartupContact)
}

export function* addStartupProductWatcher(){
    yield takeLatest(ADD_STARTUP_PRODUCT, createStartupProduct)
}

export function* updateStartupProductWatcher(){
    yield takeLatest(EDIT_STARTUP_PRODUCT, updateStartupProduct)
}

export function* deleteStartupProductWatcher(){
    yield takeLatest(DELETE_STARTUP_PRODUCT, removeStartupProduct)
}

export function* updateStartupInterestsWatcher(){
    yield takeLatest(EDIT_STARTUP_INTERESTS, updateStartupInterests)
}

export function* deleteStartupInterestsWatcher(){
    yield takeLatest(DELETE_STARTUP_INTERESTS, removeStartupInterests)
}

export function* updateStartupRolesWatcher(){
    yield takeLatest(EDIT_STARTUP_ROLES, updateStartupRoles)
}

export function* deleteStartupRolesWatcher(){
    yield takeLatest(DELETE_STARTUP_ROLES, removeStartupRoles)
}