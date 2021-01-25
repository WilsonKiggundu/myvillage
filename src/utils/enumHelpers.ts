export const getContactTypeLabel = (value: any) => {
    switch (value) {
        case 1:
            return "Telephone"
        case 2:
            return "Email"
        case 99:
            return "Other"
        default:
            return "Other"
    }
}

export const getContactCategoryLabel = (value: any) => {
    switch (value) {
        case 1:
            return "Primary"
        case 2:
            return "Alternative"
        case 99:
            return "Other"
        default:
            return "Other"
    }
}

export const getAddressTypeLabel = (value: any) => {
    switch (value) {
        case 1:
            return "Mailing"
        case 2:
            return "Physical"
        case 3:
            return "Billing"
        case 99:
            return "Other"
        default:
            return "Other"
    }
}