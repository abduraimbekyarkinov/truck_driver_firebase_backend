module.exports = async (res, future) => {
  try {
    await future();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Something went wrong.',
    });
  }
};
