import firebase from "firebase/app";
import 'firebase/messaging'
import {makeUrl, postWithoutLogin} from "./utils/ajax";
import {Endpoints} from "./services/Endpoints";

const firebaseConfig = {
    apiKey: "AIzaSyDWzOVvKITMv4u0N4WCjNjg9G-vBU29xXI",
    authDomain: "myvillage-africa.firebaseapp.com",
    projectId: "myvillage-africa",
    storageBucket: "myvillage-africa.appspot.com",
    messagingSenderId: "740516600552",
    appId: "1:740516600552:web:8601a3846fb3c4673f075d",
    measurementId: "G-1BP8T7ML8C"
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

export const getToken = (setTokenFound, profileId) => {
    return messaging.getToken({vapidKey: 'BGk4C4grZ38Yvf8MJ4ldBiqA7j9bLdtvF5sql-voDrvETtR03g_JOihTc6Jv9U-oXPdWHe6tRGh4HRcjPY1Bp6Y'}).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server

            const url = makeUrl("Profiles", Endpoints.devices.create)
            postWithoutLogin(url, {profileId, token: currentToken})

            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });