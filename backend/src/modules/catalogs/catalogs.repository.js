export default class CatalogsRepository {
	constructor(db) {
		this.db = db
	}

	async listAreas() {
		return this._all(
			"SELECT id, name FROM areas ORDER BY name COLLATE NOCASE",
		)
	}

	async findAreaById(id) {
		return this._get("SELECT id, name FROM areas WHERE id = ?", [id])
	}

	async insertArea(name) {
		return this._runInsert(
			"INSERT INTO areas (name) VALUES (?)",
			[name],
			{ name },
		)
	}

	async updateArea(id, name) {
		return this._runUpdate(
			"UPDATE areas SET name = ? WHERE id = ?",
			[name, id],
		)
	}

	async deleteArea(id) {
		return this._runDelete("DELETE FROM areas WHERE id = ?", [id])
	}

	async listIncidentTypes() {
		return this._all(
			"SELECT id, name FROM types ORDER BY name COLLATE NOCASE",
		)
	}

	async findTypeById(id) {
		return this._get("SELECT id, name FROM types WHERE id = ?", [id])
	}

	async insertIncidentType(name) {
		return this._runInsert(
			"INSERT INTO types (name) VALUES (?)",
			[name],
			{ name },
		)
	}

	async updateIncidentType(id, name) {
		return this._runUpdate(
			"UPDATE types SET name = ? WHERE id = ?",
			[name, id],
		)
	}

	async deleteIncidentType(id) {
		return this._runDelete("DELETE FROM types WHERE id = ?", [id])
	}

	async listStatuses() {
		return this._all(
			"SELECT id, name FROM status ORDER BY id ASC",
		)
	}

	async listRoles() {
		return this._all("SELECT id, name FROM roles ORDER BY id ASC")
	}

	async listPriorities() {
		return this._all(
			"SELECT id, name FROM priorities ORDER BY id ASC",
		)
	}

	_get(sql, params) {
		return new Promise((resolve, reject) => {
			this.db.get(sql, params, (err, row) => {
				if (err) return reject(err)
				resolve(row || null)
			})
		})
	}

	_all(sql, params = []) {
		return new Promise((resolve, reject) => {
			this.db.all(sql, params, (err, rows) => {
				if (err) return reject(err)
				resolve(rows || [])
			})
		})
	}

	_runInsert(sql, params, rowShape) {
		return new Promise((resolve, reject) => {
			this.db.run(sql, params, function (err) {
				if (err) return reject(err)
				resolve({ id: this.lastID, ...rowShape })
			})
		})
	}

	_runUpdate(sql, params) {
		return new Promise((resolve, reject) => {
			this.db.run(sql, params, function (err) {
				if (err) return reject(err)
				resolve({ changes: this.changes })
			})
		})
	}

	_runDelete(sql, params) {
		return new Promise((resolve, reject) => {
			this.db.run(sql, params, function (err) {
				if (err) return reject(err)
				resolve({ changes: this.changes })
			})
		})
	}
}
