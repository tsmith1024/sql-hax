const pg = require("pg")
require("dotenv").config()
const db = new pg.Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: "localhost",
  connectionString: process.env.DATABASE_URL,
})

module.exports = db
