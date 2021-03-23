import {takeLatest} from "redux-saga/effects";
import {
    ADD_PERSON_CONTACT,
    ADD_PERSON_EDUCATION,
    DELETE_PERSON_CATEGORIES,
    DELETE_PERSON_CONNECTION, DELETE_PERSON_CONTACT,
    DELETE_PERSON_EDUCATION,
    DELETE_PERSON_INTERESTS,
    DELETE_PERSON_SKILLS,
    EDIT_PERSON,
    EDIT_PERSON_CATEGORIES,
    EDIT_PERSON_CONNECTION, EDIT_PERSON_CONTACT,
    EDIT_PERSON_EDUCATION,
    EDIT_PERSON_INTERESTS,
    EDIT_PERSON_SKILLS,
    FETCH_PEOPLE, FETCH_PERSON_CONNECTION
} from "./peopleReducer";
import {
    createPersonContact,
    createPersonEducation,
    fetchPeople,
    fetchPersonConnections,
    removePersonCategories,
    removePersonConnection, removePersonContact,
    removePersonEducation,
    removePersonInterests,
    removePersonSkills,
    updatePerson,
    updatePersonCategories,
    updatePersonConnection,
    updatePersonContact,
    updatePersonEducation,
    updatePersonInterests,
    updatePersonSkills
} from "./peopleActions";
import {ADD_STARTUP_CONTACT, DELETE_STARTUP_CONTACT, EDIT_STARTUP_CONTACT} from "../../startups/redux/startupsReducer";
import {createStartupContact, removeStartupContact, updateStartupContact} from "../../startups/redux/startupsActions";

export function* peopleListWatcher(){
    yield takeLatest(FETCH_PEOPLE, fetchPeople)
}

export function* updatePersonWatcher(){
    yield takeLatest(EDIT_PERSON, updatePerson)
}

export function* updatePersonCategoriesWatcher(){
    yield takeLatest(EDIT_PERSON_CATEGORIES, updatePersonCategories)
}

export function* deletePersonCategoriesWatcher(){
    yield takeLatest(DELETE_PERSON_CATEGORIES, removePersonCategories)
}

export function* updatePersonInterestsWatcher(){
    yield takeLatest(EDIT_PERSON_INTERESTS, updatePersonInterests)
}

export function* deletePersonInterestsWatcher(){
    yield takeLatest(DELETE_PERSON_INTERESTS, removePersonInterests)
}

export function* updatePersonSkillsWatcher(){
    yield takeLatest(EDIT_PERSON_SKILLS, updatePersonSkills)
}

export function* deletePersonSkillsWatcher(){
    yield takeLatest(DELETE_PERSON_SKILLS, removePersonSkills)
}

export function* addPersonEducationWatcher(){
    yield takeLatest(ADD_PERSON_EDUCATION, createPersonEducation)
}

export function* updatePersonEducationWatcher(){
    yield takeLatest(EDIT_PERSON_EDUCATION, updatePersonEducation)
}

export function* deletePersonEducationWatcher(){
    yield takeLatest(DELETE_PERSON_EDUCATION, removePersonEducation)
}

export function* fetchPersonConnectionWatcher(){
    yield takeLatest(FETCH_PERSON_CONNECTION, fetchPersonConnections)
}

export function* updatePersonConnectionWatcher(){
    yield takeLatest(EDIT_PERSON_CONNECTION, updatePersonConnection)
}

export function* deletePersonConnectionWatcher(){
    yield takeLatest(DELETE_PERSON_CONNECTION, removePersonConnection)
}

export function* addPersonContactWatcher(){
    yield takeLatest(ADD_PERSON_CONTACT, createPersonContact)
}

export function* updatePersonContactWatcher(){
    yield takeLatest(EDIT_PERSON_CONTACT, updatePersonContact)
}

export function* deletePersonContactWatcher(){
    yield takeLatest(DELETE_PERSON_CONTACT, removePersonContact)
}