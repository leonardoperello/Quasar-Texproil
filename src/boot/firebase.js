// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDJeooyG4ewHhuJwHuZmSwpg76Q2p9QeJE',
  authDomain: 'quasar-texproil.firebaseapp.com',
  projectId: 'quasar-texproil',
  storageBucket: 'quasar-texproil.appspot.com',
  messagingSenderId: '14008918945',
  appId: '1:14008918945:web:9c84d45e2f02fe912621e0'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = app

export { auth }

export default ({ urlPath, redirect }) => {
  // ...
  const isAuthorized = getAuth()
  if (!isAuthorized && !urlPath.startsWith('/login')) {
    redirect({ path: '/login' })
    return
  }
  // ...
}
