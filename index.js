const express = require("express")
const bcrypt = require("bcrypt")

const app = express()
app.use(express.json())

app.get("/hello", (req, res) => {
  res.send("Hello World")
})

// REGISTRATION
app.post("/login", (req, res) => {
  const { email, password } = req.body

  res.send("Login Successful")
})

app.post("/register", (req, res) => {
  const { email, password, name } = req.body
  const passwordHash = bcrypt.hashSync(password, 10)
  res.send("Register Successful " + "- HASH: " + passwordHash)
})

// USER
app.get("/user", (req, res) => {
  res.send("User Profile")
})

app.put("/user/:id", (req, res) => {
  const id = req.params.id
  res.send(`User ${id} Updated`)
})

app.delete("/user/:id", (req, res) => {
  const id = req.params.id
  res.send(`User ${id} Deleted`)
})

// PRODUCT
app.post("/product/search", (req, res) => {
  const { searchTerm } = req.body
  res.send("Search Results")
})

app.post("/product", (req, res) => {
  const { name, price, description } = req.body
  res.send("Product Added")
})

app.put("/product/:id", (req, res) => {
  const id = req.params.id
  res.send(`Product ${id} Updated`)
})

app.delete("/product/:id", (req, res) => {
  const id = req.params.id
  res.send(`Product ${id} Deleted`)
})

// SERVER
app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
