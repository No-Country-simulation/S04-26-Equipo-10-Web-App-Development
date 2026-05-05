CREATE TABLE IF NOT EXISTS incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    user_id INTEGER,
    type_id INTEGER,
    status_id INTEGER,
    area_id INTEGER,
    root_cause_id INTEGER,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (type_id) REFERENCES types(id),
    FOREIGN KEY (status_id) REFERENCES status(id),
    FOREIGN KEY (area_id) REFERENCES areas(id),
    FOREIGN KEY (root_cause_id) REFERENCES root_cause(id)
);