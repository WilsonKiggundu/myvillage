import React from "react";
import {Redirect, Route} from "react-router-dom"

const isAuthenticated = () => {
    return true
}

// @ts-ignore
const AuthRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? <Component {...props} /> : (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}
            />
        )
    )}/>
)

export default AuthRoute