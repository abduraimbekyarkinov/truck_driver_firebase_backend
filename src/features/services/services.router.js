const express = require('express');
const controller = require('./services.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, controller.getAllServices);

module.exports = {
  path: '/services',
  router,
};
