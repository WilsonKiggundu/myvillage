import {IDENTITY_CONFIG, METADATA_OIDC} from "../utils/authSettings";
import {UserManager, WebStorageStateStore, Log} from "oidc-client";
import {Urls} from "../routes/Urls";
import {User} from "oidc-client/dist/oidc-client";

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
                window.location.replace(Urls.feed)
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
        this.userManager.signinRedirectCallback().then((user: User) => {
            window.location.assign(Urls.feed)
        }).catch(error => console.log(error));
    };

    getUser = () => {
        const key : string = `oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_CLIENT_ID}`
        const item = sessionStorage.getItem(key);

        if (item){
            return JSON.parse(item)
        }
    };

    public renewToken = async () => {
        return this.userManager.signinSilent()
    }

    parseJwt = (token: string) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };


    public signinRedirect = async () => {
        localStorage.setItem("redirectUri", window.location.pathname);
        await this.userManager.signinRedirect({});
    };

    public signupRedirect = () => {
        window.location.replace(`${process.env.REACT_APP_AUTH_URL}/account/signup?returnUrl=${process.env.REACT_APP_REDIRECT_URL}`)
    }

    public isAuthenticated = () => {
        const key : string = `oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_CLIENT_ID}`
        const item = sessionStorage.getItem(key);

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
        }).then(r => {
            const publicUrl = process.env.REACT_APP_PUBLIC_URL
            if (publicUrl){
                window.location.replace(publicUrl);
            }
        });
        this.userManager.clearStaleState().then(r => {});
    };
}