const { initializeApp, cert } = require('firebase-admin/app');
const config = require('../config');

const firebaseApp =
  global.firebaseApp ??
  initializeApp({
    credential: cert({
      projectId: config.FIREBASE_PROJECT_ID,
      clientEmail: config.FIREBASE_CLIENT_EMAIL,
      // replace `\` and `n` character pairs w/ single `\n` character
      privateKey: config.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: config.FIREBASE_DATABASE_URL,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
  });

global.firebaseApp = firebaseApp;

module.exports = firebaseApp;
