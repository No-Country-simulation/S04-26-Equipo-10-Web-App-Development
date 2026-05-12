export default class IncidentsRepository {
	constructor(db) {
		this.db = db
	}

	async getIncidents(whereClause, values) {https://github.com/No-Country-simulation/S04-26-Equipo-10-Web-App-Development/pull/30/conflict?name=backend%252Fsrc%252Fmodules%252Fincidents%252Fincidents.repository.js&ancestor_oid=4f212cde602f7d8dd68bfb16312ae480f91cc18f&base_oid=e70647c9841f7138639f20ea8769dc442c04fef4&head_oid=f43ed298b0d9b463149ad337c360b07d94524e91
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
	async getIncidentById(id) {
		const query = `SELECT * FROM incidents WHERE id = ?`
		return new Promise((resolve, reject) => {
			this.db.get(query, id, (err, row) => {
				if (err) {
					return reject(err)
				}
				resolve(row || null)
			})
		})
	}
	async getUserById(id) {
		const query = `SELECT * FROM users WHERE id = ?`
		return new Promise((resolve, reject) => {
			this.db.get(query, id, (err, row) => {
				if (err) {
					return reject(err)
				}
				resolve(row || null)
			})
		})
	}
	async assignTech(techId, incidentId) {
		const query = `
		UPDATE incidents 
		SET assigned_to = ?
		WHERE id = ?
		`

		return new Promise((resolve, reject) => {
			this.db.run(query, [techId, incidentId], (err, row) => {
				if (err) return reject(err)
				resolve({ changes: this.changes })
			})
		})
	}
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
