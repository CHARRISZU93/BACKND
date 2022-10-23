const dbConfig = require("./knexfile");
const knex = require('knex')(dbConfig.sqlite);

async () => {
  try {
    const exist = await knex.schema.hasTable("chats");
    if (!exist) {
      await knex.schema.createTable("chats", (table) => {
        table.increments("id").primary();
        table.string("username").notNullable();
        table.string("inputMessage").notNullable();
      });
      console.log('hola')
    }
  } catch (error) {
    console.log(error);
  } finally {
  }
};
