import "dotenv/config"
import express from "express"

import incidentsRoutes from "./modules/incidents/incidents.routes.js"
import authRoutes from "./modules/auth/auth.routes.js"
import catalogRoutes from "./modules/catalogs/catalogs.routes.js"

const router = express.Router()

router.use("/incidents", incidentsRoutes)
router.use("/auth", authRoutes)
router.use("/catalogs", catalogRoutes)

router.get("/health", (req, res) => {
	res.status(200).json({
		status: "ok",
		message: "API running",
		timestamp: new Date().toISOString(),
	})
})

router.use((req, res) => {
	res.status(404).json({
		error: "Not Found",
		message: `Route ${req.originalUrl} not found`,
	})
})

export default router
