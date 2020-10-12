import React from "react";
import {AuthConsumer} from "../../modules/auth/AuthProvider";

export const Callback = () => (
    <AuthConsumer>
        {({signinRedirectCallback}) => {
            signinRedirectCallback()
            return <span>loading</span>
        }}
    </AuthConsumer>
)