import {OIDC_SESSION_KEY, PROFILE_SESSION_KEY} from "../data/constants";
import {IPerson} from "../modules/profiles/people/IPerson";

export const getUser = () => {
    const item = sessionStorage.getItem(OIDC_SESSION_KEY);

    if (item){
        return JSON.parse(item)
    }

    return null
}

export const getProfile = () => {
    const profile = sessionStorage.getItem(PROFILE_SESSION_KEY);
    if (profile){
        return JSON.parse(profile)
    }
    return null
}