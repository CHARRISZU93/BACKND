const knex = require("knex");

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      database: "productos",
    },
    migrations: {
      directory: "./db/migrations",
    },
    pool: {
      min: 0,
      max: 10,
    },
  },
  sqlite: {
    client: "sqlite3",
    connection: {
      filename: "./db/sqlite/chat.sqlite",
    },
    useNullAsDefault: true,
  },
};
