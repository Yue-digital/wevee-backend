
export function up(knex) {
    return Promise.all([knex.schema.renameTable('car', 'vehicles')]);
  }
 
  export function down(knex) {
    return Promise.all([knex.schema.renameTable('vehicles', 'car')]);
  }