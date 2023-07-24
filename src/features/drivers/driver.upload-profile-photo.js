const multer = require('multer');
const path = require('path');
const { getDownloadURL } = require('firebase-admin/storage');
const guard = require('../guard');
const { bucket } = require('../../common/firebase.storage');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2097152, // 2 MB
  },
});

const fileTypes = /jpeg|jpg|png/;

const uploadPhoto = (req, res) => {
  guard(res, async () => {
    const extname = path.extname(req.file.originalname).toLocaleLowerCase();
    if (!fileTypes.test(extname)) {
      return res.status(403).json({
        ok: false,
        status: 403,
        message: 'Only image files are allowed.',
      });
    }

    const fileRef = bucket.file(
      `driver-profile-photos/${req.userUid}${extname}`
    );
    await fileRef.save(req.file.buffer);
    const downloadURL = await getDownloadURL(fileRef);

    return res.status(200).json({
      ok: true,
      status: 200,
      data: {
        downloadURL,
      },
    });
  });
};

module.exports = {
  upload,
  uploadPhoto,
};
