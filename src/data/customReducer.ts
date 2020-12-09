
export const customConstants = {
    addedEvent: "ADDED_EVENT_ACTION",
}

export default function reducer(state: any, action: any) {
    switch (action.type) {
        case customConstants.addedEvent:
            return {
                ...state,
                data: action.payload
            }

        default: {
            return state
        }
    }
}