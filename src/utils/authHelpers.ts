import userManager from "./userManager";

export const handleLogin = () => {
    return userManager.signinRedirect({state: window.location.pathname + window.location.search})
}

export const handleSignup = () => {
    const returnUrl = window.location.href + window.location.search
    window.location.replace(`${process.env.REACT_APP_AUTH_URL}/account/signup?returnUrl=${returnUrl}`)
}