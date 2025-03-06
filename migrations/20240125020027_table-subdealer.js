
export function up(knex) {
    return Promise.all([
      knex.schema.createTable("subdealer", function (table) {
        table.increments()
        table.string('company_name').nullable()
        table.string('country').nullable()
        table.string('city').nullable()
        table.string('contact').nullable()
        table.string('website').nullable()
        table.string('contact_person').nullable()
        table.string('contact_designation').nullable()
        table.string('contact_mobile').nullable()
        table.string('contact_email').nullable()
        table.integer('upper_dealer').nullable()
        table.boolean('status').default(0)
        table.timestamps(true, true)
      }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([knex.schema.dropTable("subdealer")]);
  }