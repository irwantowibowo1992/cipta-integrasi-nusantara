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

  test: {
    client: 'pg',
      connection: {
        host: process.env.DB_HOST_TEST,
        database: process.env.DB_NAME_TEST,
        user: process.env.DB_USER_TEST,
        password: process.env.DB_PASS_TEST,
      },
      ssl: {
        rejectUnauthorized: false,
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: './db/migrations_test',
      },
      seeds: {
        directory: './db/seeds_test',
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