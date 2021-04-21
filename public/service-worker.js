self.addEventListener('push', event => {

    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    let payload = {};
    if (event.data) {
        payload = event.data.json();
    }

    const title = payload.title;
    const message = payload.message;
    const icon = payload.options.icon;

    event.waitUntil(
        clients.matchAll().then(cs => {
            if (cs.length === 0) {
                self.registration.showNotification(title, {
                    body: message,
                    icon: icon,
                    data: payload.data,
                    badge: icon,
                    image: icon,
                    requireInteraction: payload.requireInteraction,
                    actions: payload.options.actions
                })
            }else{
                cs[0].postMessage(payload)
            }
        })
    );
});

self.addEventListener('notificationclose', event => {
    console.log('notification closed', event)
})

self.addEventListener('notificationclick',  event => {
    const {data} = event.notification
    const {action} = event
    const {profileId, baseUrl} = data

    let url = baseUrl
    if (action === 'view-profile'){
        url = `${url}/profiles/people/${profileId}`
    }else{
        url = `${url}/feed`
    }

    clients.openWindow(url)

    self.registration.getNotifications()
        .then(ns => ns.forEach(n => n.close()))
});