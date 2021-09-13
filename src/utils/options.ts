import {IOption} from "../components/inputs/inputHelpers";


export const Options = {
    GENDER: [
        {id: "male", name: 'Male'},
        {id: "female", name: 'Female'}
    ],

    YES_NO: [
        {id: "yes", name: "Yes"},
        {id: "no", name: "No"},
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
        {id: "webinar", name: "Webinar"},
        {id: "meeting", name: "Meeting"}
    ],

    EVENT_CATEGORIES: [
        {id: "training", name: "Curriculum based training"},
        {id: "knowledge_and_skills", name: "Knowledge and skills Transfer"},
        {id: "knowledge", name: "Knowledge transfer"},
    ],

    EVENT_SECTORS: [
        {id: "Electricals", name: "Electricals"},
        {id: "Entertainment sector", name: "Entertainment sector"},
        {id: "Environmental conservation", name: "Environmental conservation"},
        {id: "General Merchandising ( shop)", name: "General Merchandising ( shop)"},
        {id: "Hotel and Tourism management", name: "Hotel and Tourism management"},
        {id: "Industrial equipments and inputs", name: "Industrial equipments and inputs"},
        {id: "Information Technology", name: "Information Technology"},
        {id: "Marketing", name: "Marketing"},
        {id: "Manufacturing", name: "Manufacturing"},
        {id: "Metal Fabrication", name: "Metal Fabrication"},
        {id: "Mining and Quarrying", name: "Mining and Quarrying"},
        {id: "Mining sector", name: "Mining sector"},
        {id: "Textile", name: "Textile"},
        {id: "Trade", name: "Trade"},
        {id: "Transport services", name: "Transport services"},
        {id: "Woodwork", name: "Woodwork"}
    ],

    EVENT_OBJECTIVE: [
        {id: 'skilling', name: 'Skilling'},
        {id: 'linkage', name: 'Job Linkage'},
        {id: 'job', name: 'Job Creation'},
        {id: 'reach', name: 'Reach'},
        {id: 'other', name: 'Other'},
    ],

    EVENT_LOCATIONS: [
        {id: "zoom", name: "On Zoom"},
        {id: "physical", name: "Physical Event"},
        {id: "hybrid", name: "Hybrid"}
    ],

    EVENT_ORGANIZER: [
        {id: "tiv", name: "The Innovation Village"},
        {id: "other", name: "Other"}
    ],

    REGIONS: [
        {id: "01", name: "Central"},
        {id: "03", name: "Northern"},
        {id: "02", name: "Eastern"},
        {id: "04", name: "Western"}
    ],

    IMPLEMENTING_PARTNERS: [
        {id: "02", name: "Upskill"},
        {id: "01", name: "Community"},
        {id: "03", name: "Tukole"},
        {id: "21", name: "Future Lab"},
        {id: "18", name: "Rego Foundation"},
        {id: "07", name: "MoTIV Tribe"},
        {id: "04", name: "MoTIV Factory"},
        {id: "13", name: "Hive Colab Mbarara"},
        {id: "05", name: "MoTIV MarketPlace"},
        {id: "06", name: "MoTIV Media"},
        {id: "08", name: "97 Fund-Roundbob"},
        {id: "10", name: "AFCE"},
        {id: "11", name: "Ghetto Research Lab - Kamwokya"},
        {id: "12", name: "Gulu University"},
        {id: "15", name: "Kampala Angel Investment Network"},
        // {id: "MoTIV", name: "IAAS"},
        {id: "20", name: "Zimba Women"},
        {id: "other", name: "Other"},
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
