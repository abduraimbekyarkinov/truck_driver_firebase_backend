const guard = require('../guard');
const loadModel = require('./load.model');

exports.getAllLoads = (req, res) => {
  guard(res, async () => {
    const loads = await loadModel.getAllLoads();

    res.status(200).json({
      ok: true,
      status: 200,
      data: {
        loads: loads,
      },
    });
  });
};
