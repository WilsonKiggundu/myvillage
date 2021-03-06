
import {Endpoints} from "../../../../services/Endpoints";
import {deleteAsync, getAsync, getWithoutLoginAsync, makeUrl, postAsync, putAsync} from "../../../../utils/ajax";
import store from "../../../../data/store";
import {UploadType} from "../../../posts/forms/UploadFile";

export const getProfileStatus = async (personId: string) => {
    const url = makeUrl("Profiles", Endpoints.person.status)
    return await getAsync(url, {personId})
}

export const getPeople = async (params?: any) => {
    const state = store.getState()
    const {nextPage} = state.people.request

    const url = makeUrl("Profiles", Endpoints.person.base)
    return await getWithoutLoginAsync(url, params ? params : {page: nextPage, pageSize: 20})
}

export const updatePersonEmail = async (person: any) => {

    let url = makeUrl("Profiles", Endpoints.person.base)
    url += '/email'

    return await putAsync(url, person)
}

export const putPerson = async (person: any, uploadType?: UploadType) => {

    let url = makeUrl("Profiles", Endpoints.person.base)

    switch (uploadType) {
        case "coverPhoto":
            url += '/coverPhoto'
            break
        case "profilePhoto":
            url += '/avatar'
            break
    }

    return await putAsync(url, person)
}

export const putPersonCategories = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.category)
    return await postAsync(url, payload)
}

export const delPersonCategories = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.category)
    await deleteAsync(url, payload)
    return payload
}

export const putPersonInterests = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.interest)
    return await postAsync(url, payload)
}

export const delPersonInterests = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.interest)
    await deleteAsync(url, payload)
    return payload
}

export const putPersonSkills = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.skill)
    return await postAsync(url, payload)
}

export const delPersonSkills = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.skill)
    await deleteAsync(url, payload)
    return payload
}

export const postPersonEducation = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.award)
    return await postAsync(url, payload)
}

export const putPersonEducation = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.award)
    return await putAsync(url, payload)
}

export const delPersonEducation = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.award)
    await deleteAsync(url, payload)
    return payload
}

export const postPersonEmployment = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.employment)
    return await postAsync(url, payload)
}

export const putPersonEmployment = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.employment)
    return await putAsync(url, payload)
}

export const delPersonEmployment = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.employment)
    await deleteAsync(url, payload)
    return payload
}

export const postPersonProject = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.project)
    return await postAsync(url, payload)
}

export const putPersonProject = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.project)
    return await putAsync(url, payload)
}

export const delPersonProject = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.project)
    await deleteAsync(url, payload)
    return payload
}

export const postPersonStack = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.stack)
    return await postAsync(url, payload)
}

export const putPersonStack = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.stack)
    return await putAsync(url, payload)
}

export const delPersonStack = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.stack)
    await deleteAsync(url, payload)
    return payload
}

export const getPersonConnection = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.connection)
    return await getWithoutLoginAsync(url, payload)
}

export const putPersonConnection = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.connection)
    return await postAsync(url, payload)
}

export const delPersonConnection = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.connection)
    return await deleteAsync(url, payload)
}


export const getPersonContact = async (personId: any) => {
    const url = makeUrl("Profiles", Endpoints.person.contact)
    return await getWithoutLoginAsync(url, {personId})
}


export const postPersonContact = async (contact: any) => {
    const url = makeUrl("Profiles", Endpoints.person.contact)
    const response = await postAsync(url, contact)
    console.log(response)

    return response
}

export const putPersonContact = async (contact: any) => {
    const url = makeUrl("Profiles", Endpoints.person.contact)
    return await putAsync(url, contact)
}

export const delPersonContact = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.contact)
    await deleteAsync(url, payload)
    return payload
}
