
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('subdealer', function (table) {
            table.string('calculation_method').default('tasslink')
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('subdealer', function (table) {
            table.dropColumn('calculation_method')
        }),
    ]);
  }
