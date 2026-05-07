import express from "express"

// rutas de cada modulo (cada modulo es un router)
import incidentRoutes from "./modules/incident/incident.routes.js"
import userRoutes from "./modules/user/user.routes.js"
import resolutionRoutes from "./modules/resolution/resolution.routes.js"
import metricsRoutes from "./modules/metrics/metrics.routes.js"
import authRoutes from "./modules/auth/auth.routes.js"

const router = express.Router()

//usar los routers con las rutas de los modulos
router.use("/incidents", incidentRoutes)
router.use("/users", userRoutes)
router.use("/areas", areaRoutes)
router.use("/resolutions", resolutionRoutes)
router.use("/metrics", metricsRoutes)
router.use("/auth", authRoutes)

// check de estado de la api
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
