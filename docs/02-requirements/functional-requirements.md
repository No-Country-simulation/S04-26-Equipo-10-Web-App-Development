# Requerimientos Funcionales

---

## RF-01 - Crear incidente

**Actor:** Operador  
**Descripción:** El sistema debe permitir registrar un nuevo incidente desde un dispositivo móvil.

**Entradas:**

- tipo de incidente
- área
- descripción

**Proceso:**

- Validar campos obligatorios

**Salidas:**

- Incidente creado con estado `CREADO`
- Registro de `created_at`

---

## RF-02 - Validar datos de incidente

**Actor:** Sistema  
**Descripción:** El sistema debe validar que los datos ingresados sean completos antes de crear un incidente.

**Entradas:**

- datos del formulario

**Salidas:**

- Mensaje de error si faltan campos obligatorios

---

## RF-03 - Asignar incidente

**Actor:** Supervisor  
**Descripción:** El sistema debe permitir asignar un incidente a un técnico.

**Entradas:**

- ID del incidente
- ID del técnico

**Proceso:**

- Verificar que el incidente exista

**Salidas:**

- Estado actualizado a `ASIGNADO`
- Registro de `assigned_at`

---

## RF-04 - Reasignar incidente

**Actor:** Supervisor  
**Descripción:** El sistema debe permitir cambiar el técnico asignado a un incidente.

**Entradas:**

- ID del incidente
- nuevo técnico

**Salidas:**

- Técnico actualizado

---

## RF-05 - Cambiar estado de incidente

**Actor:** Técnico  
**Descripción:** El sistema debe permitir actualizar el estado del incidente.

**Entradas:**

- ID del incidente
- nuevo estado

**Restricciones:**

- Estados permitidos:
  - `EN_PROCESO`
  - `RESUELTO`

**Salidas:**

- Estado actualizado

---

## RF-06 - Visualizar incidentes

**Actor:** Supervisor  
**Descripción:** El sistema debe permitir visualizar una lista de incidentes.

**Entradas:**

- filtros opcionales:
  - estado
  - área
  - fecha

**Salidas:**

- Lista de incidentes filtrada

---

## RF-07 - Registrar resolución

**Actor:** Técnico  
**Descripción:** El sistema debe permitir registrar la solución y causa raíz de un incidente.

**Entradas:**

- ID del incidente
- solución aplicada
- causa raíz

**Restricciones:**

- Solo incidentes en estado `EN_PROCESO`

**Salidas:**

- Estado actualizado a `RESUELTO`
- Registro de `resolved_at`

---

## RF-08 - Cerrar incidente

**Actor:** Gerente  
**Descripción:** El sistema debe permitir cerrar un incidente previamente resuelto.

**Entradas:**

- ID del incidente

**Restricciones:**

- Solo incidentes en estado `RESUELTO`
- Solo usuarios con rol Gerente pueden ejecutar esta acción

**Salidas:**

- Estado actualizado a `CERRADO`
- Registro de `closed_at`

---

## RF-09 - Consultar métricas

**Actor:** Gerente  
**Descripción:** El sistema debe permitir visualizar métricas de desempeño.

**Salidas:**

- tiempo promedio de respuesta
- tiempo promedio de resolución
- incidentes por tipo
- incidentes por área

---

## RF-10 - Analizar causa raíz

**Actor:** Gerente  
**Descripción:** El sistema debe permitir analizar las causas raíz de los incidentes.

**Salidas:**

- agrupación por tipo
- agrupación por área
- visualización por período

---
