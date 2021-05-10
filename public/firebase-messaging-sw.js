// Scripts for firebase and firebase messaging

importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

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

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});