import {IStartup} from "./IStartup";

export interface IJob {
    id?: any
    deadline: string
    details: string
    experience: string
    howToApply: string
    benefits: string
    salaryRange?: string
    location: string
    qualifications: string
    title: string
    engagement?: string
    category: IJobCategory
    profileId: string
    companyId: string
    company?: IStartup
}

export interface IJobCategory {
    id: any
    name: string
}