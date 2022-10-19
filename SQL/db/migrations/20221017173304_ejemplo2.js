const knex = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.up = async function (knex) {
  // para crear la tabla
  const exist = await knex.schema.hasTable("ejemploTabla");
  if (!exist) {
    return knex.schema.createTable("ejemploTabla", (table) => {
      table.increments("id"); //primary key
      table.string("name").notNullable().defaultTo("es un ejemplo");
      table.string("lastname");
      table.string("age");
      table.string("dni").notNullable().unique();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.down = async function (knex) {
  // para borrar la tabla
  const exist = await knex.schema.hasTable("ejemploTabla");
  if (exist) {
    return knex.schema.dropTable('ejemploTabla')
}
};
