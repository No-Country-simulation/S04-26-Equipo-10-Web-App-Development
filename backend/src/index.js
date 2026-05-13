import express from "express"

// rutas de cada modulo (cada modulo es un router)
import incidentRoutes from "./modules/incidents/incidents.routes.js"
import authRoutes from "./modules/auth/auth.routes.js"
import catalogRoutes from "./modules/catalogs/catalogs.routes.js"

const router = express.Router()

//usar los routers con las rutas de los modulos
router.use("/incidents", incidentRoutes)
router.use("/auth", authRoutes)
router.use("/catalogs", catalogRoutes)

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
