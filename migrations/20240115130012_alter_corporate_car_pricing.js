
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate_car_pricing', function (table) {
            table.dropColumn('rate_10')
            table.dropColumn('rate_20')
            table.dropColumn('rate_30')
            table.dropColumn('rate_40')
            table.integer('overall_10k').nullable()
            table.integer('overall_20k').nullable()
            table.integer('overall_30k').nullable()
            table.integer('overall_40k').nullable()
            table.integer('market_10k').nullable()
            table.integer('market_20k').nullable()
            table.integer('market_30k').nullable()
            table.integer('market_40k').nullable()
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate_car_pricing', function (table) {
            table.integer('rate_10').nullable()
            table.integer('rate_20').nullable()
            table.integer('rate_30').nullable()
            table.integer('rate_40').nullable()
            table.dropColumn('overall_10k')
            table.dropColumn('overall_20k')
            table.dropColumn('overall_30k')
            table.dropColumn('overall_40k')
            table.dropColumn('market_10k')
            table.dropColumn('market_20k')
            table.dropColumn('market_30k')
            table.dropColumn('market_40k')
        }),
    ]);
  }