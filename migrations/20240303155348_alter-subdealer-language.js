
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('subdealer', function (table) {
            table.string('language').default('en')
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('subdealer', function (table) {
            table.dropColumn('language')
        }),
    ]);
  }