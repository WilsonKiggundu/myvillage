import React from "react";
import {AuthConsumer} from "./AuthProvider";
import {PleaseWait} from "../../components/PleaseWait";

export const SilentRenew = () => (
    <AuthConsumer>
        {({ signinSilentCallback }) => {
            signinSilentCallback();
            return <PleaseWait />
        }}
    </AuthConsumer>
)