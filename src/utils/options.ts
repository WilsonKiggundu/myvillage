import {IOption} from "../components/inputs/inputHelpers";


export const Options = {
    GENDER: [
        {id: "male", name: 'Male'},
        {id: "female", name: 'Female'}
    ],

    EVENT_TYPES: [
        {id: "event", name: "Event"},
        {id: "meeting", name: "Meeting"},
        {id: "conference", name: "Conference"}
    ],

    STARTUP_CATEGORIES: [
        {id: "1", name: "FinTech"},
        {id: "2", name: "EdTech"},
        {id: "3", name: "AgriTech"},
        {id: "99", name: "Other"},
    ],

    STARTUP_ROLES: [
        {id: "CEO", name: "Chief Executive Officer"},
        {id: "CTO", name: "Chief Technology Officer"},
        {id: "CFO", name: "Chief Finance Officer"},
        {id: "COO", name: "Chief Operations Officer"},
    ],

    CONTACT_TYPES: [
        {id: 1, name: "Telephone"},
        {id: 2, name: "Email"},
        {id: 99, name: "Other"},
    ],

    CONTACT_CATEGORIES: [
        {id: 1, name: "Primary"},
        {id: 2, name: "Alternative"},
        {id: 99, name: "Other"},
    ],

    ADDRESS_TYPES: [
        {id: 1, name: "Mailing"},
        {id: 2, name: "Physical"},
        {id: 3, name: "Billing"},
        {id: 99, name: "Other"},
    ],

    USER_INTERESTS: [
        {
            name: "Investment",
            id: 'investment'
        },
        {
            name: "Learning",
            id: 'learning'
        },
        {
            name: "Connections",
            id: 'connections'
        },
        {
            name: "Events",
            id: 'events'
        },

        {
            name: "Product Sales",
            id: 'sales'
        },
        {
            name: "Other",
            id: 'other'
        }
    ] as IOption[],

    USER_CATEGORIES: [
        {
            name: "Investor",
            id: 'investor'
        },
        {
            name: "Student",
            id: 'student'
        },
        {
            name: "Entrepreneur",
            id: 'entrepreneur'
        },
        {
            name: "Fresh Graduate",
            id: 'graduate'
        },
        {
            name: "Other",
            id: 'other'
        }
    ] as IOption[]
}