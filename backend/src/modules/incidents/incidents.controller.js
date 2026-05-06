export default class IncidentsController {
	constructor(IncidentsService) {
		this.IncidentsService = IncidentsService
	}
	getIncidents(req, res) {
		const query = req.query
		const user = req.user
		const incidents = this.IncidentsService.getIncidents(user, query)
		res.json({ incidents })
	}
}
