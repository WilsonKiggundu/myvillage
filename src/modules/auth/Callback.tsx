import React from "react";
import {PleaseWait} from "../../components/PleaseWait";
import {CallbackComponent, USER_SIGNED_OUT} from "redux-oidc";
import userManager from "../../utils/userManager";
import {Urls} from "../../routes/Urls";
import Toast from "../../utils/Toast";
import {handleResponse, makeUrl} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import * as superagent from "superagent";
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux";

const Callback = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <CallbackComponent
            userManager={userManager}
            successCallback={(user) => {

                const {access_token} = user
                const url: string = makeUrl("Profiles", Endpoints.person.base)

                superagent.get(`${url}/${user.profile.sub}`)
                    .set('Authorization', `Bearer ${access_token}`)
                    .set('Accept', 'application/json')
                    .timeout(0)
                    .end(handleResponse((response) => {
                        if (response) {
                            history.push(Urls.feed)
                        } else {
                            history.push(Urls.profiles.create)
                        }
                    }))
            }}
            errorCallback={async error => {
                Toast.error(error.message)
                // dispatch({
                //     type: USER_SIGNED_OUT
                // })
                // await userManager.signoutRedirect()
            }}
        >
            <PleaseWait/>
        </CallbackComponent>
    )
}

export default Callback