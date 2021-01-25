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


export const redux = {
    doLogin: 'DO_LOGIN',
    doLogout: 'DO_LOGOUT',
    doSearch: 'DO_SEARCH',
};

export const USER_EXPIRED = 'redux-oidc/USER_EXPIRED';
export const SILENT_RENEW_ERROR = 'redux-oidc/SILENT_RENEW_ERROR';
export const SESSION_TERMINATED = 'redux-oidc/SESSION_TERMINATED';
export const USER_EXPIRING = 'redux-oidc/USER_EXPIRING';
export const USER_FOUND = 'redux-oidc/USER_FOUND';
export const LOADING_USER = 'redux-oidc/LOADING_USER';
export const USER_SIGNED_OUT = 'redux-oidc/USER_SIGNED_OUT';
export const LOAD_USER_ERROR = 'redux-oidc/LOAD_USER_ERROR';

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

export const appBaseUrl = debug ? 'http://localhost:3000/' : 'https://myvillage.app/'

export const remoteRoutes = {
    profile: profileService + '/api/auth/profile',
}