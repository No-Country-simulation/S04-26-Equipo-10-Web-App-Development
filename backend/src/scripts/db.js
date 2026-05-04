import { DatabaseSync } from "node:sqlite"

try {
    console.log("CREANDO ARCHIVO DE BASE DE DATOS...")
    const db = new DatabaseSync('./src/database/database.db')

    console.log("CREANDO TABLAS DE LA BASE DE DATOS...")
    db.exec(`
CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS areas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS root_cause (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    lastname TEXT NOT NULL,
    password TEXT NOT NULL,
    role_id INTEGER NOT NULL,
    area_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (area_id) REFERENCES areas (id)
);

CREATE TABLE IF NOT EXISTS incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type_id INTEGER NOT NULL,
    area_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'CREADO',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL,
    assigned_to INTEGER,
    closed_by INTEGER,
    closed_at DATETIME,
    -- Simulación del ENUM de estados
    CHECK (status IN ('CREADO', 'ASIGNADO', 'EN_PROCESO', 'RESUELTO', 'CERRADO')),
    FOREIGN KEY (type_id) REFERENCES types (id),
    FOREIGN KEY (area_id) REFERENCES areas (id),
    FOREIGN KEY (created_by) REFERENCES users (id),
    FOREIGN KEY (assigned_to) REFERENCES users (id),
    FOREIGN KEY (closed_by) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS resolutions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    incident_id INTEGER NOT NULL UNIQUE,
    solution TEXT NOT NULL,
    root_cause_id INTEGER NOT NULL,
    FOREIGN KEY (incident_id) REFERENCES incidents (id),
    FOREIGN KEY (root_cause_id) REFERENCES root_cause (id)
);`)

    console.log("BASE DE DATO CREADA...")
} catch (error) {
    console.log("HUBO UN ERROR EN LA CREACIÓN DE BASE DE DATOS")
}
