import React from "react";
import {AuthConsumer} from "./AuthProvider";
import {PleaseWait} from "../../components/PleaseWait";
import {get, makeUrl} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import {Urls} from "../../routes/Urls";
import {getUser} from "../../services/User";
import {User} from "oidc-client/dist/oidc-client";

export const Callback = () => (
    <AuthConsumer>
        {({ signinRedirectCallback }) => {
            signinRedirectCallback();
            return <PleaseWait />
        }}
    </AuthConsumer>
)