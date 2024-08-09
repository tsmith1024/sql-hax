const router = require("express").Router()

router.get("/user/:id/orders", (req, res) => {
  const id = req.params.id
  res.json({ message: `Orders for User ${id}` })
})

router.post("/user/:id/order", (req, res) => {
  const id = req.params.id
  res.json({ message: `Order for User ${id} Created` })
})

router.delete("/user/:id/order/:orderId", (req, res) => {
  const { id, orderId } = req.params
  res.json({ message: `Order ${orderId} for User ${id} Deleted` })
})

module.exports = router
