import {IProject} from "../../../interfaces/IProject";
import {IEmployment} from "../../../interfaces/IEmployment";
import {ITechStack} from "../../../interfaces/ITechStack";

export interface IPerson {
    id: string
    firstname: string
    lastname: string
    dateOfBirth?: string
    connections?: []
    contacts?: any[]
    connectionsCount?: number
    categories: []
    interests: []
    skills: []
    awards: []
    employment: IEmployment[]
    stacks: ITechStack[]
    projects: IProject[]
    bio: string
    avatar?: string
    gender?: string
    coverPhoto?: string
    isEven?: boolean,
    isConnected?: boolean
}

export const getInitials = (firstname: string, lastname: string) => {
    const initials = []
    if (firstname) initials.push(firstname[0].toUpperCase())
    if (lastname) initials.push(lastname[0].toUpperCase())
    return initials.join("")
}

export const isDeveloper = (person: IPerson) => {
    return person.categories.map((m: any) => m.category.name).includes('Developer')
}

