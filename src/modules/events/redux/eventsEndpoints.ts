import {Endpoints} from "../../../services/Endpoints";
import {getAsync, makeUrl, postAsync} from "../../../utils/ajax";
import {IEvent} from "../../../interfaces/IEvent";

export const postEvent = async (event: IEvent) => {
    const url = makeUrl("Events", Endpoints.events.api)
    return await postAsync(url, event)
}

export const getEvents = async () => {
    // const state = store.getState()
    // const {nextPage} = state.events.request

    const url = makeUrl("Events", Endpoints.events.api)
    return await getAsync(url)
}