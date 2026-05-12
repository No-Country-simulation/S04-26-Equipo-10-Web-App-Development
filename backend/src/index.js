import "dotenv/config"
import express from "express"

// rutas
import incidentsRoutes from "./modules/incidents/incidents.routes.js"
import authRoutes from "./modules/auth/auth.routes.js"

const app = express()

app.use(express.json())

app.use("/incidents", incidentsRoutes)
app.use("/auth", authRoutes)

export default app
