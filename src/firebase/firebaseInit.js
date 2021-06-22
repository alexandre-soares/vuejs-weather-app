import firebase from "firebase/app"
import "firebase/firestore"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCrN2jH8_0y0K6pktKioKxuZK7eUGMtk44",
    authDomain: "vuejs-weather-app-7dab4.firebaseapp.com",
    projectId: "vuejs-weather-app-7dab4",
    storageBucket: "vuejs-weather-app-7dab4.appspot.com",
    messagingSenderId: "1050685940642",
    appId: "1:1050685940642:web:a526768fe427f6582ec8fb"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()