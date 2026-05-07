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

	res.status(err.status || 500).json({
		error: "Internal Server Error",
		message: err.message || "Unexpected error",
	})
})

export default app
