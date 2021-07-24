import {IOption} from "../components/inputs/inputHelpers";


export const Options = {
    GENDER: [
        {id: "male", name: 'Male'},
        {id: "female", name: 'Female'}
    ],

    EMAIL_TYPES: [
        {id: 1, name: "Welcome"},
        {id: 2, name: "Update Profile"},
        {id: 3, name: "Job Posted"},
        {id: 4, name: "Job Application"},
        {id: 5, name: "Event Added"},
        {id: 6, name: "Event Attendance"},
        {id: 7, name: "Profile Connection"},
        {id: 8, name: "Profile Creation"}
    ],

    EVENT_TYPES: [
        {id: "physical", name: "Physical Event"},
        {id: "webinar", name: "Webinar"}
    ],

    EVENT_LOCATIONS: [
        {id: "zoom", name: "On Zoom"}
    ],

    REGIONS: [
        {id: "central", name: "Central"},
        {id: "northern", name: "Northern"},
        {id: "eastern", name: "Eastern"},
        {id: "western", name: "Western"}
    ],

    IMPLEMENTING_PARTNERS: [
        {id: "Tukole", name: "Tukole"},
        {id: "Kitchen Station", name: "Kitchen Station"},
        {id: "MoTIV", name: "MoTIV"}
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