const firebaseDatabase = require('../../common/firebase.database');

class TruckModel {
  constructor(
    userUid,
    GCWR,
    GVWR,
    Make,
    MakeID,
    Manufacturer,
    ManufacturerId,
    Model,
    ModelID,
    ModelYear,
    VIN,
    VehicleType,
    WheelBaseLong,
    WheelBaseShort,
    WheelBaseType,
    WheelSizeFront,
    WheelSizeRear,
    Wheels
  ) {
    this.userUid = userUid;
    this.GCWR = GCWR;
    this.GVWR = GVWR;
    this.Make = Make;
    this.MakeID = MakeID;
    this.Manufacturer = Manufacturer;
    this.ManufacturerId = ManufacturerId;
    this.Model = Model;
    this.ModelID = ModelID;
    this.ModelYear = ModelYear;
    this.VIN = VIN;
    this.VehicleType = VehicleType;
    this.WheelBaseLong = WheelBaseLong;
    this.WheelBaseShort = WheelBaseShort;
    this.WheelBaseType = WheelBaseType;
    this.WheelSizeFront = WheelSizeFront;
    this.WheelSizeRear = WheelSizeRear;
    this.Wheels = Wheels;
  }

  static fromJson(json) {
    return new TruckModel(
      json.userUid,
      json.GCWR,
      json.GVWR,
      json.Make,
      json.MakeID,
      json.Manufacturer,
      json.ManufacturerId,
      json.Model,
      json.ModelID,
      json.ModelYear,
      json.VIN,
      json.VehicleType,
      json.WheelBaseLong,
      json.WheelBaseShort,
      json.WheelBaseType,
      json.WheelSizeFront,
      json.WheelSizeRear,
      json.Wheels
    );
  }

  toJson() {
    return JSON.parse(JSON.stringify(this));
  }

  async create() {
    const ref = firebaseDatabase.ref(`trucks/${this.driverUid}`);
    await ref.set(this.toJson());
    return TruckModel.getTruckByDriver(this.driverUid);
  }

  static async deleteTruckByUserUid(userUid) {
    const ref = firebaseDatabase.ref(`trucks/${userUid}`);
    await ref.remove();
  }

  static async getAllTrucks() {
    const ref = firebaseDatabase.ref('trucks');
    const snapshot = await ref.get();
    const trucks = [];
    snapshot.forEach((e) => {
      trucks.push(TruckModel.fromJson(e.val()));
    });
    return trucks;
  }

  static async getTruckByUserUid(userUid) {
    const ref = firebaseDatabase.ref(`trucks/${userUid}`);
    const snapshot = await ref.get();
    if (snapshot.exists()) {
      return TruckModel.fromJson(snapshot.val());
    } else {
      return null;
    }
  }
}

module.exports = TruckModel;
