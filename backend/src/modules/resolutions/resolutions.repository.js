export default class ResolutionsRepository {
	constructor(db) {
		this.db = db
	}
	async createResolution(incidentId, solution, root_cause_id) {
		const query = `INSERT INTO resolutions (incident_id, solution, root_cause_id) VALUES (?, ?, ?)`
		return new Promise((resolve, reject) => {
			this.db.run(query, [incidentId, solution, root_cause_id], function (err) {
				if (err) {
					return reject(err)
				}

				resolve({
					id: this.lastID,
					changes: this.changes,
				})
			})
		})
	}
}
