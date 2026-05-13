import express from "express"
import db from "../../config/db.js"
import { AuthController } from "./auth.controller.js"
import { AuthService } from "./auth.service.js"
import { AuthRepository } from "./auth.repository.js"
import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js"

const router = express.Router()
const authRepository = new AuthRepository(db)
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

router.post("/login", asyncHandler(authController.login.bind(authController)))

export default router
