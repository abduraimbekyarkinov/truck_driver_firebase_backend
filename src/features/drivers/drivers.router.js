const express = require('express');
const controller = require('./drivers.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const driverUploadProfilePhoto = require('./driver.upload-profile-photo');

const router = express.Router();

router.get('/me', authMiddleware, controller.getDriver);
router.put('/me', authMiddleware, controller.updateDriver);

router.post(
  '/me/uploadProfilePhoto',
  [authMiddleware, driverUploadProfilePhoto.upload.single('filename')],
  driverUploadProfilePhoto.uploadPhoto
);

module.exports = {
  path: '/drivers',
  router,
};
