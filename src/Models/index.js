const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
 


const dynamic_models = require('../Utils/dynamic/dynamic_models')


const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PWD, {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
  // logging: console.log, // Enable logging to see SQL statements 
});

 


const db = {
  sequelize,
  Sequelize,
  Op
};
 

dynamic_models.set_dynamic_models(__dirname,db)
  
 


Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});


module.exports = db;
