const express = require('express');
const controller = require('./trucks.controller');

const router = express.Router();

router.get('/', controller.getAllTrucks);
router.post('/', controller.createTruck);
router.get('/:driverUid', controller.getTuckByDriver);
router.get('/info/:vin', controller.getTruckInfoFromVpic);

module.exports = {
  path: '/trucks',
  router,
};
