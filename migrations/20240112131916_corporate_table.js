
export function up(knex) {
    return Promise.all([
      knex.schema.createTable("corporate", function (table) {
        table.increments()
        table.integer('sub_dealer_id').nullable()
        table.string('name').nullable()
        table.string('country').nullable()
        table.string('city').nullable()
        table.string('contact').nullable()
        table.string('website_url').nullable()
        table.boolean('status').default(true)
        table.timestamps(true, true)
      }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([knex.schema.dropTable("corporate")]);
  }