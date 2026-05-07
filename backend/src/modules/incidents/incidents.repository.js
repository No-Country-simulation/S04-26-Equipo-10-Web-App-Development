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
}
