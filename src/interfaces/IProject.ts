export interface IProject {
    id?: string
    personId?: string
    client?: string
    title: string
    from: string
    until?: string
    description: string
    techStack?: string
    role: string
    url?: string
    linkToGitRepo?: string
}