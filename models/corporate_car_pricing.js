import knex from "knex";
import configDB from "../helpers/config.js";
import BaseModel from "./base.js";
import bookshelf from "bookshelf";
import corporatecCarPricing from "./bookshelf/corporatecCarPricing.js";

export default class CorporateCarPricing extends BaseModel{
  query = knex({
      client: 'mysql2',
      connection: {
          ...configDB()
      },
    })

  tableName = 'corporate_vehicles_pricing'
  constructor() {
    super()
    this.client = this.query
    const { CorporateCarPricingBookshelf } = corporatecCarPricing(bookshelf(this.client))
    this.bookshelfModel = CorporateCarPricingBookshelf
  }

  availableCars(id, corporate_id) {
    // return this.findBy(parameter, options)
    return this.bookshelfModel
      .where({ corporate_id, car_id: id })
      .fetchPage({
        withRelated: ['car'],
      })
      .then((data) => data.toJSON())
  }

  availableFindCars(id, filters, options = {}) {
    // return this.findBy(parameter, options)

    const { q, parent_model, ...filterRest } = filters

    return this.bookshelfModel
      .where({ corporate_id: id })
      .query(function (qb){
        qb.innerJoin('vehicles','corporate_vehicles_pricing.car_id','vehicles.id')
        if (parent_model) {
          qb.where('vehicles.parent_model', 'LIKE', `%${parent_model}%`)
        }
      })
      .fetchPage({
        pageSize: options?.limit, // Defaults to 10 if not specified
        page: options?.page,
        withRelated: ['car'],
      })
      .then((data) => data.toJSON())
  }
}