const knex = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.up = async function(knex) {
    const exist = await knex.schema.hasTable("chat");
    if (!exist) {
      return knex.schema.createTable("chat", (table) => {
        table.increments("id"); //primary key
        table.string("username");
        table.string("inputMessage", 6553);
      });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.down = async function(knex) {
    const exist = await knex.schema.hasTable("chat");
    if (exist) {
      return knex.schema.dropTable('chat')
    }
};
