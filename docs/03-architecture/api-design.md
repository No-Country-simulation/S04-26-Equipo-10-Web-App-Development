Claro. Te lo dejo completamente en Markdown limpio, listo para copiar directo a tu repo sin ajustes.

---

````markdown
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

```json
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
```
````

---

## 🟢 POST /incidents

Crea un nuevo incidente.

### Body

```json
{
	"type": "machine_failure",
	"area": "linea_1",
	"description": "La máquina se detuvo"
}
```

### Response

```json
{
	"id": 1,
	"status": "CREADO",
	"created_at": "timestamp"
}
```

---

## 🟡 PATCH /incidents/:id/assign

Asigna un incidente a un técnico.

### Body

```json
{
	"user_id": 5
}
```

### Response

```json
{
	"message": "Incident assigned successfully",
	"assigned_to": 5,
	"assigned_at": "timestamp",
	"status": "ASIGNADO"
}
```

---

## 🔄 PATCH /incidents/:id/status

Actualiza el estado de un incidente.

### Body

```json
{
	"status": "EN_PROCESO"
}
```

---

## 🔁 Estados del sistema

```
CREADO → ASIGNADO → EN_PROCESO → RESUELTO → CERRADO
```

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

```json
{
	"error": "INVALID_STATE",
	"message": "No se puede cerrar un incidente no resuelto"
}
```

---

# 👥 Users API

---

## 📄 GET /users

Lista todos los usuarios.

### Response

```json
[
	{
		"id": 1,
		"name": "Juan",
		"role": "TECHNICIAN"
	}
]
```

---

## 📄 GET /users/:id

Obtiene un usuario por ID.

### Response

```json
{
	"id": 1,
	"name": "Juan",
	"role": "TECHNICIAN"
}
```

```

---

Si más adelante querés dejar esto **nivel documentación tipo Swagger/OpenAPI**, también lo podemos convertir. Eso ya te deja la API lista para probar con herramientas automáticamente.
```
