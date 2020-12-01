
export const getUser = () => {
    const key : string = `oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_CLIENT_ID}`
    const item = sessionStorage.getItem(key);

    if (item){
        return JSON.parse(item)
    }
};