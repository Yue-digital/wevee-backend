
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate', function (table) {
            table.string('address')
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate', function (table) {
            table.dropColumn('address')
        }),
    ]);
  }
