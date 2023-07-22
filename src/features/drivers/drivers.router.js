const express = require('express');
const controller = require('./drivers.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', authMiddleware, controller.getDriver);
router.put('/me', authMiddleware, controller.updateDriver);

module.exports = {
  path: '/drivers',
  router,
};
