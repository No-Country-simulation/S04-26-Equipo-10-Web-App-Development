import express from "express"
import db from "../../config/db.js"
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js"
import CatalogsRepository from "./catalogs.repository.js"
import CatalogsService from "./catalogs.service.js"
import CatalogsController from "./catalogs.controller.js"

const router = express.Router()
const repository = new CatalogsRepository(db)
const service = new CatalogsService(repository)
const controller = new CatalogsController(service)

const canManageCatalogs = requireRole(3, 4)

router.get("/areas", requireAuth, controller.listAreas)
router.post("/areas", requireAuth, canManageCatalogs, controller.createArea)
router.put("/areas/:id", requireAuth, canManageCatalogs, controller.updateArea)
router.delete("/areas/:id", requireAuth, canManageCatalogs, controller.deleteArea)

router.get("/incident-types", requireAuth, controller.listIncidentTypes)
router.post(
	"/incident-types",
	requireAuth,
	canManageCatalogs,
	controller.createIncidentType,
)
router.put(
	"/incident-types/:id",
	requireAuth,
	canManageCatalogs,
	controller.updateIncidentType,
)
router.delete(
	"/incident-types/:id",
	requireAuth,
	canManageCatalogs,
	controller.deleteIncidentType,
)

router.get("/priorities", requireAuth, controller.listPriorities)
router.get("/statuses", requireAuth, controller.listStatuses)
router.get("/roles", requireAuth, controller.listRoles)

export default router
