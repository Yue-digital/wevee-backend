import knex from "knex";
import configDB from "../helpers/config.js";
import BaseModel from "./base.js";
import bookshelf from "bookshelf";
import subdealer from "./bookshelf/subdealer.js";

export default class Subdealer extends BaseModel{
  query = knex({
      client: 'mysql2',
      connection: {
          ...configDB()
      },
    })

  tableName = 'subdealer'
  constructor() {
    super()
    this.client = this.query
    const { SubdealerBookshelf } = subdealer(bookshelf(this.client))
    this.bookshelfModel = SubdealerBookshelf
  }


  findCorporates(user_id, filters, options){
    return this.bookshelfModel
    .where({ id: user_id })
    .fetchPage({
      pageSize: options?.limit, // Defaults to 10 if not specified
      page: options?.page,
      withRelated: ['corporate'],
    })
    .then((data) => data.toJSON())
  }
}