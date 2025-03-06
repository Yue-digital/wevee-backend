import knex from "knex";
import configDB from "../helpers/config.js";
const query = knex({
    client: 'mysql2',
    connection: {
        ...configDB()
    },
  })

const tableName = 'employee_profiles'
export function userFetch(filters, options = {}, prefix){
  const table = `${prefix}_${tableName}`;
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

export function userFindbyID(id, prefix){
  const table = `${prefix}_${tableName}`;
  const data = query(table)

  data.where({ id })
  data.first()
  return data
}

export function userFindbyEmail(email,prefix){
    const table = `${prefix}_${tableName}`
    const data = query(table)
  
    data.where({ email })
    data.first()
    return data
  }

export function userCreateOne(data) {
    return query(tableName).insert({ ...data })
}

export function userUpdate(id, data, prefix) {
    const table = `${prefix}_${tableName}`
    return query(table).where({ id }).update({ ...data })
}

export function createUser(data, prefix) {
  const table = `${prefix}_${tableName}`;
  const dataQuery = query(table)
  return dataQuery.insert({ ...data })
}