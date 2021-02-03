
import {Endpoints} from "../../../../services/Endpoints";
import {deleteAsync, getAsync, makeUrl, postAsync, putAsync} from "../../../../utils/ajax";
import store from "../../../../data/store";
import {PersonData} from "./peopleActions";
import {UploadType} from "../../../posts/forms/UploadFile";

export const getPeople = async (params?: any) => {
    const state = store.getState()
    const {nextPage} = state.people.request

    const url = makeUrl("Profiles", Endpoints.person.base)
    return await getAsync(url, params ? params : {page: nextPage})
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

export const getPersonConnection = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.connection)
    return await getAsync(url, payload)
}

export const putPersonConnection = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.connection)
    return await postAsync(url, payload)
}

export const delPersonConnection = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.person.connection)
    return await deleteAsync(url, payload)
}