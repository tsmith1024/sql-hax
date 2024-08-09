const router = require("express").Router()

router.post("/search", (req, res) => {
  const { searchTerm } = req.body
  res.json({ message: "Search Results" })
})

router.post("/", (req, res) => {
  const { name, price, description } = req.body
  res.json({ message: "Product Added" })
})

router.put("/:id", (req, res) => {
  const id = req.params.id
  res.json({ message: `Product ${id} Updated` })
})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  res.json({ message: `Product ${id} Deleted` })
})

module.exports = router
