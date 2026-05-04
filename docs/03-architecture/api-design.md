# Incidents API

---

## POST /login

### Body

{
"name": "juan"
"password": "12345"
}

### Response

{
"token": "abc123"
}

_El token debe estar en el header "autorization" en cada request posterior al login, asi lo validamos y podemos devover y validar rutas_

## GET /incidents

Lista todos los incidentes

### Response

_Array de objetos con los incidentes_

---

## POST /incidents

Crea un nuevo incidente

### Body

{
"type": 1 (type.id),
"area": 1 (area.id),
"description": "La máquina se detuvo"
}

### Response

Los post solo reciben el codigo 201 creado, excepto el login que envia el token

---

## PATCH /incidents/:id/assign

Asigna un incidente a un técnico.

### Body

{
"user_id": 5
}

### Response

{
"message": "Incident assigned successfully",
"assigned_to": 5,
"assigned_at": "timestamp",
}

---

## PATCH /incidents/:id/status

Actualiza el estado de un incidente.

### Body

{
"status": "EN_PROCESO"
}

---

## Estados del sistema

CREADO → ASIGNADO → EN_PROCESO → RESUELTO → CERRADO

---

## Permisos por rol

- **Operador**
  - Crear incidentes
  - Ver incidentes

- **Supervisor**
  - Asignar incidentes
  - Ver incidentes

- **Técnico**
  - Cambiar estado a `EN_PROCESO`
  - Cambiar estado a `RESUELTO`
  - Ver incidentes asignados a él

- **Gerente**
  - Cambiar estado a `CERRADO`
  - Ver métricas

---

## Validaciones

- No se puede cerrar un incidente si no está en `RESUELTO`
- No se puede marcar como `RESUELTO` si no está en `EN_PROCESO`
- No se puede asignar un incidente en estado `CERRADO`
- No se permiten transiciones de estado inválidas

---

# Users API

## GET /users

Lista todos los usuarios.

### Response

Array de objetos con los usuarios y sus datos

---

## GET /users/:id

Obtiene un usuario por ID.

### Response

Objeto correspondiente al usuario

## POST /users

Crea un usuario, protegida

### Body

{
"name": "pepe",
"lastname": "gómez",
"password": "12345",
"role": 1 (role.id),
"area": 2 (area.id)
}

### Response

Responde con un 201 creado o en su defecto estatus de error

# Metricas

## GET /metrics/overview

Resumen general

### Response:

{
"total_incidents": 120,
"open_incidents": 35,
"closed_incidents": 85,
"avg_resolution_time_hours": 6.5
}

## GET /metrics/by-area

Incidentes por área

### Response:

[
{
"area": "Producción",
"total": 50,
"open": 10,
"closed": 40
}
]

## GET /metrics/by-status

Distribución por estado

### Response:

{
"CREATED": 10,
"ASSIGNED": 15,
"IN_PROCESS": 10,
"SOLVED": 5,
"CLOSED": 80
}

## GET /metrics/resolution-time

Tiempo de resolución

### Query params:

area (area.id)

### Response:

{
"avg_hours": 5.2,
"max_hours": 12,
"min_hours": 1.5
}

**Esto se calcula con:
closed_at - created_at**

## GET /metrics/technicians-performance

Performance por técnico

### Response:

[
{
"technician_id": 5,
"name": "Carlos",
"resolved_incidents": 30,
"avg_resolution_time": 4.2
}
]

## POST /resolutions

Crea una resolucion para un ticket.

### Body

{
"incident_id": 1,
"solution": "Se cambio el laser de la impresora",
"root_cause_id": 1
}

## GET /resolutions

Arreglo de objetos con las resoluciones

## PATCH /resolutions/:id

Modifica una resolucion

### Body

{
"solution": "Se cambio el laser y la tinta de la impresora",
"root_cause_id": 2
}

## Area

Representa un área de la empresa.

### GET /areas

Devuelve la lista completa de áreas.

### GET /areas/:id

Devuelve una única área.

### POST /areas

Crea una nueva área.

#### Body

{
"name": "IT"
}

### PATCH /areas/:id

Actualiza el area

#### Body

{
"name": "Nuevo nombre"
}

## Types

Representa un tipo de incidente.

### GET /types

Array de objetos con los tipos

### GET /types/:id

Devuelve un tipo por id

### POST /types

Body:

{
"name": "Bug"
}

### PATCH /types/:id

Modifica un tipo

### Body

{
"name": "Nuevo tipo"
}

## Root Causes

Representa la causa raíz de un incidente.

### GET /root-causes

Obtiene las causas raices

### GET /root-causes/:id

obtiene la causa raiz por id

### POST /root-causes

#### Body

{
"name": "Falla de red"
}

### PATCH /root-causes/:id

Actualiza una causa raiz

#### Body

{
"name": "Nueva causa"
}
