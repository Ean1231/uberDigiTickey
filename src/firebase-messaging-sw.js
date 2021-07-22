importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

firebase.initializeApp({

'messageingSenderId': 'YOUR-SENDER-ID',

   apiKey: "AIzaSyBx-CK4_MU05ol5W_yBqschG0VmeUuS-js",
    authDomain: "uberapp-a261c.firebaseapp.com",
    projectId: "uberapp-a261c",
    storageBucket: "uberapp-a261c.appspot.com",
    messagingSenderId: "242566932494",
    appId: "1:242566932494:web:43bfb282aca90d3b6d345f",
    measurementId: "G-ZBN1X8FKY8"
});

const messaging = firebase.messaging();
