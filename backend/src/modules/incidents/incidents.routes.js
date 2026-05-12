import express from "express"
import db from "../../config/db.js"
import IncidentsController from "./incidents.controller.js"
import IncidentsService from "./incidents.service.js"
import IncidentsRepository from "./incidents.repository.js"
import { requireAuth } from "../../middlewares/auth.middleware.js"

const router = express.Router()
const incidentsRepository = new IncidentsRepository(db)
const incidentsService = new IncidentsService(incidentsRepository)
const incidentsController = new IncidentsController(incidentsService)

router.get("/incidents", requireAuth, incidentsController.getIncidents)
router.patch(
	"incidents/:id/assign",
	requireAuth,
	requireRole(3, 4),
	incidentsController.assignIncident,
router.get("/", requireAuth, (req, res) =>
  incidentsController.getIncidents(req, res)
)

router.post(
	"/",
	requireAuth,
	(req, res) => incidentsController.createIncident(req, res),
)
export default router
