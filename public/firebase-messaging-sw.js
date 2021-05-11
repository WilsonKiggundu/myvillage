// Scripts for firebase and firebase messaging

importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

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

if(firebase.messaging.isSupported()){

    const messaging = firebase.messaging()

    messaging.onBackgroundMessage(function (payload) {

        const data = JSON.parse(payload.data['gcm.notification.data'])
        const date = payload.data['gcm.notification.date']
        const options = JSON.parse(payload.data['gcm.notification.options'])
        const requireInteraction = payload.data['gcm.notification.requireInteraction']
        const notification = payload.notification

        const notificationOptions = {
            actions: options.actions,
            body: notification.body,
            data: data,
            dir: 'auto',
            icon: options.icon,
            image: options.icon,
            requireInteraction: requireInteraction,
            tag: options.tag
        }

        self.registration.showNotification(notification.title, notificationOptions);

    });

    self.addEventListener('notificationclick', event => {
        if (event.action === 'view-profile'){
            const {profileId, baseUrl} = event.notification.data
            console.log(event)
            clients.openWindow(`/profiles/people/${profileId}`)
        }else if(event.action === 'close')
        {

        }

        self.registration.getNotifications()
            .then(ns => ns.forEach(n => n.close()))
    })
}

