const guard = require('../guard');
const DriverModel = require('./driver.model');

exports.getDriver = (req, res) => {
  guard(res, async () => {
    const driver = await DriverModel.getDriver(req.userUid);
    res.status(200).json({
      ok: true,
      status: 200,
      data: {
        driver,
      },
    });
  });
};

exports.updateDriver = (req, res) => {
  guard(res, async () => {
    const { displayName, phoneNumber, photoURL } = req.body;
    const driver = await DriverModel.updateDriver(
      req.userUid,
      displayName,
      phoneNumber,
      photoURL
    );

    if (driver) {
      res.status(200).json({
        ok: true,
        status: 200,
        data: {
          driver,
        },
      });
    } else {
      res.status(404).json({
        ok: false,
        status: 404,
        message: 'Driver not found.',
      });
    }
  });
};
