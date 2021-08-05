import {Endpoints} from "../../../services/Endpoints";
import {getAsync, getWithoutLoginAsync, makeUrl, postAsync, putAsync} from "../../../utils/ajax";
import {IEvent} from "../../../interfaces/IEvent";

export const postEvent = async (event: any) => {
    const url = makeUrl("Profiles", Endpoints.events.api)
    return await postAsync(url, event)
}

export const putEvent = async (event: any) => {
    const url = makeUrl("Events", Endpoints.events.api)
    return await putAsync(url, event)
}

export const getEventById = async (id: any) => {
    const url = makeUrl("Profiles", Endpoints.events.api)
    return await getWithoutLoginAsync(url + '/' + id)
}

export const getEvents = async () => {
    // const state = store.getState()
    // const {nextPage} = state.events.request

    const url = makeUrl("Profiles", Endpoints.events.api)
    return await getWithoutLoginAsync(url)
}