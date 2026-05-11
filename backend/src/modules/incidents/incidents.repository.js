export default class IncidentsRepository {
	constructor(db) {
		this.db = db
	}

	async getIncidents(whereClause, values) {
		const query = `
			SELECT * FROM incidents
			${whereClause}
			LIMIT ? OFFSET ?
		`

		return new Promise((resolve, reject) => {
			this.db.all(query, values, (err, rows) => {
				if (err) return reject(err)

				resolve(rows || [])
			})
		})
	}

	async createIncident({
		type_id,
		area_id,
		description,
		status_id,
		created_by,
	}) {
		const query = `
			INSERT INTO incidents (
				type_id,
				area_id,
				description,
				status_id,
				created_by
			)
			VALUES (?, ?, ?, ?, ?)
		`

		return new Promise((resolve, reject) => {
			this.db.run(
				query,
				[
					type_id,
					area_id,
					description,
					status_id,
					created_by,
				],
				function (err) {
					if (err) return reject(err)

					resolve({
						id: this.lastID,
						type_id,
						area_id,
						description,
						status_id,
						created_by,
					})
				},
			)
		})
	}
}