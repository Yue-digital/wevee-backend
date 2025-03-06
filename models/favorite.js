import knex from "knex";
import configDB from "../helpers/config.js";
const query = knex({
    client: 'mysql2',
    connection: {
        ...configDB()
    },
  })

const tableName = 'favorite'
export function favoriteFetch(filters, options = {}, prefix){
   const table = `${prefix}_${tableName}`
    const data = query(table)

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

export function favoriteFindbyUserID(id, prefix){
   const table = `${prefix}_${tableName}`
  const data = query(table)

  data.where({ user_id: id })
  return data
}

export function favoriteFindbyCarId(car_id, user_id, prefix){
   const table = `${prefix}_${tableName}`
    const data = query(table)
  
    data.where({ car_id, user_id })
    data.first()
    return data
  }

export function favoriteCreateOne(data, prefix) {
   const table = `${prefix}_${tableName}`
    return query(table).insert({ ...data })
}

export function favoriteUpdate(id, data, prefix) {
   const table = `${prefix}_${tableName}`
    return query(table).where({ car_id: id }).update({ ...data })
}

export function favoriteDelete(car_id, user_id, prefix){
   const table = `${prefix}_${tableName}`
  return query(table).where({ car_id, user_id }).del()
}