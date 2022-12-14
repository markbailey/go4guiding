require('dotenv').config();
// import functions from 'firebase-functions';
import admin from 'firebase-admin';

const DATABASE_URL =
  'https://go-for-guides-default-rtdb.europe-west1.firebasedatabase.app';

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL
  }),
  databaseURL: DATABASE_URL
});

export const ADMIN_UID = process.env.ADMIN_UID;
export const auth = admin.auth();
export const db = admin.database();

export async function getSnapshotValue<T>(path: string) {
  const ref = db.ref(path);
  let value: T | undefined;

  await ref.once('value', async (snapshot) => {
    value = snapshot.val();
  });

  return value;
}
