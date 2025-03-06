import knex from "knex";
import configDB from "../helpers/config.js";
import BaseModel from "./base.js";


export default class Car extends BaseModel{
  query = knex({
      client: 'mysql2',
      connection: {
          ...configDB()
      },
    })

  tableName = 'vehicles'
  constructor() {
    super()
    this.client = this.query
  }

  fetchCars(prefix,filters, options = {}) {
    const table = `${prefix}_${this.tableName}`;
    const query = this.client(table)
  
    query.where({ ...filters })

    if (options?.limit) {
      query.limit(options.limit)
    }

    if (options?.page) {
      const offset = --options.page * (options.limit || 10)

      query.offset(offset)
    }

    return query
  }
}