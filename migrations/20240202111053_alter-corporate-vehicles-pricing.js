
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate_vehicles_pricing', function (table) {
            table.double('discount_percentage')
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate_vehicles_pricing', function (table) {
            table.dropColumn('discount_percentage')
        }),
    ]);
  }