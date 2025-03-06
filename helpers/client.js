import knex from "knex";
import configDB from "./config.js";

const client = (client) => knex({
    client: 'mysql2',
    connection: {
      ...configDB()
    },
  })


  export default client
