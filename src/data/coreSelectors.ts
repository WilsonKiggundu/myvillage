import {User} from "oidc-client";

export const userSelector = (state: any): User => state.oidc.user



