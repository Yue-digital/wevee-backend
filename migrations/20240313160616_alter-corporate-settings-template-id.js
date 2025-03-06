
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate_settings', function (table) {
            table.integer('template_id')
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('corporate_settings', function (table) {
            table.dropColumn('template_id')
        }),
    ]);
  }
