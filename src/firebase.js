import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_AP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_AP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_AP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_AP_FIREBASE_STORAGE_BUCKET,
    storageBucket: process.env.REACT_AP_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.REACT_AP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_AP_APP_APP_ID,
    measurementId: process.env.REACT_AP_MEASUREMENT_ID
})



export const auth = app.auth()
export default app

