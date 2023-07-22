const { getStorage } = require('firebase-admin/storage');
const firebaseApp = require('./firebase.app');

const firebaseStorage = getStorage(firebaseApp);

module.exports = firebaseStorage;
