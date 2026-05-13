export default class PrioritiesRepository {
	constructor(db) {
		this.db = db
	}

	async listPriorities() {
		return this._all(
			"SELECT id, name FROM priorities ORDER BY id ASC",
		)
	}

	_all(sql, params = []) {
		return new Promise((resolve, reject) => {
			this.db.all(sql, params, (err, rows) => {
				if (err) return reject(err)
				resolve(rows || [])
			})
		})
	}
}
