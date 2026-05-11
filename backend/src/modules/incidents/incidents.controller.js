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
	async assignIncident(req, res) {
		const { technician_id } = req.body
		const { id } = req.params
		incident = await this.IncidentsService.assignTechnician(
			Number(technician_id),
			Number(id),
		)
		res.json({ msg: "Assignded succesfully", incident })
	}
}
