const path = require('path');
//import { config } from 'dotenv';
const config = require('dotenv');

//config();
const dialect = process.env.DIALECT || 'mysql';
module.exports = {
  x: {
    url: process.env.DB_URL || '',
    dialect,
    logging: (e) => {
      console.log(e);
    },
  },
  development: {
    dialect: 'sqlite',
    url: process.env.DB_URL || '',
    storage: path.join(__dirname, '..', 'Ceremony.sqlite3'),
    seederStorage: 'sequelize',
    logging: (e) => {
      console.log(e);
    },
  },
  production: {
    url: process.env.DB_URL || '',
    logging: false,
    pool: {
      acquire: 1000000,
    }
  },
};