const { getDatabase } = require('firebase-admin/database');
const firebaseApp = require('./firebase.app');

const firebaseDatabase = getDatabase(firebaseApp);

module.exports = firebaseDatabase;
