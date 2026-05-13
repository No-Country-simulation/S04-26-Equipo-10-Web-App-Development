-- Normaliza etiquetas en bases ya pobladas (ids estables por FKs)
UPDATE status SET name = 'ABIERTO' WHERE id = 1;
UPDATE status SET name = 'ASIGNADO' WHERE id = 2;
UPDATE status SET name = 'EN_PROCESO' WHERE id = 3;
UPDATE status SET name = 'RESUELTO' WHERE id = 4;
UPDATE status SET name = 'CERRADO' WHERE id = 5;

UPDATE roles SET name = 'OPERADOR' WHERE id = 1;
UPDATE roles SET name = 'TECNICO' WHERE id = 2;
UPDATE roles SET name = 'SUPERVISOR' WHERE id = 3;
UPDATE roles SET name = 'GERENTE_PLANTA' WHERE id = 4;
