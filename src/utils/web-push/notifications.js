import {getWithoutLoginAsync, makeUrl, postWithoutLoginAsync} from "../ajax";
import {Endpoints} from "../../services/Endpoints";
import {checkBrowser} from "./browser";
import Toast from "../Toast";

const serviceWorker = '/service-worker.js';
let isSubscribed = false;

const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const base64Encode = (arrayBuffer) => {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
}

const handleSWRegistration = (reg) => {
    if (reg.installing) {
        console.log('Service worker installing');
    } else if (reg.waiting) {
        console.log('Service worker installed');
    } else if (reg.active) {
        console.log('Service worker active');
    }

    initialiseState(reg)
}

// Once the service worker is registered set the initial state
const initialiseState = (reg) => {
    // Are Notifications supported in the service worker?
    if (!(reg.showNotification)) {
        console.log('[initialiseState] Notifications aren\'t supported on service workers.');
        return;
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
        console.log('[initialiseState] Push messaging isn\'t supported.');
        return;
    }

    // We need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function (reg) {
        // Do we already have a push message subscription?
        reg.pushManager.getSubscription()
            .then(function (subscription) {
                isSubscribed = subscription;
                if (isSubscribed) {
                    console.log('User is already subscribed to push notifications');
                } else {
                    console.log('User is not yet subscribed to push notifications');
                }
            })
            .catch(function (err) {
                console.log('[req.pushManager.getSubscription] Unable to get subscription details.', err);
            })

        navigator.serviceWorker.addEventListener('message', event => notifyInApp(event.data))
    })
}

const notifyInApp = (data) => {
    const message = `${data.title}`
    Toast.info(message, "bottom-left")
}

export const initialiseServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(serviceWorker).then(handleSWRegistration);
    } else {
        console.warn('[initialiseServiceWorker] Service workers are not supported in this browser.');
    }
}

export const subscribe = (userId) => {

    navigator.serviceWorker.ready.then(async registration => {

        const browser = checkBrowser()

        if (browser === 'chrome') {

            registration.pushManager.getSubscription()
                .then(async subscription => {
                    if (subscription) return

                    // get the public key
                    const url = makeUrl("Profiles", Endpoints.devices.publicKey)
                    const {body} = await getWithoutLoginAsync(url)

                    const subscribeParams = {userVisibleOnly: true}
                    subscribeParams.applicationServerKey = urlB64ToUint8Array(body)

                    registration.pushManager.subscribe(subscribeParams)
                        .then(async subscription => {
                            const p256dh = base64Encode(subscription.getKey('p256dh'));
                            const auth = base64Encode(subscription.getKey('auth'));
                            const endpoint = subscription.endpoint

                            const url = makeUrl("Profiles", Endpoints.devices.create)
                            const device = {
                                name: userId,
                                pushEndpoint: endpoint,
                                pushP256DH: p256dh,
                                pushAuth: auth,
                                isOnline: true
                            }

                            postWithoutLoginAsync(url, device)
                                .then(response => {
                                    console.info(response)
                                })
                                .catch(error => console.error(error.toString()))
                        })
                })
        }
    })
}