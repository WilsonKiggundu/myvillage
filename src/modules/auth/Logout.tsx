import React from "react";
import {AuthConsumer} from "./AuthProvider";
import {PleaseWait} from "../../components/PleaseWait";

export const Logout = () => (
    <AuthConsumer>
        {({ logout }) => {
            logout();
            return <PleaseWait />
        }}
    </AuthConsumer>
)