// import firebase from "firebase/compat/app";
// import 'firebase/compat/storage';
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyCt2fjjstTmUIlvscZLBsc-2COvuQ_FC58",
    authDomain: "netflix-ef4d4.firebaseapp.com",
    projectId: "netflix-ef4d4",
    storageBucket: "netflix-ef4d4.appspot.com",
    messagingSenderId: "676761025154",
    appId: "1:676761025154:web:a795e6df6812386fbcd29b",
    measurementId: "G-NCQDZE7GJ9"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
// firebase.initializeApp(firebaseConfig);
// const firebaseStorage = firebase.storage();
export default storage;