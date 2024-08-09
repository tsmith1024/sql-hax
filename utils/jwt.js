const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

function sign(payload) {
  return jwt.sign(payload, JWT_SECRET)
}

function verify(token) {
  return jwt.verify(token, JWT_SECRET)
}

function decode(token) {
  return jwt.decode(token)
}

function authorize(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const token = authHeader.split(" ")[1]
  try {
    const payload = decode(token)
    res.locals = payload
    next()
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

module.exports = { sign, verify, decode, authorize }
