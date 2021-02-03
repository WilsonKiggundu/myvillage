import {OIDC_SESSION_KEY, PROFILE_SESSION_KEY} from "../data/constants";
import {User} from "oidc-client";
import {useSelector} from "react-redux";
import store from "../data/store";

export const getUser = () => {
    const state = store
    return state
}

export const getProfile = () => {
    const profile = localStorage.getItem(PROFILE_SESSION_KEY);
    if (profile) {
        return JSON.parse(profile)
    }
    return null
}