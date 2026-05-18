# RunTeamApp

RunTeamApp es una demo de Expo para mobile y web que usa un solo codebase JavaScript, Expo Router y NativeWind para mantener la UI consistente entre plataformas sin mezclar la lógica de navegación con la presentación.

La documentación detallada de la arquitectura vive en [ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md). Este README resume el stack, la intención del proyecto y cómo ejecutar la demo.

## Stack Actual

- Expo Router para routing file-based.
- React Native y react-native-web para la base visual compartida.
- NativeWind para estilos utilitarios en componentes que ya no necesitan `StyleSheet`.
- Zustand para estado global local.
- TanStack Query para estado remoto y caché de servidor.
- Expo Location para las rutas que solo existen en mobile.

## Decisiones Principales

- La navegación real la define Expo Router dentro de `app/`.
- La capa `routes/` existe para evitar strings sueltos y centralizar intenciones semánticas.
- `AppProviders` es el punto de composición global: allí se monta TanStack Query y se deja listo el lugar para rehidratación de sesión.
- `zustand` guarda estado local, UI, auth ligera y datos derivados de la sesión.
- `TanStack Query` guarda el estado del servidor y sus cachés; no se duplica en `zustand` salvo flags o datos de conveniencia.
- Las APIs nativas y de backend se consumen on demand, con prefetch en arranque solo para datos críticos.

## Qué Incluye

- Dashboard con métricas, actividades y planes.
- Módulo de equipo con grupos y corredores.
- Planificación con calendario, entrenamientos y sesiones.
- Perfil con suscripción, progreso y logros.
- Rutas mobile-only protegidas para GPS y tracking.

## Estructura

- `app/`: rutas reales de Expo Router.
- `app/(tabs)/`: pantallas principales y variantes `.web.jsx` cuando hace falta.
- `components/`: UI reutilizable y shells.
- `routes/`: catálogo semántico de rutas y helpers de navegación.
- `providers/`: composición de providers globales.
- `store/`: estado global con Zustand.
- `services/`: acceso a API y wrappers de plataforma.
- `data/`: datos mock de la demo.
- `utils/`: utilidades compartidas como detección de plataforma.

## Cómo Ejecutar

```bash
npm install
npm run web
```

Para mobile:

```bash
npx expo start
```

## Convenciones

- Las rutas reales viven en `app/`; `routes/` solo agrega una capa semántica para navegación.
- Si una pantalla cambia por plataforma, se separa en `.jsx` y `.web.jsx`.
- Las features mobile-only se protegen con guards de plataforma.
- La migración actual deja el proyecto sin archivos TypeScript ni `tsconfig.json`.

## NativeWind

NativeWind ya está conectado en el bootstrap de la app. El objetivo es ir migrando gradualmente los componentes que más se benefician de clases utilitarias, empezando por piezas compartidas como botones y cards.

## Autenticación y conexión al backend (flujo recomendado)

- La app está preparada para usar Auth via token. En `providers/AppProviders.jsx` se implementa una rehidratación simulada que intenta leer un token desde `localStorage` (web) y prefetchea el `me` en cache de `react-query`.
- `store/appStore.js` contiene un slice `auth` (`token`, `user`, `hydrated`) y helpers `setToken`, `setUser` y `setHydrated`.
- `services/api.js` añade el header `Authorization: Bearer <token>` automáticamente cuando existe el token en el store.
- El flujo recomendado:
	- Rehidratación en arranque: leer token y prefetchear datos críticos.
	- Login on‑demand: realizar `mutation` de login y persistir token en `localStorage`.
	- Server‑state en pantallas: usar `useQuery`/`useMutation` de TanStack Query; `zustand` para flags y estado UI.

En este repo la autenticación está simulada: `app/login.jsx` implementa un login que devuelve un token ficticio y rellena el user desde `data/mockData.js`. Reemplazar la lógica por llamadas reales al backend cuando dispongas del endpoint.

## Referencia Rápida De Archivos

- [app/_layout.jsx](app/_layout.jsx): layout raíz y shells de plataforma.
- [app/(tabs)/_layout.jsx](app/(tabs)/_layout.jsx): decide entre shell web o mobile.
- [providers/AppProviders.jsx](providers/AppProviders.jsx): composición global y sesión simulada.
- [store/appStore.js](store/appStore.js): estado global y slice auth.
- [routes/appRoutes.js](routes/appRoutes.js): catálogo semántico de rutas.
- [routes/navigation.js](routes/navigation.js): helpers de navegación.
- [services/api.js](services/api.js): cliente HTTP preparado para token.
- [components/AuthGuard.jsx](components/AuthGuard.jsx): guard de autenticación.
