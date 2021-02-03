import React from "react";
import {PleaseWait} from "../../components/PleaseWait";
import {useDispatch} from "react-redux";
import {SignoutCallbackComponent} from "redux-oidc";
import userManager from "../../utils/userManager";
import {push} from "react-router-redux";
import {Urls} from "../../routes/Urls";
import Toast from "../../utils/Toast";
import ErrorPage from "../exceptions/Error";

export const Logout = () =>
    {
        const dispatch = useDispatch()

        return (
            <SignoutCallbackComponent
                userManager={userManager}
                successCallback={() => {
                    dispatch(push(Urls.home))
                }}
                errorCallback={error => {
                    Toast.error(error.message)
                    return <ErrorPage title={"Logout failed"} message={error.message} />
                }}
            >
                <PleaseWait/>
            </SignoutCallbackComponent>
        )
    }
