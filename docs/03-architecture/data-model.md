## Incident

Representa un incidente reportado en la planta.

#### Campos

- id: integer (PK)
- type: integer (FK -> type.id)
- area: integer (FK -> area.id)
- description: text
- status: integer (FK -> status.id)
- created_at: datetime
- created_by: integer (FK → user.id)
- assigned_to: integer (FK → User, nullable)
- closed_by: integer (FK → User, nullable)
- closed_at: datetime (nulleable)

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
- lastname: string
- password: string
- role: (FK -> role.id)
- area: integer (FK -> area.id)

#### Reglas

- Un User debe tener un único rol
- Un User solo puede tener un area asignada

---

# Campos requeridos para mediciones

## Area

Representa un area de la empresa.

#### Campos

- id: integer (PK)
- name: string

## Resolution

Representa la resolución de un incidente.

#### Campos

- id: integer (PK)
- incident_id: integer (FK → incident.id)
- solution: text
- root_cause: integer (FK -> root_cause.id)

---

## Types

Representa un tipo de incidente

#### Campos

- id: integer (PK)
- name: string

---

## Roles

representa el rol que tiene el usuario, no es modificado en runtime

#### Campos

- id: integer (PK)
- name: string

---

## Root_causes

Representa la causa raiz de un incidente

#### Campos

- id: integer (PK)
- name: string

---

## Status

Representa el estado de un incidente, no puede ser modificado en runtime

#### Campos

- id: integer (PK)
- name: string

---

# Relaciones

- Un User puede crear muchos Incidents
- Un User puede ser asignado a muchos Incidents
- Una Resolution solo puede tener asignada un Incidents
- Un Insident puede no tener asignado una Resolution
- Un Insident puede tener asignado un maximo de una Resolution
