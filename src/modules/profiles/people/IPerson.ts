export interface IPerson {
    id?: string
    firstName?: string
    middleName?: string
    lastName?: string
    fullName?: string
    initials?: string
    dateOfBirth?: string
    categories?: string[]
    bio?: string
    avatar?: string
    gender?: string
    coverPhoto?: string
}

export class Person implements IPerson{
    constructor(public person: IPerson) {}

    get fullName(): string{
        const names = []
        if (this.person.firstName) names.push(this.person.firstName)
        if (this.person.middleName) names.push(this.person.middleName)
        if (this.person.lastName) names.push(this.person.lastName)

        return names.join(" ")
    }

    get initials(): string{
        const initials = []
        if (this.person.firstName) initials.push(this.person.firstName[0].toUpperCase())
        if (this.person.middleName) initials.push(this.person.middleName[0].toUpperCase())
        if (this.person.lastName) initials.push(this.person.lastName[0].toUpperCase())

        return initials.join("")
    }
}


