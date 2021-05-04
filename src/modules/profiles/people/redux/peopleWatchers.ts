import {takeLatest} from "redux-saga/effects";
import {
    ADD_PERSON_CONTACT,
    ADD_PERSON_EDUCATION, ADD_PERSON_EMPLOYMENT, ADD_PERSON_PROJECT, ADD_PERSON_STACK,
    DELETE_PERSON_CATEGORIES,
    DELETE_PERSON_CONNECTION, DELETE_PERSON_CONTACT,
    DELETE_PERSON_EDUCATION, DELETE_PERSON_EMPLOYMENT,
    DELETE_PERSON_INTERESTS, DELETE_PERSON_PROJECT,
    DELETE_PERSON_SKILLS, DELETE_PERSON_STACK,
    EDIT_PERSON,
    EDIT_PERSON_CATEGORIES,
    EDIT_PERSON_CONNECTION, EDIT_PERSON_CONTACT,
    EDIT_PERSON_EDUCATION, EDIT_PERSON_EMPLOYMENT,
    EDIT_PERSON_INTERESTS, EDIT_PERSON_PROJECT,
    EDIT_PERSON_SKILLS, EDIT_PERSON_STACK,
    FETCH_PEOPLE, FETCH_PERSON_CONNECTION
} from "./peopleReducer";
import {
    createPersonContact,
    createPersonEducation,
    createPersonEmployment,
    createPersonProject,
    createPersonStack,
    fetchPeople,
    fetchPersonConnections,
    removePersonCategories,
    removePersonConnection,
    removePersonContact,
    removePersonEducation,
    removePersonEmployment,
    removePersonInterests,
    removePersonProject,
    removePersonSkills,
    removePersonStack,
    updatePerson,
    updatePersonCategories,
    updatePersonConnection,
    updatePersonContact,
    updatePersonEducation,
    updatePersonEmployment,
    updatePersonInterests,
    updatePersonProject,
    updatePersonSkills,
    updatePersonStack
} from "./peopleActions";

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

export function* addPersonEmploymentWatcher(){
    yield takeLatest(ADD_PERSON_EMPLOYMENT, createPersonEmployment)
}

export function* updatePersonEmploymentWatcher(){
    yield takeLatest(EDIT_PERSON_EMPLOYMENT, updatePersonEmployment)
}

export function* deletePersonEmploymentWatcher(){
    yield takeLatest(DELETE_PERSON_EMPLOYMENT, removePersonEmployment)
}

export function* addPersonProjectWatcher(){
    yield takeLatest(ADD_PERSON_PROJECT, createPersonProject)
}

export function* updatePersonProjectWatcher(){
    yield takeLatest(EDIT_PERSON_PROJECT, updatePersonProject)
}

export function* deletePersonProjectWatcher(){
    yield takeLatest(DELETE_PERSON_PROJECT, removePersonProject)
}

export function* addPersonStackWatcher(){
    yield takeLatest(ADD_PERSON_STACK, createPersonStack)
}

export function* updatePersonStackWatcher(){
    yield takeLatest(EDIT_PERSON_STACK, updatePersonStack)
}

export function* deletePersonStackWatcher(){
    yield takeLatest(DELETE_PERSON_STACK, removePersonStack)
}