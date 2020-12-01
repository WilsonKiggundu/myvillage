import {IOption} from "../components/inputs/inputHelpers";


export const Options = {
    GENDER: [
        { id: "male", name: 'Male' },
        { id: "female", name: 'Female' },
        { id: "other", name: 'Other' },
    ],
    USER_CATEGORIES: [
        {
            name: "Investor",
            id: "investor"
        },
        {
            name: "Student",
            id: "student"
        },
        {
            name: "Entrepreneur",
            id: "entrepreneur"
        }
    ] as IOption[]
}