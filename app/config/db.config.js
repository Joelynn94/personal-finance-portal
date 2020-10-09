module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'admin',
  DATABASE: 'financial-portal',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
