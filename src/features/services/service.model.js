const firebaseDatabase = require('../../common/firebase.database');

class ServiceModel {
  constructor(uid, name, svgIconContent) {
    this.uid = uid;
    this.name = name;
    this.svgIconContent = svgIconContent;
  }

  static fromJson(json) {
    return new ServiceModel(json.uid, json.name, json.svgIconContent);
  }

  static async getAllServices() {
    const ref = firebaseDatabase.ref('services');
    const snapshot = await ref.get();
    const services = [];
    snapshot.forEach((e) => {
      services.push(ServiceModel.fromJson(e.val()));
    });
    return services;
  }
}

module.exports = ServiceModel;
