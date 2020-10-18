import firebase from 'firebase'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAnPhd_MxsgXmqq6ND8U156cJRtCbdNfng",
    authDomain: "movies-database-test.firebaseapp.com",
    databaseURL: "https://movies-database-test.firebaseio.com",
    projectId: "movies-database-test",
    storageBucket: "movies-database-test.appspot.com",
    messagingSenderId: "395556057122",
    appId: "1:395556057122:web:2516ab22700f0e1ceb5a7b",
    measurementId: "G-7718CB46SZ"
};

export const app = firebase.initializeApp(firebaseConfig);
export const firebaseStorage = app.storage();