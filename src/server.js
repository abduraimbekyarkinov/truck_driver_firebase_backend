require('dotenv').config();
const app = require('./app');
const { PORT } = require('./config');

app.use('*', (req, res) => {
  res.status(404).json({
    ok: false,
    status: 404,
    message: 'Route not found.',
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);

  // LIMIT_FILE_SIZE
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(403).json({
      ok: false,
      status: 403,
      message: 'Maximum file size is 2 MB.',
    });
  }

  res.status(500).json({
    ok: false,
    status: 500,
    message: 'Internal server error.',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
