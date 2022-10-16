import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth } from 'firebase/auth';

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
  databaseURL:
    'https://go-for-guides-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'go-for-guides',
  storageBucket: 'go-for-guides.appspot.com',
  messagingSenderId: '540803659562'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lflwe4eAAAAAJldMya4z-IoFWGR9HWUO8jJvec-'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});
