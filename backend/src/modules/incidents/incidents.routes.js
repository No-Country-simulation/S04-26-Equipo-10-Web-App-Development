import express from "express"
import db from "../../config/db.js"
import IncidentsController from "./incidents.controller.js"
import IncidentsService from "./incidents.service.js"
import IncidentsRepository from "./incidents.repository.js"
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js"
import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js"

const router = express.Router()
const incidentsRepository = new IncidentsRepository(db)
const incidentsService = new IncidentsService(incidentsRepository)
const incidentsController = new IncidentsController(incidentsService)

router.patch(
	"/:id/assign",
	requireAuth,
	requireRole(3, 4),
	asyncHandler(incidentsController.assignIncident.bind(incidentsController)),
)
router.get(
	"/",
	requireAuth,
	asyncHandler(incidentsController.getIncidents.bind(incidentsController)),
)

router.post(
	"/",
	requireAuth,
	asyncHandler(incidentsController.createIncident.bind(incidentsController)),
)
export default router
