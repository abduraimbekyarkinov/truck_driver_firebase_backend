const { getStorage } = require('firebase-admin/storage');
const firebaseApp = require('./firebase.app');

const firebaseStorage = getStorage(firebaseApp);
const bucket = firebaseStorage.bucket();

module.exports = {
  firebaseStorage,
  bucket,
};
