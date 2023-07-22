const express = require('express');
const controller = require('./loads.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, controller.getAllLoads);

module.exports = {
  path: '/loads',
  router,
};
