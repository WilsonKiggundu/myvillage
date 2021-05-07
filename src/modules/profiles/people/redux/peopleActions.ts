import {call, put} from "redux-saga/effects"

import {
    FETCH_PEOPLE,
    FETCH_PEOPLE_FAILED,
    FETCH_PEOPLE_SUCCEEDED,
    EDIT_PERSON,
    EDIT_PERSON_FAILED,
    EDIT_PERSON_SUCCEEDED,
    EDIT_PERSON_CATEGORIES,
    EDIT_PERSON_CATEGORIES_SUCCEEDED,
    EDIT_PERSON_CATEGORIES_FAILED,
    DELETE_PERSON_CATEGORIES_SUCCEEDED,
    DELETE_PERSON_CATEGORIES_FAILED,
    DELETE_PERSON_CATEGORIES,
    EDIT_PERSON_INTERESTS,
    EDIT_PERSON_INTERESTS_SUCCEEDED,
    EDIT_PERSON_INTERESTS_FAILED,
    DELETE_PERSON_INTERESTS,
    DELETE_PERSON_INTERESTS_SUCCEEDED,
    DELETE_PERSON_INTERESTS_FAILED,

    ADD_PERSON_CONTACT,
    ADD_PERSON_CONTACT_SUCCEEDED,
    ADD_PERSON_CONTACT_FAILED,
    DELETE_PERSON_CONTACT,
    DELETE_PERSON_CONTACT_SUCCEEDED,
    DELETE_PERSON_CONTACT_FAILED,
    EDIT_PERSON_CONTACT,
    EDIT_PERSON_CONTACT_SUCCEEDED,
    EDIT_PERSON_CONTACT_FAILED,

    EDIT_PERSON_SKILLS,
    EDIT_PERSON_SKILLS_SUCCEEDED,
    EDIT_PERSON_SKILLS_FAILED,
    DELETE_PERSON_SKILLS,
    DELETE_PERSON_SKILLS_SUCCEEDED,
    DELETE_PERSON_SKILLS_FAILED,
    EDIT_PERSON_EDUCATION,
    EDIT_PERSON_EDUCATION_SUCCEEDED,
    EDIT_PERSON_EDUCATION_FAILED,
    DELETE_PERSON_EDUCATION,
    DELETE_PERSON_EDUCATION_SUCCEEDED,
    DELETE_PERSON_EDUCATION_FAILED,
    EDIT_PERSON_CONNECTION,
    EDIT_PERSON_CONNECTION_SUCCEEDED,
    EDIT_PERSON_CONNECTION_FAILED,
    DELETE_PERSON_CONNECTION,
    DELETE_PERSON_CONNECTION_SUCCEEDED,
    DELETE_PERSON_CONNECTION_FAILED,
    ADD_PERSON_EDUCATION,
    ADD_PERSON_EDUCATION_SUCCEEDED,
    ADD_PERSON_EDUCATION_FAILED,
    FETCH_PERSON_CONNECTION,
    FETCH_PERSON_CONNECTION_SUCCEEDED,
    FETCH_PERSON_CONNECTION_FAILED,
    EDIT_PERSON_PROJECT,
    EDIT_PERSON_PROJECT_SUCCEEDED,
    EDIT_PERSON_PROJECT_FAILED,
    ADD_PERSON_PROJECT,
    ADD_PERSON_PROJECT_SUCCEEDED,
    ADD_PERSON_PROJECT_FAILED,
    DELETE_PERSON_PROJECT,
    DELETE_PERSON_PROJECT_SUCCEEDED,
    DELETE_PERSON_PROJECT_FAILED,
    EDIT_PERSON_STACK,
    EDIT_PERSON_STACK_SUCCEEDED,
    EDIT_PERSON_STACK_FAILED,
    DELETE_PERSON_STACK,
    DELETE_PERSON_STACK_SUCCEEDED,
    DELETE_PERSON_STACK_FAILED,
    EDIT_PERSON_EMPLOYMENT,
    EDIT_PERSON_EMPLOYMENT_SUCCEEDED,
    EDIT_PERSON_EMPLOYMENT_FAILED,
    ADD_PERSON_EMPLOYMENT,
    ADD_PERSON_EMPLOYMENT_SUCCEEDED,
    ADD_PERSON_EMPLOYMENT_FAILED,
    DELETE_PERSON_EMPLOYMENT,
    DELETE_PERSON_EMPLOYMENT_SUCCEEDED,
    DELETE_PERSON_EMPLOYMENT_FAILED,
    ADD_PERSON_STACK,
    ADD_PERSON_STACK_SUCCEEDED,
    ADD_PERSON_STACK_FAILED
} from "./peopleReducer";
import {
    delPersonCategories,
    delPersonConnection,
    delPersonEducation,
    delPersonInterests,
    delPersonSkills,
    getPeople,
    getPersonConnection,
    postPersonEducation,
    putPerson,
    delPersonContact,
    postPersonContact,
    putPersonContact,
    putPersonCategories,
    putPersonConnection,
    putPersonEducation,
    putPersonInterests,
    putPersonSkills,
    putPersonEmployment,
    postPersonEmployment,
    delPersonEmployment,
    putPersonProject, postPersonProject, delPersonProject, putPersonStack, postPersonStack, delPersonStack
} from "./peopleEndpoints";
import {UploadType} from "../../../posts/forms/UploadFile";

export function loadPeople(payload?: any) {
    return { type: FETCH_PEOPLE, payload };
}

export function loadPeopleSuccess(payload: any) {
    return { type: FETCH_PEOPLE_SUCCEEDED, payload };
}

export function loadPeopleFailed(payload: any) {
    return { type: FETCH_PEOPLE_FAILED, payload };
}

export function editPerson(payload: any, uploadType?: UploadType) {
    return { type: EDIT_PERSON, payload, uploadType }
}

export function editPersonSuccess(payload: any) {
    return { type: EDIT_PERSON_SUCCEEDED, payload };
}

export function editPersonFailed(payload: any) {
    return { type: EDIT_PERSON_FAILED, payload };
}

export function editPersonCategories(payload?: any) {
    return { type: EDIT_PERSON_CATEGORIES, payload };
}

export function editPersonCategoriesSuccess(payload: any) {
    return { type: EDIT_PERSON_CATEGORIES_SUCCEEDED, payload };
}

export function editPersonCategoriesFailed(payload: any) {
    return { type: EDIT_PERSON_CATEGORIES_FAILED, payload };
}

export function deletePersonCategories(payload?: any) {
    return { type: DELETE_PERSON_CATEGORIES, payload };
}

export function deletePersonCategoriesSuccess(payload: any) {
    return { type: DELETE_PERSON_CATEGORIES_SUCCEEDED, payload };
}

export function deletePersonCategoriesFailed(payload: any) {
    return { type: DELETE_PERSON_CATEGORIES_FAILED, payload };
}

export function editPersonInterests(payload?: any) {
    return { type: EDIT_PERSON_INTERESTS, payload };
}

export function editPersonInterestsSuccess(payload: any) {
    return { type: EDIT_PERSON_INTERESTS_SUCCEEDED, payload };
}

export function editPersonInterestsFailed(payload: any) {
    return { type: EDIT_PERSON_INTERESTS_FAILED, payload };
}

export function deletePersonInterests(payload?: any) {
    return { type: DELETE_PERSON_INTERESTS, payload };
}

export function deletePersonInterestsSuccess(payload: any) {
    return { type: DELETE_PERSON_INTERESTS_SUCCEEDED, payload };
}

export function deletePersonInterestsFailed(payload: any) {
    return { type: DELETE_PERSON_INTERESTS_FAILED, payload };
}

export function addPersonStack(payload?: any) {
    return { type: ADD_PERSON_STACK, payload };
}

export function addPersonStackSuccess(payload: any) {
    return { type: ADD_PERSON_STACK_SUCCEEDED, payload };
}

export function addPersonStackFailed(payload: any) {
    return { type: ADD_PERSON_STACK_FAILED, payload };
}

export function editPersonStack(payload?: any) {
    return { type: EDIT_PERSON_STACK, payload };
}

export function editPersonStackSuccess(payload: any) {
    return { type: EDIT_PERSON_STACK_SUCCEEDED, payload };
}

export function editPersonStackFailed(payload: any) {
    return { type: EDIT_PERSON_STACK_FAILED, payload };
}

export function deletePersonStack(payload?: any) {
    return { type: DELETE_PERSON_STACK, payload };
}

export function deletePersonStackSuccess(payload: any) {
    return { type: DELETE_PERSON_STACK_SUCCEEDED, payload };
}

export function deletePersonStackFailed(payload: any) {
    return { type: DELETE_PERSON_STACK_FAILED, payload };
}

export function editPersonSkills(payload?: any) {
    return { type: EDIT_PERSON_SKILLS, payload };
}

export function editPersonSkillsSuccess(payload: any) {
    return { type: EDIT_PERSON_SKILLS_SUCCEEDED, payload };
}

export function editPersonSkillsFailed(payload: any) {
    return { type: EDIT_PERSON_SKILLS_FAILED, payload };
}

export function deletePersonSkills(payload?: any) {
    return { type: DELETE_PERSON_SKILLS, payload };
}

export function deletePersonSkillsSuccess(payload: any) {
    return { type: DELETE_PERSON_SKILLS_SUCCEEDED, payload };
}

export function deletePersonSkillsFailed(payload: any) {
    return { type: DELETE_PERSON_SKILLS_FAILED, payload };
}

export function editPersonEducation(payload?: any) {
    return { type: EDIT_PERSON_EDUCATION, payload };
}

export function editPersonEducationSuccess(payload: any) {
    return { type: EDIT_PERSON_EDUCATION_SUCCEEDED, payload };
}

export function editPersonEducationFailed(payload: any) {
    return { type: EDIT_PERSON_EDUCATION_FAILED, payload };
}

export function addPersonEducation(payload?: any) {
    return { type: ADD_PERSON_EDUCATION, payload };
}

export function addPersonEducationSuccess(payload: any) {
    return { type: ADD_PERSON_EDUCATION_SUCCEEDED, payload };
}

export function addPersonEducationFailed(payload: any) {
    return { type: ADD_PERSON_EDUCATION_FAILED, payload };
}

export function deletePersonEducation(payload?: any) {
    return { type: DELETE_PERSON_EDUCATION, payload };
}

export function deletePersonEducationSuccess(payload: any) {
    return { type: DELETE_PERSON_EDUCATION_SUCCEEDED, payload };
}

export function deletePersonEducationFailed(payload: any) {
    return { type: DELETE_PERSON_EDUCATION_FAILED, payload };
}

// person project

export function editPersonProject(payload?: any) {
    return { type: EDIT_PERSON_PROJECT, payload };
}

export function editPersonProjectSuccess(payload: any) {
    return { type: EDIT_PERSON_PROJECT_SUCCEEDED, payload };
}

export function editPersonProjectFailed(payload: any) {
    return { type: EDIT_PERSON_PROJECT_FAILED, payload };
}

export function addPersonProject(payload?: any) {
    return { type: ADD_PERSON_PROJECT, payload };
}

export function addPersonProjectSuccess(payload: any) {
    return { type: ADD_PERSON_PROJECT_SUCCEEDED, payload };
}

export function addPersonProjectFailed(payload: any) {
    return { type: ADD_PERSON_PROJECT_FAILED, payload };
}

export function deletePersonProject(payload?: any) {
    return { type: DELETE_PERSON_PROJECT, payload };
}

export function deletePersonProjectSuccess(payload: any) {
    return { type: DELETE_PERSON_PROJECT_SUCCEEDED, payload };
}

export function deletePersonProjectFailed(payload: any) {
    return { type: DELETE_PERSON_PROJECT_FAILED, payload };
}

// person employment
export function editPersonEmployment(payload?: any) {
    return { type: EDIT_PERSON_EMPLOYMENT, payload };
}

export function editPersonEmploymentSuccess(payload: any) {
    return { type: EDIT_PERSON_EMPLOYMENT_SUCCEEDED, payload };
}

export function editPersonEmploymentFailed(payload: any) {
    return { type: EDIT_PERSON_EMPLOYMENT_FAILED, payload };
}

export function addPersonEmployment(payload?: any) {
    return { type: ADD_PERSON_EMPLOYMENT, payload };
}

export function addPersonEmploymentSuccess(payload: any) {
    return { type: ADD_PERSON_EMPLOYMENT_SUCCEEDED, payload };
}

export function addPersonEmploymentFailed(payload: any) {
    return { type: ADD_PERSON_EMPLOYMENT_FAILED, payload };
}

export function deletePersonEmployment(payload?: any) {
    return { type: DELETE_PERSON_EMPLOYMENT, payload };
}

export function deletePersonEmploymentSuccess(payload: any) {
    return { type: DELETE_PERSON_EMPLOYMENT_SUCCEEDED, payload };
}

export function deletePersonEmploymentFailed(payload: any) {
    return { type: DELETE_PERSON_EMPLOYMENT_FAILED, payload };
}

export function loadPersonConnection(payload?: any) {
    return { type: FETCH_PERSON_CONNECTION, payload };
}

export function loadPersonConnectionSuccess(payload: any) {
    return { type: FETCH_PERSON_CONNECTION_SUCCEEDED, payload };
}

export function loadPersonConnectionFailed(payload: any) {
    return { type: FETCH_PERSON_CONNECTION_FAILED, payload };
}

export function editPersonConnection(payload?: any) {
    return { type: EDIT_PERSON_CONNECTION, payload };
}

export function editPersonConnectionSuccess(payload: any) {
    return { type: EDIT_PERSON_CONNECTION_SUCCEEDED, payload };
}

export function editPersonConnectionFailed(payload: any) {
    return { type: EDIT_PERSON_CONNECTION_FAILED, payload };
}

export function deletePersonConnection(payload?: any) {
    return { type: DELETE_PERSON_CONNECTION, payload };
}

export function deletePersonConnectionSuccess(payload: any) {
    return { type: DELETE_PERSON_CONNECTION_SUCCEEDED, payload };
}

export function deletePersonConnectionFailed(payload: any) {
    return { type: DELETE_PERSON_CONNECTION_FAILED, payload };
}

export function editPersonContact(payload?: any) {
    return { type: EDIT_PERSON_CONTACT, payload };
}

export function editPersonContactSuccess(payload: any) {
    return { type: EDIT_PERSON_CONTACT_SUCCEEDED, payload };
}

export function editPersonContactFailed(payload: any) {
    return { type: EDIT_PERSON_CONTACT_FAILED, payload };
}

export function addPersonContact(payload?: any) {
    return { type: ADD_PERSON_CONTACT, payload };
}

export function addPersonContactSuccess(payload: any) {
    return { type: ADD_PERSON_CONTACT_SUCCEEDED, payload };
}

export function addPersonContactFailed(payload: any) {
    return { type: ADD_PERSON_CONTACT_FAILED, payload };
}

export function deletePersonContact(payload?: any) {
    return { type: DELETE_PERSON_CONTACT, payload };
}

export function deletePersonContactSuccess(payload: any) {
    return { type: DELETE_PERSON_CONTACT_SUCCEEDED, payload };
}

export function deletePersonContactFailed(payload: any) {
    return { type: DELETE_PERSON_CONTACT_FAILED, payload };
}

export function* updatePersonCategories(action: any){
    try {
        const response = yield call<any>(putPersonCategories, action.payload)
        yield put(editPersonCategoriesSuccess(response))
    } catch (error) {
        yield put(editPersonCategoriesFailed(error.message));
    }
}

export function* removePersonCategories(action: any){
    try {
        const response = yield call<any>(delPersonCategories, action.payload)
        yield put(deletePersonCategoriesSuccess(response))
    } catch (error) {
        yield put(deletePersonCategoriesFailed(error.message));
    }
}

export function* updatePersonInterests(action: any){
    try {

        const response = yield call<any>(putPersonInterests, action.payload)
        yield put(editPersonInterestsSuccess(response))
    } catch (error) {
        yield put(editPersonInterestsFailed(error.message));
    }
}

export function* removePersonInterests(action: any){
    try {
        const response = yield call<any>(delPersonInterests, action.payload)
        yield put(deletePersonInterestsSuccess(response))
    } catch (error) {
        yield put(deletePersonInterestsFailed(error.message));
    }
}

export function* updatePersonSkills(action: any){
    try {

        const response = yield call<any>(putPersonSkills, action.payload)
        yield put(editPersonSkillsSuccess(response))
    } catch (error) {
        yield put(editPersonSkillsFailed(error.message));
    }
}

export function* removePersonSkills(action: any){
    try {
        const response = yield call<any>(delPersonSkills, action.payload)
        yield put(deletePersonSkillsSuccess(response))
    } catch (error) {
        yield put(deletePersonSkillsFailed(error.message));
    }
}

export function* updatePersonEducation(action: any){
    try {

        const response = yield call<any>(putPersonEducation, action.payload)
        yield put(editPersonEducationSuccess(response))
    } catch (error) {
        yield put(editPersonEducationFailed(error.message));
    }
}

export function* createPersonEducation(action: any){
    try {

        const response = yield call<any>(postPersonEducation, action.payload)
        yield put(addPersonEducationSuccess(response))
    } catch (error) {
        yield put(addPersonEducationFailed(error.message));
    }
}

export function* removePersonEducation(action: any){
    try {
        const response = yield call<any>(delPersonEducation, action.payload)
        yield put(deletePersonEducationSuccess(response))
    } catch (error) {
        yield put(deletePersonEducationFailed(error.message));
    }
}

export function* updatePersonEmployment(action: any){
    try {

        const response = yield call<any>(putPersonEmployment, action.payload)
        yield put(editPersonEmploymentSuccess(response))
    } catch (error) {
        yield put(editPersonEmploymentFailed(error.message));
    }
}

export function* createPersonEmployment(action: any){
    try {

        const response = yield call<any>(postPersonEmployment, action.payload)
        yield put(addPersonEmploymentSuccess(response))
    } catch (error) {
        yield put(addPersonEmploymentFailed(error.message));
    }
}

export function* removePersonEmployment(action: any){
    try {
        const response = yield call<any>(delPersonEmployment, action.payload)
        yield put(deletePersonEmploymentSuccess(response))
    } catch (error) {
        yield put(deletePersonEmploymentFailed(error.message));
    }
}

export function* updatePersonProject(action: any){
    try {

        const response = yield call<any>(putPersonProject, action.payload)
        yield put(editPersonProjectSuccess(response))
    } catch (error) {
        yield put(editPersonProjectFailed(error.message));
    }
}

export function* createPersonProject(action: any){
    try {

        const response = yield call<any>(postPersonProject, action.payload)
        yield put(addPersonProjectSuccess(response))
    } catch (error) {
        yield put(addPersonProjectFailed(error.message));
    }
}

export function* removePersonProject(action: any){
    try {
        const response = yield call<any>(delPersonProject, action.payload)
        yield put(deletePersonProjectSuccess(response))
    } catch (error) {
        yield put(deletePersonProjectFailed(error.message));
    }
}


export function* updatePersonStack(action: any){
    try {

        const response = yield call<any>(putPersonStack, action.payload)
        yield put(editPersonStackSuccess(response))
    } catch (error) {
        yield put(editPersonStackFailed(error.message));
    }
}

export function* createPersonStack(action: any){
    try {

        const response = yield call<any>(postPersonStack, action.payload)
        yield put(addPersonStackSuccess(response))
    } catch (error) {
        yield put(addPersonStackFailed(error.message));
    }
}

export function* removePersonStack(action: any){
    try {
        const response = yield call<any>(delPersonStack, action.payload)
        yield put(deletePersonStackSuccess(response))
    } catch (error) {
        yield put(deletePersonStackFailed(error.message));
    }
}

export function* fetchPersonConnections(action: any){
    try {
        const response = yield call<any>(getPersonConnection, action.payload)
        yield put(loadPersonConnectionSuccess(response))
    } catch (error) {
        yield put(loadPersonConnectionFailed(error.message));
    }
}

export function* updatePersonConnection(action: any){
    try {

        const response = yield call<any>(putPersonConnection, action.payload)
        yield put(editPersonConnectionSuccess(response))
    } catch (error) {
        yield put(editPersonConnectionFailed(error.message));
    }
}

export function* removePersonConnection(action: any){
    try {
        const response = yield call<any>(delPersonConnection, action.payload)
        yield put(deletePersonConnectionSuccess(response))
    } catch (error) {
        yield put(deletePersonConnectionFailed(error.message));
    }
}

export function* fetchPeople(action: any){
    try {
        const response = yield call<any>(getPeople, action.payload)
        yield put(loadPeopleSuccess(response))
    } catch (error) {
        yield put(loadPeopleFailed(error.message));
    }
}

export function* updatePerson(action: any){
    try {
        const response = yield call<any>(putPerson, action.payload, action.uploadType)
        yield put(editPersonSuccess(response))
    } catch (error) {
        yield put(editPersonFailed(error.message));
    }
}

export function* updatePersonContact(action: any){
    try {
        const response = yield call<any>(putPersonContact, action.payload)
        yield put(editPersonContactSuccess(response))
    } catch (error) {
        yield put(editPersonContactFailed(error.message));
    }
}

export function* createPersonContact(action: any){
    try {
        const response = yield call<any>(postPersonContact, action.payload)
        yield put(addPersonContactSuccess(response))
    } catch (error) {
        yield put(addPersonContactFailed(error.message));
    }
}

export function* removePersonContact(action: any){
    try {
        const response = yield call<any>(delPersonContact, action.payload)
        yield put(deletePersonContactSuccess(response))
    } catch (error) {
        yield put(deletePersonContactFailed(error.message));
    }
}

