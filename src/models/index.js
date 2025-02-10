// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;


const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  console.log("here 1");

  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  console.log("here 2");
} else if (config.url) {
  console.log("here 3");

  sequelize = new Sequelize(config.url, config);
  console.log("here 4");

}else if (config.dialect) {
  console.log("here 8");

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './Ceremony.sqlite3', // Specify the database file
  });
  console.log("here 9 ", sequelize);

} else {
  console.log("here 5");
  console.log("config.use_env_variable ", config.use_env_variable);
  console.log("config ", config);

  sequelize = new Sequelize(config);
  console.log("here 6 ", sequelize);

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './Ceremony.sqlite3', // Specify the database file
  });
  console.log("here 7 ", sequelize);

}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  console.log("modelName ", modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
