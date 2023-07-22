const express = require('express');
const controller = require('./services.controller');

const router = express.Router();

router.get('/', controller.getAllServices);

module.exports = {
  path: '/services',
  router,
};
