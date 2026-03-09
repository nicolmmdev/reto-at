# BetDay Lite

BetDay Lite es una aplicación web que permite visualizar partidos del día, seleccionar apuestas deportivas y confirmarlas mediante un **panel de apuestas**.

La aplicación implementa un flujo simplificado de una plataforma de apuestas deportivas, incluyendo selección de mercados, gestión de apuestas y visualización del historial.

El sistema está desarrollado utilizando **Next.js (App Router)**, **Zustand** para manejo de estado global y **NextAuth** para autenticación.

---

# Demo

Deployment realizado en **Vercel**

https://reto-at.vercel.app/

---

# Tecnologías utilizadas

## Frontend

- Next.js (App Router)
- React
- TypeScript

## Manejo de estado

- Zustand

## Autenticación

- NextAuth

## Estilos

- CSS responsive
- Diseño mobile-first

## Deploy

- Vercel

---

# Arquitectura de la aplicación

La aplicación sigue una arquitectura modular separando responsabilidades entre:

- UI
- Estado global
- Servicios
- Autenticación
- Routing

```
Frontend (Next.js)

Pages
├ Home (/)
├ Login (/login)
├ Profile (/profile)
└ Bet Detail (/bets/[betId])

State Layer
└ Zustand Store
   ├ bets
   └ placedBets

Auth Layer
└ NextAuth

API Layer
└ /api/matches
```

---

# Funcionalidades principales

## Home – Timeline de partidos

Ruta:

```
/
```

La página principal muestra los partidos del día en formato **timeline**.

Cada partido incluye:

- Liga
- Equipos
- Mercado **1X2**
  - HOME
  - DRAW
  - AWAY

Cuando el usuario selecciona una cuota:

1. Se crea una apuesta
2. Se guarda en el estado global (`bets`)
3. Aparece automáticamente en el panel de apuestas

---

# Panel de apuestas

El panel de apuestas aparece en el lado derecho en desktop y adaptado para mobile.

Funcionalidades:

- Lista de apuestas seleccionadas
- Campo para ingresar el **stake**
- Cálculo automático de **ganancia potencial**

Fórmula utilizada:

```
potentialWin = stake * odd
```

Validación:

```
stake > 0
```

Cuando el usuario confirma la apuesta:

```
bets → placedBets
```

Las apuestas confirmadas pasan al historial.

---

# Confirmación de apuestas con autenticación

Para evitar que usuarios no autenticados puedan registrar apuestas, se implementó una validación de sesión utilizando **NextAuth**.

Flujo implementado:

1. El usuario presiona **Realizar apuesta**
2. El sistema verifica la sesión con `useSession()`
3. Si el usuario **no está autenticado**, se redirige a:

```
/login
```

4. Si el usuario **está autenticado**, la apuesta se confirma y pasa a `placedBets`.

---

# Profile – Historial de apuestas

Ruta protegida:

```
/profile
```

El acceso está controlado mediante **NextAuth**.

En esta página se muestran únicamente las apuestas confirmadas (`placedBets`).

Si no existen apuestas confirmadas se muestra un **empty state**.

---

# Detalle de apuesta

Ruta dinámica:

```
/bets/[betId]
```

Esta página muestra información completa de una apuesta:

- Partido
- Selección realizada
- Odd
- Stake
- Ganancia potencial
- Estado de la apuesta

---

# Manejo de estado global

Se utiliza **Zustand** para manejar el estado global de la aplicación.

El store contiene dos estados principales:

```
bets
placedBets
```

### bets

Contiene las apuestas seleccionadas que aún no han sido confirmadas.

Representa el estado actual del panel de apuestas.

### placedBets

Contiene las apuestas confirmadas por el usuario.

Estas apuestas aparecen en:

```
/profile
```

---

# Flujo completo de apuestas

1. El usuario entra a la página principal  
2. Selecciona una cuota de un partido  
3. La apuesta se guarda en `bets`  
4. La apuesta aparece en el panel de apuestas  
5. El usuario ingresa un **stake**  
6. El sistema calcula la ganancia potencial  
7. El usuario presiona **Realizar apuesta**  
8. El sistema valida la sesión  
9. Si no está autenticado → redirección a `/login`  
10. Si está autenticado → apuesta pasa a `placedBets`  
11. La apuesta aparece en `/profile`  

---

# API

Endpoint implementado:

```
GET /api/matches
```

Este endpoint devuelve los partidos del día.

Ejemplo de respuesta:

```json
{
  "matches": [
    {
      "id": "1",
      "league": "Premier League",
      "homeTeam": { "name": "Arsenal" },
      "awayTeam": { "name": "Chelsea" },
      "market": {
        "odds": {
          "home": 1.9,
          "draw": 3.2,
          "away": 4.1
        }
      }
    }
  ]
}
```

---

# Autenticación

La autenticación está implementada con **NextAuth** usando **Credentials Provider**.

Las sesiones se utilizan para:

- controlar acceso a rutas protegidas
- validar confirmación de apuestas

Ruta protegida:

```
/profile
```

Si el usuario no tiene sesión activa, el sistema redirige automáticamente a:

```
/login
```

---

# Instalación y ejecución

Clonar el repositorio:

```
git clone https://github.com/nicolmmdev/reto-at.git
```

Entrar al proyecto:

```
cd reto-at
```

Instalar dependencias:

```
npm install
```

Ejecutar en desarrollo:

```
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:3000
```

---

# Estructura del proyecto

```
betday-lite
│
├ app
│   ├ api
│   │   └ matches
│   │
│   ├ bet
│   ├ bets
│   │   └ [betId]
│   │
│   ├ login
│   ├ profile
│   │
│   ├ layout.tsx
│   ├ page.tsx
│   ├ loading.tsx
│   └ globals.css
│
├ components
│   ├ auth
│   ├ bets
│   ├ layout
│   └ matches
│
├ data
├ hooks
├ services
├ stores
│   └ betStore.ts
│
├ types
├ public
│
├ providers.tsx
├ middleware.ts
│
├ next.config.ts
├ tsconfig.json
├ package.json
└ README.md
```

---

# Decisiones de arquitectura

### Next.js App Router

Se utilizó **App Router** para aprovechar:

- Routing basado en archivos
- Mejor organización de layouts
- Integración con Server Components

### Zustand

Se eligió **Zustand** porque:

- Es liviano
- No requiere boilerplate
- Es ideal para manejar estados simples como las apuestas seleccionadas

### NextAuth

Se utilizó **NextAuth** para gestionar autenticación porque:

- Se integra fácilmente con Next.js
- Permite proteger rutas
- Simplifica el manejo de sesiones
