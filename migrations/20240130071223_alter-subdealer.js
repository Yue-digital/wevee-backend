
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('subdealer', function (table) {
            table.string('logo')
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('subdealer', function (table) {
            table.dropColumn('logo')
        }),
    ]);
  }