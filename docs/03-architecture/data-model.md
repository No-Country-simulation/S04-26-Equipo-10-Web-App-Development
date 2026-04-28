## Incident

Representa un incidente reportado en la planta.

#### Campos

- id: integer (PK)
- type: string
- area: string
- description: text
- status: enum
- created_at: datetime
- created_by: integer (FK → User)
- assigned_to: integer (FK → User, nullable)
- closed_by: integer (FK → User, nullable)

#### Estados del incidente

- CREADO
- ASIGNADO
- EN_PROCESO
- RESUELTO
- CERRADO

#### Reglas

- El estado inicial es `CREADO`
- Solo puede cerrarse si está en `RESUELTO`

---

## User

Representa un usuario del sistema.

#### Campos

- id: integer (PK)
- name: string
- role: enum (OPERATOR, SUPERVISOR, TECHNICIAN, MANAGER)

#### Reglas

- Un usuario debe tener un único rol

---

## Resolution

Representa la resolución de un incidente.

#### Campos

- id: integer (PK)
- incident_id: integer (FK → Incident)
- solution: text
- root_cause: string

# Relaciones

- Un User puede crear muchos Incidents
- Un User puede ser asignado a muchos Incidents
