const express = require("express")

const userHandler = require("./handlers/user")
const productHandler = require("./handlers/product")
const orderHandler = require("./handlers/order")

require("dotenv").config()
const db = require("./utils/db")

const app = express()
app.use(express.json())

// STATUS CHECK
app.get("/hello", (req, res) => {
  res.json({ message: "Hello World" })
})

// USER
app.use("/user", userHandler)

// PRODUCT
app.use("/product", productHandler)

// ORDERS
app.use("/order", orderHandler)

// SERVER
async function main() {
  await db.connect()
  console.log("Connected to database")
  app.listen(3000, () => {
    console.log("Server is running on port 3000")
  })
}

main()
