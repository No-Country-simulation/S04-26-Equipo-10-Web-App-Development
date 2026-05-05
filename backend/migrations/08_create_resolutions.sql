CREATE TABLE IF NOT EXISTS resolutions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    incident_id INTEGER NOT NULL,
    resolved_by INTEGER,
    notes TEXT,

    FOREIGN KEY (incident_id) REFERENCES incidents(id),
    FOREIGN KEY (resolved_by) REFERENCES users(id)
);