import {IOption} from "../components/inputs/inputHelpers";

export interface IProfile {
    id: string
    userId: string
    firstname: string
    middlename?: string
    lastname: string
    email: string
    dateOfBirth: string
    gender: string
    categories?: IOption[]
    bio?: string
    interests?: IOption[]
}