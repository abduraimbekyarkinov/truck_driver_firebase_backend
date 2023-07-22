const guard = require('../guard');
const TruckModel = require('./truck.model');

exports.getAllTrucks = (req, res) => {
  guard(res, async () => {
    const trucks = await TruckModel.getAllTrucks();

    res.status(200).json({
      ok: true,
      status: 200,
      data: {
        trucks,
      },
    });
  });
};

exports.getTruck = (req, res) => {
  guard(res, async () => {
    const truck = await TruckModel.getTruckByUserUid(req.userUid);

    if (truck) {
      res.status(200).json({
        ok: true,
        status: 200,
        data: {
          truck,
        },
      });
    } else {
      res.status(404).json({
        ok: false,
        status: 404,
        message: 'Truck not found.',
      });
    }
  });
};

exports.createTruck = (req, res) => {
  guard(res, async () => {
    const truck = TruckModel.fromJson(req.body);
    truck.userUid = req.userUid;

    const createdTruck = await truck.create();

    if (createdTruck) {
      res.status(200).json({
        ok: true,
        status: 200,
        data: {
          truck: createdTruck,
        },
      });
    } else {
      throw 'Currently created truck not found.';
    }
  });
};

exports.deleteTruck = (req, res) => {
  guard(res, async () => {
    await TruckModel.deleteTruckByUserUid(req.userUid);
    res.status(200).json({
      ok: true,
      status: 200,
    });
  });
};

exports.getTruckInfoFromVpic = (req, res) => {
  guard(res, async () => {
    const vin = req.params['vin'];
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`,
      { method: 'GET' }
    );
    const json = await response.json();

    if (json.Count < 1 || json.Results.length < 1) {
      return res.status(200).json({
        ok: false,
        status: 200,
        message: 'Error while getting truck info.',
      });
    }

    const data = json.Results[0];

    if (data.ErrorCode !== '0') {
      return res.status(200).json({
        ok: false,
        status: 200,
        message: data.ErrorText ?? 'Error while getting truck info.',
      });
    }

    const truck = TruckModel.fromJson(data);
    truck.userUid = req.userUid;
    return res.status(200).json({
      ok: true,
      status: 200,
      data: {
        info: truck,
      },
    });
  });
};
