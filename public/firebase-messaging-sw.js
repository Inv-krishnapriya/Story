// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);
importScripts("swenv.js");

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID;

const firebaseApp = firebase.initializeApp({
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
});

const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = payload?.data?.title;
//   const notificationOptions = {
//     body: payload?.data?.body,
//     icon: "/icon-192x192.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
;
self.addEventListener("notificationclick", function (event) {
  let notificationUrl = "/app/home/notification";
  event.waitUntil(clients.claim())
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then(function (clientList) {
        let client = null;

        for (let item of clientList) {
          if (item.url) {
            client = item;
            break;
          }
        }

        if (client && "navigate" in client) {
          client.focus();
          event.notification.close();
          return client.postMessage({
            action: 'redirect-from-notificationclick',
          })
        } else {
          event.notification.close();
          // if client doesn't have navigate function, try to open a new browser window
          return clients.openWindow(notificationUrl);
        }
      })
  );
});





self.addEventListener('push', (event) => {
  console.log("push recieved",event);
  let pushMessageJSON = event.data.json();
  
  console.log(pushMessageJSON);
  const notificationTitle = pushMessageJSON.data.title ?? "";
  const notificationOptions = {
    body: pushMessageJSON.data.body,
    icon: "/icon-192x192.png",
  };
        
  // Our server puts everything needed to show the notification
  // in our JSON data.
  event.waitUntil(
    self.registration.showNotification(notificationTitle,notificationOptions ));
})
