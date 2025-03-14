/* eslint-disable no-restricted-globals */

self.addEventListener("push", (event) => {
    const data = event.data.text();
    self.registration.showNotification("Health Reminder", {
        body: data,
        icon: "/logo192.png",
    });
});

/* eslint-enable no-restricted-globals */
