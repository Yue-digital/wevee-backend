
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate', function (table) {
            table.string('tax_id')
            table.string('business_years')
            table.string('region')
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate', function (table) {
            table.dropColumn('tax_id')
            table.dropColumn('business_years')
            table.dropColumn('region')
        }),
    ]);
  }