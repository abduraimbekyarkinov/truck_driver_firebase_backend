const { getAuth } = require('firebase-admin/auth');
const firebaseApp = require('./firebase.app');

const firebaseAuth = getAuth(firebaseApp);

module.exports = firebaseAuth;
