import firebase from "firebase/app";
import 'firebase/messaging'

const MESSAGING_KEY = 'BGk4C4grZ38Yvf8MJ4ldBiqA7j9bLdtvF5sql-voDrvETtR03g_JOihTc6Jv9U-oXPdWHe6tRGh4HRcjPY1Bp6Y'

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDWzOVvKITMv4u0N4WCjNjg9G-vBU29xXI",
    authDomain: "myvillage-africa.firebaseapp.com",
    projectId: "myvillage-africa",
    storageBucket: "myvillage-africa.appspot.com",
    messagingSenderId: "740516600552",
    appId: "1:740516600552:web:8601a3846fb3c4673f075d",
    measurementId: "G-1BP8T7ML8C"
};

firebase.initializeApp(FIREBASE_CONFIG)

const messaging = firebase.messaging()

export const getToken = (setTokenFound) => {
    return messaging.getToken({vapidKey: MESSAGING_KEY}).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
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
