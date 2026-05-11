import fs from "fs"
import path from "path"
import sqlite3 from "sqlite3"

import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB_FILE = path.join(__dirname, "../../database.sqlite")
// const DB_FILE = "./database.sqlite"
const MIGRATIONS_DIR = path.join(__dirname, "../migrations")
const SEED_FILE = path.join(__dirname, "../seeds/seed_base.sql")

// Crear conexión
const db = new sqlite3.Database(DB_FILE)

// Activar FK
db.serialize(() => {
	db.run("PRAGMA foreign_keys = ON;")
})

// Leer migraciones ordenadas
const migrationFiles = fs
	.readdirSync(MIGRATIONS_DIR)
	.filter((file) => file.endsWith(".sql"))
	.sort()

console.log("🚀 Running migrations...")

db.serialize(() => {
	for (const file of migrationFiles) {
		const filePath = path.join(MIGRATIONS_DIR, file)
		const sql = fs.readFileSync(filePath, "utf-8")

		console.log(`➡️  Executing ${file}`)
		db.exec(sql)
	}

	console.log("🌱 Running seed...")
	const seedSQL = fs.readFileSync(SEED_FILE, "utf-8")
	db.exec(seedSQL)

	console.log("✅ Done.")
})

// Cerrar conexión
db.close()
