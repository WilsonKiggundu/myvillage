import React from "react";
import {PleaseWait} from "../../components/PleaseWait";
import {SignoutCallbackComponent} from "redux-oidc"
import {useDispatch} from "react-redux";
import userManager from "../../utils/userManager";
import {push} from "react-router-redux";
import {Urls} from "../../routes/Urls";
import Toast from "../../utils/Toast";

export const LogoutCallback = () => {
    const dispatch = useDispatch()

    return (
        <SignoutCallbackComponent
            userManager={userManager}
            successCallback={() => {
                dispatch(push(Urls.home))
            }}
            errorCallback={error => {
                Toast.error(error.message)
            }}
        >
            <PleaseWait/>
        </SignoutCallbackComponent>
    )
}