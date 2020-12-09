import {customConstants} from "./customReducer";

export const addEventAction = (data: any) => {
    return {
        type: customConstants.addedEvent,
        payload: {...data},
    }
}