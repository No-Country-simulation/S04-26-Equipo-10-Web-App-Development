import express from "express"
import db from "../../config/db.js"
import AuthController from "./auth.controller.js"
import AuthService from "./auth.service.js"
import AuthRepository from "./auth.repository.js"
// import requireAuth from "../../middlewares/requireAuth.js"

const router = express.Router()
const authRepository = new AuthRepository(db)
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

router.post("/login", authController.login)

export default router
