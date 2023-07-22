const firebaseAuth = require('../common/firebase.auth');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const docoded = await firebaseAuth.verifyIdToken(token);
    req.userUid = docoded.uid;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      ok: false,
      status: 401,
      message: 'Unauthorized.',
    });
  }
};
