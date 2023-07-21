const express = require('express');

const homeRouter = require('./features/home/home.router');
const loadsRouter = require('./features/loads/loads.router');

const app = express();

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(homeRouter.path, homeRouter.router);
app.use(loadsRouter.path, loadsRouter.router);

module.exports = app;
