
export function up(knex) {
    return Promise.all([knex.schema.renameTable('corporate_car_pricing', 'corporate_vehicles_pricing')]);
  }
 
  export function down(knex) {
    return Promise.all([knex.schema.renameTable('corporate_vehicles_pricing', 'corporate_car_pricing')]);
  }