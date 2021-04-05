self.addEventListener('push', event => {

    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    let data = {};
    if (event.data) {
        data = event.data.json();

        // console.log(data)

    }

    const title = data.title;
    const message = data.message;
    const icon = data.options.icon;

    const showNotification =
        self.registration.showNotification(title, {
            body: message,
            icon: icon,
            badge: icon,
            image: icon,
            requireInteraction: data.requireInteraction,
            actions: data.options.actions
        })

    event.waitUntil(showNotification);
});

self.addEventListener('notificationclose', event => {
    console.log('notification closed', event)
})

self.addEventListener('notificationclick',  event => {
    console.log('notification clicked', event)
});