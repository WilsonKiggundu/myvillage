import {base64Encode, urlB64ToUint8Array} from "./notifications";
import {getAsync} from "../ajax";
import {Urls} from "../../routes/Urls";

let isSubscribed = false;

const initializeState = reg => {

    // Are Notifications supported in the service worker?
    if (!(reg.showNotification)) {
        console.warn('[initialiseState] Notifications aren\'t supported on service workers.');
        return Promise.reject();
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
        console.warn('[initialiseState] Push messaging isn\'t supported.');
        return Promise.reject();
    }

    // We need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function (reg) {
        // Do we already have a push message subscription?
        reg.pushManager.getSubscription()
            .then(function (subscription) {
                isSubscribed = subscription;
                if (isSubscribed) {
                    console.info('User is already subscribed to push notifications');
                } else {
                    console.info('User is not yet subscribed to push notifications');
                }
            })
            .catch(function (err) {
                console.error('[req.pushManager.getSubscription] Unable to get subscription details.', err);
            });
    });
}

export const subscribe = () => {
    navigator.serviceWorker.ready.then(async (reg) => {
        const subscribeParams = { userVisibleOnly: true };

        //Setting the public key of our VAPID key pair.

        // get applicationServerPublic key
        const key = await getAsync(Urls.devices.publicKey)

        const applicationServerKey = urlB64ToUint8Array("applicationServerPublicKey");
        subscribeParams.applicationServerKey = applicationServerKey;

        reg.pushManager.subscribe(subscribeParams)
            .then(function (subscription) {
                isSubscribed = true;

                const p256dh = base64Encode(subscription.getKey('p256dh'));
                const auth = base64Encode(subscription.getKey('auth'));

                // console.log(subscription);

            })
            .catch(function (e) {
                console.warn('[subscribe] Unable to subscribe to push', e);
            });
    });
}