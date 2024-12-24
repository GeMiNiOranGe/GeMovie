import { getApp, getApps, initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: 'AIzaSyA4qSw1h3egojXaljRVmQ_DwR4mAQRzA4o',
    authDomain: 'gemovie-5a890.firebaseapp.com',
    projectId: 'gemovie-5a890',
    storageBucket: 'gemovie-5a890.firebasestorage.app',
    messagingSenderId: '277480242107',
    appId: '1:277480242107:web:99b9c2d02eef0b888f629e',
    measurementId: 'G-G8K63RHV59',
};
const firebaseapp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(firebaseapp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(firebaseapp);

export { firebaseapp, auth, db };
