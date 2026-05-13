export default class PrioritiesController {
	constructor(service) {
		this.service = service
	}

	async listPriorities(req, res) {
		const priorities = await this.service.listPriorities()
		res.json({ priorities })
	}
}
