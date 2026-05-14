export default class RolesRepository {
	constructor(db) {
		this.db = db
	}

	async listRoles() {
		return this._all("SELECT id, name FROM roles ORDER BY id ASC")
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
