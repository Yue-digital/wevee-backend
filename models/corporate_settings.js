import knex from "knex";
import configDB from "../helpers/config.js";
import BaseModel from "./base.js";


export default class CorporateSettings extends BaseModel{
  query = knex({
      client: 'mysql2',
      connection: {
          ...configDB()
      },
    })

  tableName = 'corporate_settings'
  constructor() {
    super()
    this.client = this.query
  }

  updateByCorporateId(corporate_id, data){
    return this.client(this.tableName)
    .where({ corporate_id })
    .update({ ...data })
  }
}