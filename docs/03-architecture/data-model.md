## Incident

Representa un incidente reportado en la planta.

#### Campos

- id: integer (PK)
- type: string
- area: integer (FK → Area) 
- description: text
- status: enum
- created_at: datetime
- created_by: integer (FK → User)
- assigned_to: integer (FK → User, nullable)
- closed_by: integer (FK → User, nullable)
- closed_at: datetime

#### Estados del incidente

- CREADO
- ASIGNADO
- EN_PROCESO
- RESUELTO
- CERRADO

#### Reglas

- El estado inicial es `CREADO`
- Solo puede cerrarse si está en `RESUELTO`
- Un Incident solo puede tener un area asignada

---

## User

Representa un usuario del sistema.

#### Campos

- id: integer (PK)
- name: string
- role: enum (OPERATOR, SUPERVISOR, TECHNICIAN, MANAGER)
- area: integer (FK → Area) 

#### Reglas

- Un User debe tener un único rol
- Un User solo puede tener un area asignada

---

## Area

Representa un area de la empresa.

#### Campos

- id: integer (PK)
- name: string

#### Reglas

- 

---
## Resolution

Representa la resolución de un incidente.

#### Campos

- id: integer (PK)
- incident_id: integer (FK → Incident)
- solution: text
- root_cause: string
  
#### Reglas

- 

---

# Relaciones

- Un User puede crear muchos Incidents
- Un User puede ser asignado a muchos Incidents
- Una Resolution solo puede tener asignada un Incidents
- Un Insident puede no tener asignado una Resolution
- Un Insident puede tener asignado un maximo de una Resolution
