
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('subdealer', function (table) {
            table.renameColumn('contact_email','email')
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('subdealer', function (table) {
            table.renameColumn('email','contact_email')
        }),
    ]);
  }