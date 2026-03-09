# BetDay Lite

BetDay Lite es una aplicación web que permite visualizar partidos del día, seleccionar apuestas deportivas y confirmarlas mediante un cupón de apuestas.

La aplicación implementa un flujo simplificado de una plataforma de apuestas deportivas, incluyendo selección de mercados, gestión de cupón y visualización del historial de apuestas.

El sistema está desarrollado utilizando **Next.js App Router**, con **Zustand** para manejo de estado global y **NextAuth** para autenticación.

---

# Demo

Deployment realizado en **Vercel**

https://betday-lite.vercel.app

---

# Tecnologías utilizadas

## Frontend

- Next.js 16 (App Router)
- React 18
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

La aplicación está organizada en una arquitectura basada en componentes con separación de responsabilidades entre:

- UI
- Estado global
- APIs
- Autenticación


Frontend (Next.js)

Pages
├ Home (/)
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


---

# Funcionalidades principales

## Home – Timeline de partidos

Ruta:


/


La página principal muestra los partidos del día en formato timeline.

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
3. Aparece automáticamente en el cupón

---

# Cupón de apuestas

El cupón aparece en el lado derecho de la pantalla en desktop y adaptado para mobile.

Funcionalidades:

- Lista de apuestas seleccionadas
- Campo para ingresar el **stake**
- Cálculo automático de **ganancia potencial**

Fórmula utilizada:


potentialWin = stake * odd


Validación:


stake > 0


Cuando el usuario confirma la apuesta:


bets → placedBets


Las apuestas confirmadas pasan al historial.

---

# Profile – Historial de apuestas

Ruta protegida:


/profile


El acceso está controlado mediante **NextAuth**.

En esta página se muestran únicamente las apuestas confirmadas (`placedBets`).

Si no existen apuestas confirmadas se muestra un **empty state**.

---

# Detalle de apuesta

Ruta dinámica:


/bets/[betId]


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


bets
placedBets


### bets

Contiene las apuestas seleccionadas que aún no han sido confirmadas.

Representa el estado actual del cupón de apuestas.

### placedBets

Contiene las apuestas confirmadas por el usuario.

Estas apuestas aparecen en la página:


/profile


---

# Flujo de apuestas

Flujo completo del usuario:

1. El usuario entra a la página principal
2. Selecciona una cuota de un partido
3. La apuesta se guarda en el estado global (`bets`)
4. La apuesta aparece en el cupón
5. El usuario ingresa un stake
6. El sistema calcula la ganancia potencial
7. El usuario confirma la apuesta
8. La apuesta pasa a `placedBets`
9. La apuesta aparece en `/profile`

---

# API

Endpoint implementado:


GET /api/matches


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
Autenticación

La autenticación está implementada con NextAuth.

Se utiliza sesión para controlar acceso a rutas protegidas.

La ruta protegida es:

/profile

El middleware verifica que el usuario tenga una sesión activa.

Responsive Design

La interfaz está diseñada para funcionar correctamente en:

Mobile

Tablet

Desktop

Elementos principales de la interfaz:

Header fijo

Cupón sticky

Animación de selección de cuotas

Instalación y ejecución

Clonar el repositorio:

git clone https://github.com/usuario/betday-lite.git

Entrar al proyecto:

cd betday-lite

Instalar dependencias:

npm install

Ejecutar en desarrollo:

npm run dev

La aplicación estará disponible en:

http://localhost:3000
Estructura del proyecto
app
 ├ api
 │   └ matches
 ├ bets
 │   └ [betId]
 ├ profile
 ├ layout.tsx
 └ page.tsx

components
 ├ matches
 ├ coupon
 └ header

stores
 └ betStore.ts

lib
 └ auth.ts

middleware.ts