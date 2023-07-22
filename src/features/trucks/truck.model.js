const firebaseDatabase = require('../../common/firebase.database');

class TruckModel {
  constructor(
    driverUid,
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
    this.driverUid = driverUid;
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
      json.driverUid,
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

  static async deleteTruckByDriver(driverUid) {
    const ref = firebaseDatabase.ref(`trucks/${driverUid}`);
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

  static async getTruckByDriver(driverUid) {
    const ref = firebaseDatabase.ref(`trucks/${driverUid}`);
    const snapshot = await ref.get();
    if (snapshot.exists()) {
      return TruckModel.fromJson(snapshot.val());
    } else {
      return null;
    }
  }
}

module.exports = TruckModel;

// {
//   "GCWR": "",
//   "GVWR": "Class 1D: 5,001 - 6,000 lb (2,268 - 2,722 kg)",
//   "Make": "ACURA",
//   "MakeID": "475",
//   "Manufacturer": "HONDA OF CANADA MFG., INC.",
//   "ManufacturerId": "990",
//   "Model": "MDX",
//   "ModelID": "2147",
//   "ModelYear": "2013",
//   "VIN": "2HNYD2H85DH001041",
//   "VehicleType": "MULTIPURPOSE PASSENGER VEHICLE (MPV)",
//   "WheelBaseLong": "",
//   "WheelBaseShort": "",
//   "WheelBaseType": "",
//   "WheelSizeFront": "",
//   "WheelSizeRear": "",
//   "Wheels": "",
//   "driverUid": "07M0mqfPXAW05sw3f2MTUpNaEd82"
// }
