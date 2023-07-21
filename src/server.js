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
  res.status(500).json({
    ok: false,
    status: 500,
    message: 'Internal server error.',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
