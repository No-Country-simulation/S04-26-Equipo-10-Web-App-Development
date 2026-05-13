export default class IncidentsController {
	constructor(IncidentsService) {
		this.IncidentsService = IncidentsService
	}
	getIncidents = async (req, res, next) => {
		try {
			const query = req.query
			const user = req.user
			const incidents = await this.IncidentsService.getIncidents(user, query)
			res.json({ incidents })
		} catch (e) {
			next(e)
		}
	}
}
