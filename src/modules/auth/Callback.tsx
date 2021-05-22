import React, {useState} from "react";
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
import {putPerson, updatePersonEmail} from "../profiles/people/redux/peopleEndpoints";
import UpdateCategoryForm from "../profiles/people/forms/profile/UpdateCategoryForm";
import XDialog from "../../components/dialogs/XDialog";

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
                    .end(handleResponse(async (person) => {
                        if (person) {

                            if (!person.email) {
                                await updatePersonEmail({
                                    id: person.id,
                                    email: user.profile.email
                                })
                            }

                            // history.push(Urls.profiles.create)

                            history.push(user.state ? user.state : Urls.feed)
                        } else {
                            history.push(Urls.profiles.create)
                        }
                    }))
            }}
            errorCallback={async error => {
                Toast.error(error.message)
                console.log(error.name)
                dispatch({
                    type: USER_SIGNED_OUT
                })
                await userManager.signinRedirect()
            }}
        >
            <PleaseWait label={"Please wait..."}/>
        </CallbackComponent>
    )
}

export default Callback