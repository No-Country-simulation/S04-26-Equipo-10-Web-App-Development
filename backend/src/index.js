import 'dotenv/config';
import express from "express"

// rutas
import incidentRoutes from "./modules/incident/incident.routes.js"

const app = express();

app.use(express.json());

app.use("/incidents", incidentRoutes);

app.get("/health", (req, res) => {
	res.status(200).json({
		status: "ok",
		message: "API running",
		timestamp: new Date().toISOString(),
	})
})

app.use((req, res) => {
	res.status(404).json({
		error: "Not Found",
		message: `Route ${req.originalUrl} not found`,
	})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})