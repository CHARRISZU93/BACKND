const knex = require("knex");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.up = async function (knex) {
  const exist = await knex.schema.hasTable("bdproductos");
  if (!exist) {
    return knex.schema.createTable("bdproductos", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("price").notNullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.down = async function (knex) {
  const exist = await knex.schema.hasTable("bdproductos");
  if (exist) {
    return knex.schema.dropTable('bdproductos')
  }
};
