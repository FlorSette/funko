const express = require('express')
const authControllers  = require('../controllers/authControllers')
const authRouter = express.Router()

authRouter.get('/login', authControllers.renderLoginPage)

authRouter.post('/login', authControllers.tryLoginUser)

authRouter.get('/register', authControllers.renderRegisterPage)

authRouter.post('/register', authControllers.tryRegisterANewUser)

authRouter.get('/logout', authControllers.renderLogoutPage)

module.exports = {
    authRouter
}