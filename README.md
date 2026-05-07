# 🚧 Rama `develop` – Guía de trabajo

Esta rama es el punto de integración principal del desarrollo. Todo el código nuevo debe pasar por aquí antes de llegar a producción.

---

## 📦 Estructura del proyecto

El proyecto sigue una arquitectura **modular por dominio**:

```
modules/
  ├── incident/
  ├── user/
  ├── area/
  ├── resolution/
  └── metrics/
```

Cada módulo contiene:

- `controller` → maneja request/response
- `service` → lógica de negocio
- `repository` → acceso a datos
- `routes` → definición de endpoints
- `model` → estructura de datos (según ORM)

Flujo interno:

```
Route → Controller → Service → Repository → DB
```

---

## 🌿 Estrategia de ramas

Se utiliza una estrategia basada en **feature branches**.

### Tipos de ramas

- `feature/*` → nuevas funcionalidades
  - Ej: `feature/incidents-endpoints`

- `fix/*` → corrección de errores
  - Ej: `fix/incident-status-validation`

---

## 🔄 Flujo de trabajo

1. Crear una rama desde DEVELOP

   ```
   git branch feature/*funcionalidad
   git switch *rama
   git pull origin develop

   ```

2. Desarrollar cambios siguiendo la estructura del proyecto

3. Hacer commits claros:

   ```
   feat: add incident creation endpoint
   fix: validate incident status transition
   ```

4. Subir la rama:

   ```
   git push origin feature/nombre-feature
   ```

5. Crear Pull Request hacia `develop` una vez terminada la feature

---

## ⚠️ Reglas importantes

- No trabajar directamente sobre `develop`
- Mantener separación clara entre capas
- Respetar la estructura modular
- Validar reglas de negocio (ej: estados de incidentes)

---

## 🚀 Objetivo

Mantener un código:

- Escalable
- Mantenible
- Fácil de extender (especialmente métricas)

---
