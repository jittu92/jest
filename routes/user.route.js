const express = require('express')
const router = express.Router()

const { verifyToken } = require("./../middlewares/token.middleware")


const { getAllUser } = require("./../controllers/user.controller")


router.get("/all", verifyToken, getAllUser)

   

module.exports = router