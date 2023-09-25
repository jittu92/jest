const express = require('express')
const router = express.Router()

const { verifyToken} = require("./../middlewares/token.middleware")

const { userLogin } = require("./../controllers/auth.controller")


router.post("/signin", userLogin)
   

module.exports = router