export interface IJob {
    id?: any
    deadline: string
    details: string
    experience: string
    howToApply: string
    location: string
    qualifications: string
    title: string
    // uploads?: [any]
    category: IJobCategory
}

export interface IJobCategory {
    id: any
    name: string
}