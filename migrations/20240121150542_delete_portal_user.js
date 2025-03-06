
export function up(knex) {
    return Promise.all([knex.schema.dropTable("portal_user")]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.createTable("portal_user", function (table) {
          table.increments()
          table.string('logo').nullable()
          table.string('status').default('Active')
          table.integer('dealer_id').nullable()
          table.string('company_name').nullable()
          table.string('country').nullable()
          table.string('city').nullable()
          table.string('contact').nullable()
          table.string('website').nullable()
          table.string('contact_person').nullable()
          table.string('contact_person_designation').nullable()
          table.string('contact_person_mobile').nullable()
          table.string('contact_person_email').nullable()
          table.integer('role').default(0)
          table.timestamps(true, true)
        }),
      ]);
  }