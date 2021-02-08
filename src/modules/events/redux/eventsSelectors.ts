
export const eventsSelector = (state: any) => state.events
export const eventSelector = (state: any, id: string) => state.events.data.find((event: any) => event.id === id)


