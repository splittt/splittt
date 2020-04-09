import firebase from 'firebase'
const firebaseConfig  ={
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MSGSENDER,
    appId: process.env.REACT_APP_FIREBASE_CLIENTID
}
console.log(process.env)
firebase.initializeApp(firebaseConfig)
  

export default firebase