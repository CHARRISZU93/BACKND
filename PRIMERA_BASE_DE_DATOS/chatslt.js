const dbConfig = require("./knexfile");
const knex = require("knex")(dbConfig.sqlite);

(async () => {
  try {
    const exist = await knex.schema.hasTable("chat");
    if (!exist) {
      await knex.schema.createTable("chat", (table) => {
        table.increments("id").primary();
        table.string("autor").notNullable();
        table.string("fyh").notNullable();
        table.string("texto").notNullable();
      });
      console.log("creado");
    }
  } catch (error) {
    console.log(error);
  } finally {
  }
})();
