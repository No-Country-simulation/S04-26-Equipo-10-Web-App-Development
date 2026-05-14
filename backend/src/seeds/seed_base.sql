INSERT OR IGNORE INTO roles (id, name) VALUES
(1, 'OPERADOR'),
(2, 'TECNICO'),
(3, 'SUPERVISOR'),
(4, 'GERENTE_PLANTA');

INSERT OR IGNORE INTO status (id, name) VALUES
(1, 'ABIERTO'),
(2, 'ASIGNADO'),
(3, 'EN_PROCESO'),
(4, 'RESUELTO'),
(5, 'CERRADO');

INSERT OR IGNORE INTO priorities (id, name) VALUES
(1, 'ALTA'),
(2, 'MEDIA'),
(3, 'BAJA'),
(4, 'NO_ASIGNADA');


INSERT OR IGNORE INTO areas (id, name) VALUES
(1, 'IT'),
(2, 'HR'),
(3, 'FINANCE'),
(4, 'OPERATIONS');

INSERT OR IGNORE INTO types (id, name) VALUES
(1, 'HARDWARE'),
(2, 'SOFTWARE'),
(3, 'NETWORK');

INSERT OR IGNORE INTO root_cause (id, name) VALUES
(1, 'USER_ERROR'),
(2, 'SYSTEM_FAILURE'),
(3, 'NETWORK_ISSUE');

INSERT OR IGNORE INTO users (name, lastname, password, role_id, area_id) VALUES
-- Operators
('Juan', 'Perez', '123456', 1, 1),
('Ana', 'Lopez', '123456', 1, 2),

-- Technicians
('Carlos', 'Gomez', '123456', 2, 1),
('Laura', 'Martin', '123456', 2, 3),

-- Supervisors
('Sofia', 'Rodriguez', '123456', 3, 2),
('Miguel', 'Gonzales', '123456', 3, 4),

-- Managers
('CEO', 'Uno', '123456', 4, 1),
('CEO', 'Dos', '123456', 4, 3);

