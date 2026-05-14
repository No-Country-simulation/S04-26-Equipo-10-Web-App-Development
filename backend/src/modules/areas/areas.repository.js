export default class AreasRepository {
	constructor(db) {
		this.db = db
	}

	async listAreas() {
		return this._all(
			"SELECT id, name FROM areas ORDER BY name COLLATE NOCASE",
		)
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
