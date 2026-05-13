// Importamos express
import express from "express"

// Importamos el router principal (todas las rutas)
import routes from "./index.js"

const app = express()

//middlewares
app.use(express.json())

//prefijo global de api
app.use("/api", routes)

app.use((err, req, res, next) => {
	console.error("Error:", err)

	const status = err.status && Number(err.status) >= 400 ? err.status : 500
	const body =
		status >= 500
			? { error: "Internal Server Error", message: "Unexpected error" }
			: { error: err.message || "Error", message: err.message }

	res.status(status).json(body)
})
export default app
