// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC5GGuLb7zimO73RnKUXjzSezHuy1ZkmIc',
  authDomain: '326208.firebaseapp.com',
  projectId: 'youtube-326208',
  storageBucket: 'youtube-326208.appspot.com',
  messagingSenderId: '314405247682',
  appId: '1:314405247682:web:ddbfd1a3e2c0ef8cea795b',
  measurementId: 'G-MW442KG1RR',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;
