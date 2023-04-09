process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const apps = getApps();

const app = apps.length
  ? apps[0]
  : initializeApp({
      projectId: 'demo-project',
    });

const db = getFirestore(app);

export { db };
