const router = require("express").Router()
const bcrypt = require("bcrypt")
const db = require("../utils/db")
const { sign, authorize } = require("../utils/jwt")

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const dbQuery = `SELECT * FROM "User" WHERE "email" = '${email}'`

  let result = {
    rows: [],
  }

  try {
    result = await db.query(dbQuery)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      result: "Login Failed",
      error: err.message,
    })
    return
  }

  if (result.rows.length === 0) {
    res.status(401).json({ message: "Invalid email or password" })
    return
  }

  const user = result.rows[0]
  const passwordMatch = bcrypt.compareSync(password, user.passwordHash)

  if (!passwordMatch) {
    res.status(401).json({ message: "Invalid email or password" })
    return
  }

  const token = sign({ id: user.id, email: user.email, name: user.name })

  res.json({ message: "Login Successful", token })
})

// Register user
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body
  const passwordHash = bcrypt.hashSync(password, 10)

  const dbQuery = `INSERT INTO "User" ("email", "passwordHash", "name") VALUES ('${email}', '${passwordHash}', '${name}')`

  try {
    await db.query(dbQuery)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      result: "Registration Failed",
      error: err.message,
    })
    return
  }

  return res.status(201).json({ message: "Registration Successful" })
})

// Get user list
router.get("/", async (req, res) => {
  const dbQuery = `SELECT * FROM "User"`

  let result = {
    rows: [],
  }

  try {
    result = await db.query(dbQuery)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      result: "Failed to fetch users",
      error: err.message,
    })
    return
  }
  return res.json({ message: "User List", users: result.rows })
})

// Get user details
router.get("/:id", async (req, res) => {
  const userID = req.params.id

  const dbQuery = `SELECT * FROM "User" WHERE "id" = '${userID}'`
  let result = {
    rows: [],
  }

  try {
    result = await db.query(dbQuery)
  } catch (err) {
    console.error(err)
    res.status(404).json({
      result: "Failed to fetch user",
      error: err.message,
    })
    return
  }

  const user = result.rows[0]
  const { email, id, name } = user
  return res.json({ message: "User Details", user: { id, email, name } })
})

// Update user details
router.put("/:id", authorize, async (req, res) => {
  const id = req.params.id

  let jwtPayload = res.locals

  if (!jwtPayload) {
    res.status(403).json({ message: "Forbidden" })
    return
  }

  let user = {}
  try {
    const selectQuery = `SELECT * FROM "User" WHERE "id" = '${id}'`
    const result = await db.query(selectQuery)
    user = result.rows[0]
  } catch (err) {
    console.error(err)
    res.status(404).json({
      result: "Failed to fetch user",
      error: err.message,
    })
    return
  }

  const body = req.body
  const userUpdate = {
    ...user,
    ...body,
  }

  try {
    const updateQuery = `UPDATE "User" SET "email" = '${userUpdate.email}', "name" = '${userUpdate.name}' WHERE "id" = '${id}'`
    await db.query(updateQuery)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      result: "Failed to update user",
      error: err.message,
    })
    return
  }

  return res.json({ message: `User ${id} Updated` })
})

router.delete("/:id", authorize, async (req, res) => {
  const id = req.params.id

  let jwtPayload = res.locals
  if (!jwtPayload || jwtPayload.id !== id) {
    res.status(403).json({ message: "Forbidden" })
    return
  }

  try {
    const deleteQuery = `DELETE FROM "User" WHERE "id" = '${id}'`
    await db.query(deleteQuery)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      result: "Failed to delete user",
      error: err.message,
    })
    return
  }

  return res.json({ message: `User ${id} Deleted` })
})

module.exports = router
