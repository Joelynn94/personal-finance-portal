'use strict'

const dbConfig = require('../../config/config.json')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'mysql',
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
