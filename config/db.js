module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || 'root',
    "password": process.env.DB_PASSWORD || 'root',
    "database": process.env.DB_NAME || 'challenge6',
    "host": process.env.DB_HOST || 'localhost',
    "dialect": process.env.DB_DIALECT || 'mysql',
  },
  "test": {
    "username": process.env.DB_USERNAME || 'root',
    "password": process.env.DB_PASSWORD || 'root',
    "database": process.env.DB_NAME || 'challenge6',
    "host": process.env.DB_HOST || 'localhost',
    "dialect": process.env.DB_DIALECT || 'mysql',
  },
  "production": {
    "username": process.env.DB_USERNAME || 'root',
    "password": process.env.DB_PASSWORD || 'root',
    "database": process.env.DB_NAME || 'challenge6',
    "host": process.env.DB_HOST || 'localhost',
    "dialect": process.env.DB_DIALECT || 'mysql',
  }
}
