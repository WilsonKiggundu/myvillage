import {IPerson} from "../IPerson"

export const peopleSelector = (state: any) => state.people
export const personSelector = (state: any, id: string) => state.people.data.find((person: IPerson) => person.id === id)



