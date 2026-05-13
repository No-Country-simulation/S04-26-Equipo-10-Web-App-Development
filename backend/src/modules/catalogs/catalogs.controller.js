export default class CatalogsController {
	constructor(service) {
		this.service = service
	}

	listAreas = async (req, res, next) => {
		try {
			const areas = await this.service.listAreas()
			res.json({ areas })
		} catch (e) {
			next(e)
		}
	}

	createArea = async (req, res, next) => {
		try {
			const area = await this.service.createArea(req.body)
			res.status(201).json({ area })
		} catch (e) {
			next(e)
		}
	}

	updateArea = async (req, res, next) => {
		try {
			const area = await this.service.updateArea(req.params.id, req.body)
			res.json({ area })
		} catch (e) {
			next(e)
		}
	}

	deleteArea = async (req, res, next) => {
		try {
			await this.service.deleteArea(req.params.id)
			res.status(204).send()
		} catch (e) {
			next(e)
		}
	}

	listIncidentTypes = async (req, res, next) => {
		try {
			const incidentTypes = await this.service.listIncidentTypes()
			res.json({ incidentTypes })
		} catch (e) {
			next(e)
		}
	}

	createIncidentType = async (req, res, next) => {
		try {
			const incidentType = await this.service.createIncidentType(req.body)
			res.status(201).json({ incidentType })
		} catch (e) {
			next(e)
		}
	}

	updateIncidentType = async (req, res, next) => {
		try {
			const incidentType = await this.service.updateIncidentType(
				req.params.id,
				req.body,
			)
			res.json({ incidentType })
		} catch (e) {
			next(e)
		}
	}

	deleteIncidentType = async (req, res, next) => {
		try {
			await this.service.deleteIncidentType(req.params.id)
			res.status(204).send()
		} catch (e) {
			next(e)
		}
	}

	listStatuses = async (req, res, next) => {
		try {
			const statuses = await this.service.listStatuses()
			res.json({ statuses })
		} catch (e) {
			next(e)
		}
	}

	listRoles = async (req, res, next) => {
		try {
			const roles = await this.service.listRoles()
			res.json({ roles })
		} catch (e) {
			next(e)
		}
	}

	listPriorities = async (req, res, next) => {
		try {
			const priorities = await this.service.listPriorities()
			res.json({ priorities })
		} catch (e) {
			next(e)
		}
	}
}
