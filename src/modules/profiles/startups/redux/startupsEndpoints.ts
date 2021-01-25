
import {Endpoints} from "../../../../services/Endpoints";
import {del, deleteAsync, getAsync, makeUrl, postAsync, putAsync} from "../../../../utils/ajax";
import store from "../../../../data/store";
import {IAddress} from "../../../../interfaces/IAddress";
import {UploadType} from "../../../posts/forms/UploadFile";
import {start} from "repl";

export const postStartup = async (startup: any) => {
    const url = makeUrl("Profiles", Endpoints.business.base)
    return await postAsync(url, startup)
}

export const putStartup = async (startup: any, uploadType?: UploadType) => {
    let url = makeUrl("Profiles", Endpoints.business.base)

    switch (uploadType) {
        case "coverPhoto":
            url += '/coverPhoto'
            break
        case "profilePhoto":
            url += '/avatar'
            break
    }

    return await putAsync(url, startup)
}

export const postStartupAddress = async (address: IAddress) => {
    const url = makeUrl("Profiles", Endpoints.business.address)
    return await postAsync(url, address)
}

export const putStartupAddress = async (address: IAddress) => {
    const url = makeUrl("Profiles", Endpoints.business.address)
    return await putAsync(url, address)
}

export const delStartupAddress = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.business.address)
    await deleteAsync(url, payload)
    return payload
}

export const postStartupContact = async (contact: any) => {
    const url = makeUrl("Profiles", Endpoints.business.contact)
    return await postAsync(url, contact)
}

export const putStartupContact = async (contact: any) => {
    const url = makeUrl("Profiles", Endpoints.business.contact)
    return await putAsync(url, contact)
}

export const delStartupContact = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.business.contact)
    await deleteAsync(url, payload)
    return payload
}

export const putStartupProduct = async (product: any) => {
    const url = makeUrl("Profiles", Endpoints.business.product)
    return await product.id ? putAsync(url, product) : postAsync(url, product)
}

export const delStartupProduct = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.business.product)
    await deleteAsync(url, payload)
    return payload
}

export const putStartupInterests = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.business.interest)
    return await postAsync(url, payload)
}

export const delStartupInterests = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.business.interest)
    await deleteAsync(url, payload)
    return payload
}

export const putStartupRoles = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.business.role)
    return await postAsync(url, payload)
}

export const delStartupRoles = async (payload: any) => {
    const url = makeUrl("Profiles", Endpoints.business.role)
    return await deleteAsync(url, payload)
}

export const getStartups = async (params?: any) => {
    const state = store.getState()
    const {nextPage} = state.startups.request

    const url = makeUrl("Profiles", Endpoints.business.base)
    return await getAsync(url, {...params, page: nextPage})
}