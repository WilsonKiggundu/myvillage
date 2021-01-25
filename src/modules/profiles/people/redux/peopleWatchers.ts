import {takeLatest} from "redux-saga/effects";
import {
    DELETE_PERSON_CATEGORIES,
    DELETE_PERSON_CONNECTION,
    DELETE_PERSON_EDUCATION,
    DELETE_PERSON_INTERESTS,
    DELETE_PERSON_SKILLS,
    EDIT_PERSON,
    EDIT_PERSON_CATEGORIES,
    EDIT_PERSON_CONNECTION,
    EDIT_PERSON_EDUCATION,
    EDIT_PERSON_INTERESTS,
    EDIT_PERSON_SKILLS,
    FETCH_PEOPLE
} from "./peopleReducer";
import {
    fetchPeople,
    removePersonCategories, removePersonConnection, removePersonEducation,
    removePersonInterests, removePersonSkills,
    updatePerson,
    updatePersonCategories, updatePersonConnection, updatePersonEducation, updatePersonInterests, updatePersonSkills
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

export function* updatePersonEducationWatcher(){
    yield takeLatest(EDIT_PERSON_EDUCATION, updatePersonEducation)
}

export function* deletePersonEducationWatcher(){
    yield takeLatest(DELETE_PERSON_EDUCATION, removePersonEducation)
}

export function* updatePersonConnectionWatcher(){
    yield takeLatest(EDIT_PERSON_CONNECTION, updatePersonConnection)
}

export function* deletePersonConnectionWatcher(){
    yield takeLatest(DELETE_PERSON_CONNECTION, removePersonConnection)
}