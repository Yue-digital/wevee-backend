import knex from "knex";
import configDB from "../helpers/config.js";
const query = knex({
  client: "mysql2",
  connection: {
    ...configDB(),
  },
});

const tableName = "tasslink";

export function tasslinkUserFindbyID(id, prefix) {
   const table = `${prefix}_${tableName}`
  const data = query(table);

  data.where({ user_id: id });
  return data;
}

export function tasslinkbyCarId(id, carId, prefix) {
   const table = `${prefix}_${tableName}`
  const data = query(table);

  data.where({ user_id: id, car_id: carId });
  data.first();
  return data;
}

export function tasslinkCreateOne(data, prefix) {
   const table = `${prefix}_${tableName}`
  return query(table).insert({ ...data });
}
export function tasslinkUpdate(carId, userId, data, prefix) {
   const table = `${prefix}_${tableName}`
  return query(table)
    .where({ car_id: carId, user_id: userId })
    .update({ ...data });
}
