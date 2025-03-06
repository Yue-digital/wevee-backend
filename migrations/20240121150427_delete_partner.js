
export function up(knex) {
    return Promise.all([knex.schema.dropTable("partner_user")]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.createTable("partner_user", function (table) {
          table.increments()
          table.string('username')
          table.string('password')
          table.string('first_name')
          table.string('last_name')
          table.string('email')
          table.boolean('status')
          table.timestamps(true, true)
        }),
      ]);
  }