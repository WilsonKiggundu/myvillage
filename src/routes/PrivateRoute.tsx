import React from "react";
import {Route, Redirect} from "react-router-dom"
import userManager from "../utils/userManager";
import {DefaultRootState, useSelector} from "react-redux";
import {Urls} from "./Urls";

// @ts-ignore
export const PrivateRoute = ({component: Component, ...children}) => {
    const {user} = useSelector((state: any) => state.oidc)
    const isAuthenticated = user != null

    console.log(user)

    return (
        <Route
            render={
            props => isAuthenticated ?
                <Component {...props} {...children} /> :
                userManager.signinRedirect()
        }/>
    )

}