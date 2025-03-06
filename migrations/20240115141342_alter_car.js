
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('car', function (table) {
            table.integer('overall_15k').nullable()
            table.integer('market_15k').nullable()
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('car', function (table) {
            table.dropColumn('market_15k')
            table.dropColumn('overall_15k')
        }),
    ]);
  }