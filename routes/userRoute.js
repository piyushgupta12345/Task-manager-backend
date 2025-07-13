import express from 'express'
import {signupController, loginController, logoutController} from '../controllers/userController.js'

const router = express()

// define routes
router.post('/signup', signupController)
router.post('/login', loginController)
router.post('/logout', logoutController)

export default router