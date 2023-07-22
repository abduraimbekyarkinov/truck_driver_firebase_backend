const firebaseDatabase = require('../../common/firebase.database');
const firebaseAuth = require('../../common/firebase.auth');

class DriverModel {
  constructor(
    uid,
    email,
    displayName,
    phoneNumber,
    photoURL,
    creationTime,
    lastSignInTime
  ) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName;
    this.phoneNumber = phoneNumber;
    this.photoURL = photoURL;
    this.creationTime = creationTime;
    this.lastSignInTime = lastSignInTime;
  }

  static fromJson(json) {
    return new DriverModel(
      json.uid,
      json.email,
      json.displayName,
      json.phoneNumber,
      json.photoURL,
      json.creationTime,
      json.lastSignInTime
    );
  }

  toJson() {
    return JSON.parse(JSON.stringify(this));
  }

  static async getDriver(uid) {
    const ref = firebaseDatabase.ref(`drivers/${uid}`);
    let snapshot = await ref.get();
    const user = await firebaseAuth.getUser(uid);

    if (snapshot.exists()) {
      const driver = DriverModel.fromJson(snapshot.val());
      driver.lastSignInTime = user.metadata.lastSignInTime;
      await ref.update(driver.toJson());
    } else {
      const driver = new DriverModel(
        user.uid,
        user.email,
        user.displayName,
        user.phoneNumber,
        user.photoURL,
        user.metadata.creationTime,
        user.metadata.lastSignInTime
      );
      await ref.set(driver.toJson());
    }

    snapshot = await ref.get();
    return DriverModel.fromJson(snapshot.val());
  }

  static async updateDriver(uid, displayName, phoneNumber, photoURL) {
    const ref = firebaseDatabase.ref(`drivers/${uid}`);
    let snapshot = await ref.get();

    if (snapshot.exists()) {
      const obj = {};
      if (displayName) obj.displayName = displayName;
      if (phoneNumber) obj.phoneNumber = phoneNumber;
      if (photoURL) obj.photoURL = photoURL;
      await ref.update(obj);
      snapshot = await ref.get();
      return DriverModel.fromJson(snapshot.val());
    } else {
      return null;
    }
  }

  static async deleteDriver(uid) {
    const ref = firebaseDatabase.ref(`drivers/${uid}`);
    await ref.remove();
  }
}

module.exports = DriverModel;
