const express = require('express');
const controller = require('./trucks.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, controller.getAllTrucks);
router.post('/mine', authMiddleware, controller.createTruck);
router.delete('/mine', authMiddleware, controller.deleteTruck);
router.get('/mine', authMiddleware, controller.getTruck);
router.get('/info/:vin', authMiddleware, controller.getTruckInfoFromVpic);

module.exports = {
  path: '/trucks',
  router,
};
