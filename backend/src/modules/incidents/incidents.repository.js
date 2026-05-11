export default class IncidentsRepository {
	constructor(db) {
		this.db = db
	}
	async findIncidents(whereClause, values) {
		const query = `
    SELECT * FROM incidents
    ${whereClause}
    LIMIT ? OFFSET ?
  `
		return new Promise((resolve, reject) => {
			this.db.get(query, values, (err, row) => {
				if (err) return reject(err)
				resolve(row || null)
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
