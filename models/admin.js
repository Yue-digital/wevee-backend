import knex from "knex";
import configDB from "../helpers/config.js";
const query = knex({
    client: 'mysql2',
    connection: {
        ...configDB()
    },
  })


export function fetchAdmin(filters, options = {}){
    const data = query('partner_user')

    data.where({ ...filters })

    if (options?.limit) {
      data.limit(options.limit)
    }

    if (options?.page) {
      const offset = --options.page * (options.limit || 10)

      data.offset(offset)
    }


    return data
}

export function createOne(data) {
    return query('partner_user').insert({ ...data })
}

export function update(id, data) {
    return query('partner_user').where({ id }).update({ ...data })
}