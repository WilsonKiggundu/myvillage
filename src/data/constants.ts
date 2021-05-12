export const AUTH_TOKEN_KEY = '__demo__eva__token'
export const AUTH_USER_KEY = '__demo__eva__user'

export const PROFILE_SESSION_KEY = `oidc.profile:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_CLIENT_ID}`
export const OIDC_SESSION_KEY = `oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_CLIENT_ID}`

export const appRoles = {
    roleCrmView: "CRM_VIEW",
    roleCrmEdit: "CRM_EDIT",

    roleAuthUserView: "AUTH_USER_VIEW",
    roleAuthUserEdit: "AUTH_USER_EDIT",

    roleAuthGroupView: "AUTH_GROUP_VIEW",
    roleAuthGroupEdit: "AUTH_GROUP_EDIT",

    roleTagView: "AUTH_TAG_VIEW",
    roleTagEdit: "AUTH_TAG_EDIT",

    roleGroupView: "GROUP_VIEW",
    roleGroupEdit: "GROUP_EDIT",
}

export const EmailSettings = {
    senderName: process.env.REACT_APP_SENDER_NAME,
    senderEmail: process.env.REACT_APP_SENDER_EMAIL,
}


export const redux = {
    doLogin: 'DO_LOGIN',
    doLogout: 'DO_LOGOUT',
    doSearch: 'DO_SEARCH',
};

export const USER_EXPIRED = 'redux-oidc/USER_EXPIRED';

export const localRoutes = {
    dashboard: '/dashboard',
    contacts: '/people/contacts',
    contactsDetails: '/people/contacts/:contactId',
    groups: '/people/groups',
    help: '/help'
}

const debug = process.env.NODE_ENV !== 'production'

export const profileService = debug ?
    'http://localhost:4002' :
    'https://profiles.innovationvillage.co.ug'

export const authService = debug ?
    'https://accounts-test.innovationvillage.co.ug' :
    'https://accounts.innovationvillage.co.ug'

export const months = [
    {
        id: 'Jan',
        name: 'January'
    },
    {
        id: 'Feb',
        name: 'February'
    },
    {
        id: 'Mar',
        name: 'March'
    },
    {
        id: 'Apr',
        name: 'April'
    },
    {
        id: 'May',
        name: 'May'
    },
    {
        id: 'Jun',
        name: 'June'
    },
    {
        id: 'Jul',
        name: 'July'
    },
    {
        id: 'Aug',
        name: 'August'
    },
    {
        id: 'Sep',
        name: 'September'
    },
    {
        id: 'Oct',
        name: 'October'
    },
    {
        id: 'Nov',
        name: 'November'
    },
    {
        id: 'Dec',
        name: 'December'
    },
]

export const GA_TRACKING_ID = "UA-192556411-3"