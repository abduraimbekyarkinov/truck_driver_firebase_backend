const express = require('express');
const controller = require('./loads.controller');

const router = express.Router();

router.get('/', controller.getAllLoads);

module.exports = {
  path: '/loads',
  router,
};
