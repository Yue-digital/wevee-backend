import knex from "knex";
import path from "path";
import configDB from "./helpers/config.js";
const config = {
  client: 'mysql2',
  connection: {
   ...configDB()
  },
  debug: true
};

export default config; 