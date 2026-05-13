import express from "express"
import db from "../../config/db.js"
import { requireAuth } from "../../middlewares/auth.middleware.js"
import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js"
import PrioritiesRepository from "./priorities.repository.js"
import PrioritiesService from "./priorities.service.js"
import PrioritiesController from "./priorities.controller.js"

const router = express.Router()
const repository = new PrioritiesRepository(db)
const service = new PrioritiesService(repository)
const controller = new PrioritiesController(service)

router.get(
	"/",
	requireAuth,
	asyncHandler(controller.listPriorities.bind(controller)),
)

export default router
