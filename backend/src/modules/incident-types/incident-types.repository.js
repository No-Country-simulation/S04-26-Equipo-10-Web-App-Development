export default class IncidentTypesRepository {
	constructor(db) {
		this.db = db
	}

	async listIncidentTypes() {
		return this._all(
			"SELECT id, name FROM types ORDER BY name COLLATE NOCASE",
		)
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
