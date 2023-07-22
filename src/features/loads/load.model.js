const firebaseDatabase = require('../../common/firebase.database');

class LoadModel {
  static async getAllLoads() {
    const ref = firebaseDatabase.ref('loads');
    const snapshot = await ref.get();
    const loads = snapshot.val();
    return loads;
  }
}

module.exports = LoadModel;
