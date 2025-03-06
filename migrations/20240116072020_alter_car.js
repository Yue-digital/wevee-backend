
export function up(knex) {
    return Promise.all([
        knex.schema.alterTable('car', function (table) {
            table.text('extra_equipment').alter()
            table.text('standard_equipment').alter()
        }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([
        knex.schema.alterTable('car', function (table) {
            table.json('extra_equipment').alter()
             table.json('standard_equipment').alter()
        }),
    ]);
  }