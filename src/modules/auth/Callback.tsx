import React from "react";
import {AuthConsumer} from "./AuthProvider";
import {PleaseWait} from "../../components/PleaseWait";

export const Callback = () => (
    <AuthConsumer>
        {({ signinRedirectCallback }) => {
            signinRedirectCallback();
            return <PleaseWait />
        }}
    </AuthConsumer>
)