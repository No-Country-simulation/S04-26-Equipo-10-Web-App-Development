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
	async findTypeById(id) {
		return new Promise((resolve, reject) => {
			this.db.get(
				"SELECT id FROM types WHERE id = ?",
				[id],
				(err, row) => {
					if (err) return reject(err);
					resolve(row);
				}
			);
		});
	}

	async findAreaById(id) {
		return new Promise((resolve, reject) => {
			this.db.get(
				"SELECT id FROM areas WHERE id = ?",
				[id],
				(err, row) => {
					if (err) return reject(err);
					resolve(row);
				}
			);
		});
	}
}