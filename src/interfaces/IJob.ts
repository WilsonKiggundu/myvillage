export interface IJob {
    id?: any
    deadline: string
    details: string
    experience: string
    howToApply: string
    location: string
    qualifications: string
    title: string
    category: IJobCategory
    profileId: string
    companyId: string
}

export interface IJobCategory {
    id: any
    name: string
}