
export function up(knex) {
    return Promise.all([
      knex.schema.createTable("corporate_settings", function (table) {
        table.increments()
        table.integer('corporate_id').nullable()
        table.string('logo').nullable()
        table.string('template').nullable()
        table.string('table_prefix').nullable()
        table.string('primary_color').nullable()
        table.timestamps(true, true)
      }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([knex.schema.dropTable("corporate_settings")]);
  }