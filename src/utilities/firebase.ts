import { FirebaseError } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';

import { ASYNC_TIMEOUT } from '../common';
import errorData from '../data/firebase-errors.json';

type ErrorData = Record<string, Record<string, string>>;

const db = getDatabase();

export function friendlyMessage(error: Error) {
  const matches = error.message.match(
    /Firebase:\s[a-zA-Z .]{1,}\((\w+\/[a-z-]{1,})\).?/
  );

  if (!matches || matches.length < 2)
    return 'Oops, something went wrong. Please try again later.';

  const [category, code] = matches[1].split('/');
  const message = (errorData as ErrorData)[category][code];

  return message;
}

export async function getCollection<T>(
  collection: string,
  callback?: (data: T) => void
): Promise<T> {
  let timeout: NodeJS.Timeout;
  return new Promise<T>((resolve, reject) => {
    const rejectReason = `Request '${collection}' timedout!`;
    timeout = setTimeout(() => reject(rejectReason), ASYNC_TIMEOUT);
    onValue(
      ref(db, collection),
      (snapshot) => {
        if (callback) callback(snapshot.val());
        resolve(snapshot.val());
      },
      { onlyOnce: false }
    );
  })
    .catch((error: FirebaseError) => {
      throw error;
    })
    .finally(() => clearTimeout(timeout));
}

export async function setCollection<T>(
  collection: string,
  payload: T,
  callback?: () => void
) {
  let timeout = setTimeout(() => {
    throw new Error('Request timedout!');
  }, ASYNC_TIMEOUT);

  const dbRef = ref(db, collection);
  await set(dbRef, payload)
    .then(() => {
      clearTimeout(timeout);
      if (callback) callback();
    })
    .catch((error) => {
      clearTimeout(timeout);
      throw error;
    });
}
