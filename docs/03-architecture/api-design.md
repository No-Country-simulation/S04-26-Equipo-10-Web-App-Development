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
