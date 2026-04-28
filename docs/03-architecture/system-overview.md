# System Overview

## Descripción general

El Sistema de Gestión de Incidentes permite registrar, gestionar y analizar incidentes ocurridos en una planta industrial.  
Facilita la trazabilidad completa desde la detección hasta el cierre, incluyendo asignación, resolución y análisis de causas raíz.

## Objetivos

- Centralizar el registro de incidentes
- Mejorar la trazabilidad
- Medir tiempos de respuesta y resolución
- Facilitar el análisis de causa raíz

## Actores

- Operador: crea incidentes
- Supervisor: asigna y monitorea
- Técnico: resuelve incidentes
- Gerente: analiza métricas y cierra incidentes

## Flujo principal

1. El operador crea un incidente
2. El supervisor lo asigna a un técnico
3. El técnico comienza el trabajo (`EN_PROCESO`)
4. El técnico registra la solución (`RESUELTO`)
5. El gerente valida y cierra el incidente (`CERRADO`)

## Estados del incidente

- CREADO
- ASIGNADO
- EN_PROCESO
- RESUELTO
- CERRADO

## Arquitectura

El sistema está compuesto por tres capas principales:

### Frontend

Framework: React + Vite
Estilos: Tailwind CSS
Componentes: Shadcn
Librerías: Zustand, React Hook Form + Zod, Recharts.
Estructura de carpeta básica propuesta:
src/
├── components/
│   ├── ui/               
│   └── shared/           
├── features/
│   ├── reporting/         
│   ├── assignment/        
│   ├── workflow/          
│   └── dashboard/         
├── hooks/                 
└── store/                 

### Backend

API REST desarrollada en Node.js con Express.
Gestiona la lógica de negocio, validaciones y control de estados de los incidentes.

### Base de Datos

Sistema relacional que almacena incidentes, usuarios, (resoluciones e historial ?)

---

## Interacción entre componentes

1. El usuario interactúa con la aplicación React
2. El frontend envía solicitudes HTTP a la API REST
3. La API valida los datos y aplica reglas de negocio
4. La API persiste la información en la base de datos
5. La API devuelve la respuesta al frontend
6. El frontend actualiza la interfaz de usuario
