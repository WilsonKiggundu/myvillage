import {IDENTITY_CONFIG, METADATA_OIDC} from "../utils/authSettings";
import {UserManager, WebStorageStateStore, Log} from "oidc-client";
import {Urls} from "../routes/Urls";
import {User} from "oidc-client/dist/oidc-client";
import {ACCESS_TOKEN, get, handleResponse, makeUrl} from "../utils/ajax";
import {Endpoints} from "./Endpoints"
import {getUser} from "./User";
import * as superagent from "superagent";
import {OIDC_SESSION_KEY, PROFILE_SESSION_KEY} from "../data/constants";

export default class AuthService {
    private userManager: UserManager;

    constructor() {
        this.userManager = new UserManager({
            ...IDENTITY_CONFIG,
            userStore: new WebStorageStateStore({store: window.sessionStorage}),
            metadata: {
                ...METADATA_OIDC
            }
        });

        // Logger
        Log.logger = console;
        Log.level = Log.DEBUG;

        this.userManager.events.addUserLoaded((user) => {

            if (window.location.href.indexOf("callback") !== -1) {

                const {access_token} = user
                const url: string = makeUrl("Profiles", Endpoints.person.base)

                superagent.get(`${url}/${user.profile.sub}`)
                    .set('Authorization', `Bearer ${access_token}`)
                    .set('Accept', 'application/json')
                    .timeout(0)
                    .end(handleResponse((response) => {
                        if (response){
                            sessionStorage.setItem(PROFILE_SESSION_KEY, JSON.stringify(response))
                            window.location.replace(Urls.feed)
                        } else{
                            window.location.replace(Urls.profiles.create)
                        }
                    }))
            }
        });

        this.userManager.events.addSilentRenewError((e) => {
            console.log("silent renew error", e.message);
        });

        this.userManager.events.addAccessTokenExpired(() => {
            console.log("token expired");
            this.signinSilent();
        });

    }

    signinRedirectCallback = () => {
        return this.userManager.signinRedirectCallback();
    };

    public renewToken = async () => {
        return this.userManager.signinSilent()
    }

    parseJwt = (token: string) => {
        const base64Url = token.split(".")[1];
        if(base64Url) {
            const base64 = base64Url.replace("-", "+").replace("_", "/");
            return JSON.parse(window.atob(base64));
        } else {
            try {
                const parsedToken = JSON.parse(window.atob(token))
                return parsedToken
            }
            catch(error) {
                console.log(error.message)
                return token
            }
        }
    };


    public signinRedirect = () => {
        localStorage.setItem("redirectUri", window.location.pathname);
        this.userManager.signinRedirect({});
    };

    public signupRedirect = () => {
        window.location.replace(`${process.env.REACT_APP_AUTH_URL}/account/signup?returnUrl=${process.env.REACT_APP_SIGNUP_REDIRECT_URL}`)
    }

    public isAuthenticated = () => {
        const item = sessionStorage.getItem(OIDC_SESSION_KEY);

        if (item){
            const oidcStorage = JSON.parse(item)
            return (!!oidcStorage && !!oidcStorage.access_token)
        }

        return false
    };

    signinSilent = () => {
        this.userManager.signinSilent()
            .then((user) => {
                console.log("signed in", user);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    signinSilentCallback = () => {
        this.userManager.signinSilentCallback().then(r => {});
    };

    createSigninRequest = () => {
        return this.userManager.createSigninRequest();
    };

    logout = () => {
        this.userManager.signoutRedirect({
            id_token_hint: sessionStorage.getItem("id_token")
        })
        this.userManager.clearStaleState();
    };

    signoutRedirectCallback = () => {
        this.userManager.clearStaleState();
        this.userManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
            sessionStorage.clear();

            if(process.env.REACT_APP_PUBLIC_URL){
                window.location.replace(process.env.REACT_APP_PUBLIC_URL);
            }


            // navigate(process.env.REACT_APP_PUBLIC_URL)
        });
    };
}