import {IAddress} from "./IAddress";

export interface IStartup {
    id: string
    name: string
    description: string
    numberOfEmployees: number
    dateOfIncorporation: string
    website: string
    category: string
    coverPhoto?: string
    avatar?: string
    interests?: []
    awards?: []
    contacts?: []
    roles?: []
    addresses?: IAddress[]
    products?: []
}