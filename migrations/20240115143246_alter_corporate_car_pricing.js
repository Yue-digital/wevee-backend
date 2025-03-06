
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate_car_pricing', function (table) {
            table.integer('overall_15k').nullable()
            table.integer('market_15k').nullable()
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate_car_pricing', function (table) {
            table.dropColumn('overall_15k')
            table.dropColumn('market_15k')
        }),
    ]);
  }