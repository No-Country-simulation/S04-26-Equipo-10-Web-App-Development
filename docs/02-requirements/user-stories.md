# User Stories - Sistema de Gestión de Incidentes

---

## 1. Creación de incidentes

### US-01 - Crear incidente

**Como** operador  
**Quiero** registrar un incidente desde mi celular  
**Para** reportar rápidamente un problema en la línea

**Criterios de aceptación:**

- Puede ingresar:
  - tipo de incidente
  - área
  - descripción
- El incidente se guarda con estado `CREADO`
- Se registra fecha/hora automáticamente
- El formulario es usable desde dispositivos móviles

---

### US-02 - Validación de datos

**Como** sistema  
**Quiero** validar los datos ingresados  
**Para** evitar registros incompletos

**Criterios de aceptación:**

- Campos obligatorios:
  - tipo
  - área
  - descripción
- Se muestran errores si faltan datos

---

## 2. Asignación

### US-03 - Asignar incidente

**Como** supervisor  
**Quiero** asignar un incidente a un técnico  
**Para** que alguien se responsabilice de resolverlo

**Criterios de aceptación:**

- Puede seleccionar un usuario técnico
- El estado cambia a `ASIGNADO`
- Se registra `assigned_at`

---

### US-04 - Reasignar incidente

**Como** supervisor  
**Quiero** reasignar un incidente  
**Para** redistribuir la carga de trabajo

**Criterios de aceptación:**

- Se puede cambiar el técnico asignado
- (Opcional) Se mantiene historial de asignaciones

---

## 3. Seguimiento

### US-05 - Cambiar estado

**Como** técnico  
**Quiero** actualizar el estado del incidente  
**Para** reflejar el progreso

**Criterios de aceptación:**

- Estados permitidos:
  - `EN_PROCESO`
  - `RESUELTO`
- (Opcional) No se pueden saltar estados arbitrariamente

---

### US-06 - Ver incidentes

**Como** supervisor  
**Quiero** ver todos los incidentes  
**Para** monitorear el estado general

**Criterios de aceptación:**

- Lista con:
  - estado
  - tipo
  - área
  - responsable
- Filtros por:
  - estado
  - fecha
  - área

---

## 4. Resolución

### US-07 - Resolver incidente

**Como** técnico  
**Quiero** registrar la solución aplicada  
**Para** cerrar el incidente correctamente

**Criterios de aceptación:**

- Puede ingresar:
  - solución
  - causa raíz
- El estado cambia a `RESUELTO`
- Se registra `resolved_at`

---

### US-08 - Cerrar incidente

**Como** supervisor  
**Quiero** cerrar un incidente resuelto  
**Para** confirmar que está finalizado

**Criterios de aceptación:**

- Solo incidentes en estado `RESUELTO` pueden cerrarse
- El estado final es `CERRADO`

---

## 5. Métricas y análisis

### US-09 - Ver métricas

**Como** gerente  
**Quiero** visualizar métricas de incidentes  
**Para** evaluar el desempeño operativo

**Criterios de aceptación:**

- Visualización de:
  - tiempo promedio de respuesta
  - tiempo promedio de resolución
  - incidentes por tipo
  - incidentes por área

---

### US-10 - Análisis de causa raíz

**Como** gerente  
**Quiero** analizar las causas raíz de los incidentes  
**Para** identificar patrones recurrentes

**Criterios de aceptación:**

- Agrupación por:
  - tipo
  - área
- Visualización por períodos (semanal/mensual)

---
