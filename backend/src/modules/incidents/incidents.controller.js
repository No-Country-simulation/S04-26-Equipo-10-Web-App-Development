export default class IncidentsController {
	constructor(IncidentsService) {
		this.IncidentsService = IncidentsService
	}
	async getIncidents(req, res) {
		const query = req.query
		const user = req.user
		const incidents = await this.IncidentsService.getIncidents(user, query)
		res.json({ incidents })
	}
	async createIncident(req, res) {
		try {
			const { type_id, area_id, description } = req.body || {}

			const user = req.user

			const incident = await this.IncidentsService.createIncident({
				type_id,
				area_id,
				description,
				created_by: user.user_id,
			})

			return res.status(201).json(incident)

		} catch (error) {
			if (error.message === "Missing required fields") {
				return res.status(400).json({
					error: error.message,
				})
			}
			if (error.message.includes("SQLITE_CONSTRAINT")) {
				return res.status(400).json({
					error: "Invalid foreign key value",
				})
			}

			return res.status(500).json({
				error: "Internal server error",
			})
		}
	}
}
