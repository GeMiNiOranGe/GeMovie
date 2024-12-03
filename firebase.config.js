import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {
    FIREBASE_API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID,
} from '@config';

const firebaseConfig = {
    apiKey: `${FIREBASE_API_KEY}`,
    authDomain: `${AUTH_DOMAIN}`,
    projectId: `${PROJECT_ID}`,
    storageBucket: `${STORAGE_BUCKET}`,
    messagingSenderId: `${MESSAGING_SENDER_ID}`,
    appId: `${APP_ID}`,
    measurementId: `${MEASUREMENT_ID}`,
};

const firebaseapp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseapp);
export { firebaseapp, database };
