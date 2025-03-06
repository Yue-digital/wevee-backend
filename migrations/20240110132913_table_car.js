
export function up(knex) {
    return Promise.all([
      knex.schema.createTable("car", function (table) {
        table.increments()
        table.string('brand').nullable()
        table.string('parent_model').nullable()
        table.string('model').nullable()
        table.string('trim').nullable()
        table.string('colour').nullable()
        table.integer('model_year').nullable()
        table.string('image_url').nullable()
        table.string('category').nullable()
        table.boolean('is_available').default(true)
        table.integer('list_price').nullable()
        table.integer('acceleration_time').nullable()
        table.integer('top_speed').nullable()
        table.integer('range').nullable()
        table.integer('battery_capacity').nullable()
        table.integer('efficiency').nullable()
        table.string('energy_efficiency_class').nullable()
        table.integer('height').nullable()
        table.integer('length').nullable()
        table.integer('width').nullable()
        table.integer('vechicle_id').nullable()
        table.integer('group_id').nullable()
        table.boolean('insurance_included').default(0)
        table.boolean('maintenance').default(0)
        table.boolean('winter_tire_package').default(0)
        table.boolean('is_active').default(0)
        table.json('extra_equipment').nullable()
        table.json('standard_equipment').nullable()
        table.integer('overall_10k').nullable()
        table.integer('overall_20k').nullable()
        table.integer('overall_30k').nullable()
        table.integer('overall_40k').nullable()
        table.integer('market_10k').nullable()
        table.integer('market_20k').nullable()
        table.integer('market_30k').nullable()
        table.integer('market_40k').nullable()
        table.timestamps(true, true)
      }),
    ]);
  }
 
  export function down(knex) {
    return Promise.all([knex.schema.dropTable("car")]);
  }