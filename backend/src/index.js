import express from "express"

// rutas de cada modulo (cada modulo es un router)

// import incidentRoutes from "./modules/incident/incident.routes.js" -- NO IMPLEMENTADO
// import userRoutes from "./modules/user/user.routes.js" -- NO IMPLEMENTADO
// import resolutionRoutes from "./modules/resolution/resolution.routes.js" -- NO IMPLEMENTADO
// import metricsRoutes from "./modules/metrics/metrics.routes.js" -- NO IMPLEMENTADO
import authRoutes from "./modules/auth/auth.routes.js"

const router = express.Router()

//usar los routers con las rutas de los modulos

// router.use("/incidents", incidentRoutes) -- RUTA NO IMPLEMENTADA
// router.use("/users", userRoutes) -- RUTA NO IMPLEMENTADA
// router.use("/areas", areaRoutes) -- RUTA NO IMPLEMENTADA
// router.use("/resolutions", resolutionRoutes) -- RUTA NO IMPLEMENTADA
// router.use("/metrics", metricsRoutes) -- RUTA NO IMPLEMENTADA
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
