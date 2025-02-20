const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: './config.env' });
const colors = require('colors');
require('dotenv').config();
const test = require('dotenv').config()

process.on('uncaughtException', (error) => {
  // using uncaughtException event
  console.log(' uncaught Exception => shutting down..... ');
  console.log(error.name, error.message);
  process.exit(1); //  emidiatly exists all from all the requests
});

const app = require('./app');

// server
const port = process.env.PORT || 6000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

process.on('unhandledRejection', (error) => {
  console.log(' Unhandled Rejection => shutting down..... ');
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1); //  emidiatly exists all from all the requests sending OR pending
  });
});
