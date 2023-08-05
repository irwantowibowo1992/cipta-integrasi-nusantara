require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
      connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
      },
      ssl: {
        rejectUnauthorized: false,
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: './db/migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    ssl: {
      rejectUnauthorized: false,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  }
}