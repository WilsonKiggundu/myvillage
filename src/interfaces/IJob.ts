import {IStartup} from "./IStartup";

export interface IJob {
    deadline: string
    profileId: string
    companyId: string
    details: string
    experience: string
    benefits: string
    location: string
    qualifications: string
    title: string
    category: IJobCategory
    id?: any
    jobId: string
    jobType?: string
    minSalary?: string
    maxSalary?: string
    skills?: string
    company?: IStartup
    applicants?: []
    applications?: []
    uploads?: []
}

export interface IJobCategory {
    id: any
    name: string
}