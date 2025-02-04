const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  // Use DB_URL if provided
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  // Use separate credentials if no DB_URL is provided
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT || 5432,
    }
  );
}

module.exports = sequelize;

