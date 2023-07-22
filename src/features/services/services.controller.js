const guard = require('../guard');
const serviceModel = require('./service.model');

exports.getAllServices = (req, res) => {
  guard(res, async () => {
    const services = await serviceModel.getAllServices();

    res.status(200).json({
      ok: true,
      status: 200,
      data: {
        services,
      },
    });
  });
};
