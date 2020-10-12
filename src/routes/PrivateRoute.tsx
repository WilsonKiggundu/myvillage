import React from "react";
import {Route} from "react-router-dom"
import {AuthConsumer} from "../modules/auth/AuthProvider";

// @ts-ignore
export const PrivateRoute = ({component, ...rest }) => {
    const renderFn = (Component: any) => (props: any) => (
        <AuthConsumer>
            {({ isAuthenticated, signinRedirect}) => {
                if(!!Component && isAuthenticated()){
                    return <Component {...props}/>
                } else{
                    signinRedirect()
                    return <span>loading</span>
                }
            }}
        </AuthConsumer>
    );

    return <Route {...rest} render={renderFn(component)}/>
}