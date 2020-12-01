export interface IPerson {
    id: string
    firstname: string
    lastname: string
    dateOfBirth?: string
    categories?: string[]
    bio: string
    avatar?: string
    gender?: string
    coverPhoto?: string
}

export const getInitials = (firstname: string, lastname: string) => {
    const initials = []
    if (firstname) initials.push(firstname[0].toUpperCase())
    if (lastname) initials.push(lastname[0].toUpperCase())
    return initials.join("")
}

