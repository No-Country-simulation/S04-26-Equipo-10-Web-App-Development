# Incidents API

## GET /incidents

Listar los incidentes.

## POST /incidents

Creacion de un incidente nuevo.

### Body

{
"type": "machine_failure",
"area": "linea_1",
"description": "La máquina se detuvo"
}

### Response

{
"id": 1,
"status": "CREADO",
"created_at": "timestamp"
}

## PATCH /incidents/:id/assign

Asignar un incidente a un tecnico.

### Body

{
"user_id": 5
}

## PATCH /incidents/:id/status

Cambiar de estado un incidente, tener en cuenta que dependiendo del rol del usuario tendrá diferentes posibilidades.
**Estados válidos**: CREADO → ASIGNADO → EN_PROCESO → RESUELTO → CERRADO

- Operador → crear
- Supervisor → asignar
- Técnico → resolver
- Gerente → cerrar

**Validaciones**

- No podés cerrar si no está RESUELTO
- No podés resolver si no está EN_PROCESO
- No podés asignar si ya está cerrado

### Body

{
"status": "EN_PROCESO"
}

### Users

**GET /users**
**GET /users/:id**
