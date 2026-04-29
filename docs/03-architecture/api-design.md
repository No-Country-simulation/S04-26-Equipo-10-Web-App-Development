# 📌 Incidents API

---

## 📄 GET /incidents

Lista todos los incidentes.

### Query params (opcionales)

- `status`
- `area`
- `from_date`
- `to_date`

### Response

[
{
"id": 1,
"type": "machine_failure",
"area": "linea_1",
"status": "CREADO",
"assigned_to": 5,
"created_at": "timestamp"
}
]

---

## 🟢 POST /incidents

Crea un nuevo incidente.

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

---

## 🟡 PATCH /incidents/:id/assign

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
"status": "ASIGNADO"
}

---

## 🔄 PATCH /incidents/:id/status

Actualiza el estado de un incidente.

### Body

{
"status": "EN_PROCESO"
}

---

## 🔁 Estados del sistema

CREADO → ASIGNADO → EN_PROCESO → RESUELTO → CERRADO

---

## 👥 Permisos por rol

- **Operador**
  - Crear incidentes

- **Supervisor**
  - Asignar incidentes

- **Técnico**
  - Cambiar estado a `EN_PROCESO`
  - Cambiar estado a `RESUELTO`

- **Gerente**
  - Cambiar estado a `CERRADO`

---

## ⚠️ Validaciones

- No se puede cerrar un incidente si no está en `RESUELTO`
- No se puede marcar como `RESUELTO` si no está en `EN_PROCESO`
- No se puede asignar un incidente en estado `CERRADO`
- No se permiten transiciones de estado inválidas

---

## ❌ Errores (formato estándar)

{
"error": "INVALID_STATE",
"message": "No se puede cerrar un incidente no resuelto"
}

---

# 👥 Users API

---

## 📄 GET /users

Lista todos los usuarios.

### Response

[
{
"id": 1,
"name": "Juan",
"role": "TECHNICIAN"
}
]

---

## 📄 GET /users/:id

Obtiene un usuario por ID.

### Response

{
"id": 1,
"name": "Juan",
"role": "TECHNICIAN"
}

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
"CREADO": 10,
"ASIGNADO": 15,
"EN_PROCESO": 10,
"RESUELTO": 5,
"CERRADO": 80
}

## GET /metrics/resolution-time

Tiempo de resolución

### Query params:

area
technician
date_from
date_to

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

## GET /metrics/incidents-trend

Incidentes en el tiempo

### Query params:

group_by: day | week | month
[
{
"date": "2026-04-01",
"count": 12
}
]
