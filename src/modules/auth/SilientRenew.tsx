import React from "react";
import {AuthConsumer} from "./AuthProvider";
import {PleaseWait} from "../../components/PleaseWait";
import {processSilentRenew} from "redux-oidc"

export const SilentRenew = () => {
    processSilentRenew()
    return <PleaseWait/>
}
