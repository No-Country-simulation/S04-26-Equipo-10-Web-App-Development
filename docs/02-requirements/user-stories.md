# 📌 User Stories - Sistema de Gestión de Incidentes (Refinadas)

---

## 🟢 1. Creación de incidentes

### US-01 - Registrar incidente (backend)

**Como** operador  
**Quiero** enviar los datos de un incidente  
**Para** que quede registrado en el sistema

**Criterios de aceptación:**

- Recibe:
  - tipo de incidente
  - área
  - descripción
- El incidente se guarda con estado `CREADO`
- Se registra `created_at`

---

### US-02 - Formulario de incidente (frontend)

**Como** operador  
**Quiero** completar un formulario  
**Para** cargar un incidente fácilmente

**Criterios de aceptación:**

- Campos:
  - tipo
  - área
  - descripción
- Botón de envío disponible

---

### US-03 - Validación de datos

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

### US-04 - Feedback de creación

**Como** operador  
**Quiero** recibir confirmación  
**Para** saber que el incidente fue registrado

**Criterios de aceptación:**

- Mensaje de éxito al crear
- Limpieza del formulario

---

## 🟡 2. Asignación

### US-05 - Listar técnicos

**Como** supervisor  
**Quiero** ver los técnicos disponibles  
**Para** poder asignar un incidente

**Criterios de aceptación:**

- Lista de usuarios con rol técnico

---

### US-06 - Asignar incidente

**Como** supervisor  
**Quiero** asignar un técnico a un incidente  
**Para** delegar su resolución

**Criterios de aceptación:**

- Se selecciona un técnico
- Se guarda asignación (`assigned_to`)
- Se registra `assigned_at`
- El estado cambia a `ASIGNADO`

---

### US-07 - Reasignar incidente

**Como** supervisor  
**Quiero** cambiar el técnico asignado  
**Para** redistribuir la carga de trabajo

**Criterios de aceptación:**

- Se puede cambiar el técnico
- El incidente mantiene consistencia de estado

---

## 🟡 3. Seguimiento

### US-08 - Iniciar trabajo

**Como** técnico  
**Quiero** marcar un incidente como `EN_PROCESO`  
**Para** indicar que estoy trabajando en él

**Criterios de aceptación:**

- Solo incidentes `ASIGNADO` pueden pasar a `EN_PROCESO`
- Se actualiza el estado correctamente

---

### US-09 - Validar transición de estados

**Como** sistema  
**Quiero** controlar los cambios de estado  
**Para** evitar inconsistencias

**Criterios de aceptación:**

- No se permiten saltos inválidos de estado
- Se devuelve error ante transición inválida

---

### US-10 - Visualizar incidentes

**Como** supervisor  
**Quiero** ver la lista de incidentes  
**Para** monitorear el estado general

**Criterios de aceptación:**

- Lista con:
  - estado
  - tipo
  - área
  - responsable
- Filtros por:
  - estado
  - área
  - fecha

---

## 🔵 4. Resolución

### US-11 - Registrar solución

**Como** técnico  
**Quiero** guardar la solución aplicada  
**Para** documentar la resolución del incidente

**Criterios de aceptación:**

- Campo de texto para solución
- Se guarda correctamente

---

### US-12 - Registrar causa raíz

**Como** técnico  
**Quiero** registrar la causa raíz  
**Para** permitir análisis posterior

**Criterios de aceptación:**

- Campo de causa raíz obligatorio
- Se guarda asociado al incidente

---

### US-13 - Marcar incidente como resuelto

**Como** técnico  
**Quiero** marcar el incidente como `RESUELTO`  
**Para** indicar que el problema fue solucionado

**Criterios de aceptación:**

- Solo incidentes `EN_PROCESO`
- Se registra `resolved_at`
- Estado cambia a `RESUELTO`

---

### US-14 - Cerrar incidente

**Como** gerente  
**Quiero** cerrar un incidente resuelto  
**Para** confirmar que está finalizado

**Criterios de aceptación:**

- Solo incidentes `RESUELTO`
- Estado cambia a `CERRADO`
- Se registra `closed_at`

---

## 🧠 5. Sistema (soporte interno)

### US-15 - Manejo de errores

**Como** sistema  
**Quiero** devolver errores claros  
**Para** facilitar el uso y debugging

**Criterios de aceptación:**

- Mensajes de error consistentes
- Códigos de error identificables

---
