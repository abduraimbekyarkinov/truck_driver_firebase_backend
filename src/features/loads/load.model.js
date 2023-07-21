const { firebaseDatabase } = require('../../modules/firebase');

class LoadModel {
  static async getAllLoads() {
    const ref = firebaseDatabase.ref('loads');
    const snapshot = await ref.get();
    const loads = snapshot.val();
    return loads;
  }
}

module.exports = LoadModel;
