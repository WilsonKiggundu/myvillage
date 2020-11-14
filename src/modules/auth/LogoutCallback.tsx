import React from "react";
import {AuthConsumer} from "./AuthProvider";
import {PleaseWait} from "../../components/PleaseWait";

export const LogoutCallback = () => (
    <AuthConsumer>
        {({ signinRedirectCallback }) => {
            signinRedirectCallback();
            return <PleaseWait />
        }}
    </AuthConsumer>
)