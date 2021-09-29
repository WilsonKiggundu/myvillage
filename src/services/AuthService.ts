import {IDENTITY_CONFIG, METADATA_OIDC} from "../utils/authSettings";
import {Log, UserManager, WebStorageStateStore} from "oidc-client";
import {Urls} from "../routes/Urls";
import {handleResponse, makeUrl} from "../utils/ajax";
import {Endpoints} from "./Endpoints"
import * as superagent from "superagent";
import {OIDC_SESSION_KEY, PROFILE_SESSION_KEY} from "../data/constants";
import {User} from "oidc-client/dist/oidc-client";

export default class AuthService {
    private userManager: UserManager;

    constructor() {
        this.userManager = new UserManager({
            ...IDENTITY_CONFIG,
            userStore: new WebStorageStateStore({store: window.localStorage})
        });

        // Logger
        Log.logger = console;
        Log.level = Log.DEBUG;

        this.userManager.events.addUserLoaded((user) => {

            Log.info(window.location.hash)

            // if (window.location.href.indexOf("callback") !== -1) {
            //     this.fetchUserProfile(user)
            // }else{
            //     this.logout()
            // }
        });

        this.userManager.events.addSilentRenewError((e) => {
            console.log("silent renew error", e.message);
        });

        this.userManager.events.addAccessTokenExpired(() => {
            console.log("token expired");
            this.signinSilent();
        });

        // this.userManager.signinRedirectCallback().then(() => {
        //     Log.info(window.location.hash)
        // }).catch(error => {})

        // this.userManager.getUser().then(user => {
        //     if(user) Log.info(user)
        //     else {
        //         this.userManager.signinSilent()
        //             .then(newUser => {
        //                 Log.info(newUser)
        //             }).catch(error => {
        //                 Log.error(error.toString() + " Here")
        //         })
        //     }
        // }).catch(error => Log.error(error.toString()))

    }

    fetchUserProfile = (user: User) => {
        const {access_token} = user
        const url: string = makeUrl("Profiles", Endpoints.person.base)

        superagent.get(`${url}/${user.profile.sub}`)
            .set('Authorization', `Bearer ${access_token}`)
            .set('Accept', 'application/json')
            .timeout(0)
            .end(handleResponse((response) => {
                if (response) {
                    localStorage.setItem(PROFILE_SESSION_KEY, JSON.stringify(response))
                    window.location.replace(Urls.feed)
                } else {
                    window.location.replace(Urls.profiles.create)
                }
            }))
    }

    signinRedirectCallback = async () => {
        const user: User | null = await this.userManager.getUser();

        if (user){
            if (user.state){
                return this.userManager.signinRedirectCallback();
            }else{
                this.fetchUserProfile(user);
            }
        }else{
            await this.userManager.getUser()
        }
    };

    public renewToken = async () => {
        return this.userManager.signinSilent()
    }

    parseJwt = (token: string) => {
        const base64Url = token.split(".")[1];
        if (base64Url) {
            const base64 = base64Url.replace("-", "+").replace("_", "/");
            return JSON.parse(window.atob(base64));
        } else {
            try {
                const parsedToken = JSON.parse(window.atob(token))
                return parsedToken
            } catch (error: any) {
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
        const item = localStorage.getItem(OIDC_SESSION_KEY);

        if (item) {
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
        this.userManager.signinSilentCallback().then(r => {
        });
    };

    createSigninRequest = () => {
        return this.userManager.createSigninRequest();
    };

    logout = () => {
        this.userManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        })
        this.userManager.clearStaleState();
    };

    signoutRedirectCallback = () => {
        this.userManager.clearStaleState();
        this.userManager.signoutRedirectCallback().then(() => {
            localStorage.clear();

            if (process.env.REACT_APP_PUBLIC_URL) {
                window.location.replace(process.env.REACT_APP_PUBLIC_URL);
            }


            // navigate(process.env.REACT_APP_PUBLIC_URL)
        });
    };
}
