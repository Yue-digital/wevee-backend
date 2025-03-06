
export function up(knex) {
    return Promise.all([
      knex.schema.createTable("corporate_car_pricing", function (table) {
        table.increments()
        table.integer('sub_dealer_id').nullable()
        table.integer('car_id').nullable()
        table.integer('corporate_id').nullable()
        table.integer('list_price').nullable()
        table.integer('rate_10').nullable()
        table.integer('rate_20').nullable()
        table.integer('rate_30').nullable()
        table.integer('rate_40').nullable()
        table.timestamps(true, true)
      }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([knex.schema.dropTable("corporate_car_pricing")]);
  }