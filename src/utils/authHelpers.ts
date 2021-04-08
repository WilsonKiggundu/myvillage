import userManager from "./userManager";

export const handleLogin = () => {
    return userManager.signinRedirect({state: window.location.pathname + window.location.search})
}