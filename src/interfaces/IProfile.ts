import {IOption} from "../components/inputs/inputHelpers";

export interface IProfile {
    userId: string
    firstName: string
    middleName?: string
    lastName: string
    email: string
    dateOfBirth: string
    gender: string
    categories?: IOption[]
    bio?: string
    interests?: IOption[]
}