import knex from "knex";
import configDB from "../helpers/config.js";
import BaseModel from "./base.js";


export default class Corporate extends BaseModel{
  query = knex({
      client: 'mysql2',
      connection: {
          ...configDB()
      },
    })

  tableName = 'corporate'
  constructor() {
    super()
    this.client = this.query
  }
}