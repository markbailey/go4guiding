import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth } from 'firebase/auth';
import {
  DataSnapshot,
  getDatabase,
  ListenOptions,
  onValue,
  ref,
  set
} from 'firebase/database';
import { ASYNC_TIMEOUT } from '../../common';

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID,
  authDomain: 'go-for-guides.firebaseapp.com',
  databaseURL: 'https://go4guiding.europe-west1.firebasedatabase.app',
  projectId: 'go-for-guides',
  storageBucket: 'go-for-guides.appspot.com',
  messagingSenderId: '540803659562'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lflwe4eAAAAAJldMya4z-IoFWGR9HWUO8jJvec-'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

// Request to get a collection from Firebase DB then fire a callback
// passing in the returned value
export const onRead = (
  collection: string,
  callback: (snapshort: DataSnapshot) => void,
  options: ListenOptions = { onlyOnce: false }
) => onValue(ref(db, collection), callback, options);

// Request to get a collection from the Firebase DB and return the value
export async function getCollection<T>(
  collection: string,
  onlyOnce: boolean = false
): Promise<T> {
  let timeout: NodeJS.Timeout;
  return new Promise<T>((resolve, reject) => {
    timeout = setTimeout(() => reject('Request timed out!'), ASYNC_TIMEOUT);
    onRead(collection, (snapshot) => resolve(snapshot.val()), { onlyOnce });
  }).finally(() => clearTimeout(timeout));
}

// Update a collection in the Firebase DB
export async function setCollection<T>(collection: string, payload: T) {
  let timeout = setTimeout(() => {
    throw new Error('Request timed out!');
  }, ASYNC_TIMEOUT);

  const dbRef = ref(db, collection);
  await set(dbRef, payload).finally(() => clearTimeout(timeout));
}
