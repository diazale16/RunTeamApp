# RunTeamApp - Guía De Arquitectura

Este proyecto está normalizado a JavaScript y usa Expo Router como fuente de verdad para las rutas. Esta guía describe las decisiones activas, cómo se compone la app y cómo leer cada capa del sistema.

## Objetivo

Mantener una base única para mobile y web sin mezclar la lógica de plataforma dentro de cada pantalla. Si el comportamiento cambia por plataforma, se separa en archivos distintos; si solo cambia la navegación o el acceso, se resuelve en ruta o guard.

## Principios

- Expo Router gobierna la navegación y la estructura de pantallas.
- `app/` contiene las rutas reales; `routes/` agrega semántica.
- El estado del servidor pertenece a TanStack Query.
- El estado local y de sesión ligera pertenece a `zustand`.
- Los wrappers de plataforma viven cerca de la raíz para que el resto de la app no conozca detalles de mobile/web.
- La documentación debe permitir reconstruir un template mínimo sin tener que leer toda la implementación.

## Estado Actual

- Código de aplicación en `.jsx` y `.web.jsx`.
- Sin archivos `.ts`, `.tsx`, `tsconfig.json` ni declaraciones TypeScript.
- NativeWind activado en el bootstrap de la app.
- Zustand para estado global y slice de auth.
- TanStack Query para datos remotos y prefetch.
- Rutas mobile-only protegidas con guards.

## Organización

```text
app/
components/
data/
providers/
routes/
services/
store/
utils/
```

## Cómo Leer La App

Una lectura útil de arriba hacia abajo es la siguiente:

1. `app/_layout.jsx` define la envoltura raíz, monta providers y registra la estructura principal del router.
2. `app/(tabs)/_layout.jsx` elige shell web o shell mobile.
3. `providers/AppProviders.jsx` crea el cliente de queries y ejecuta la inicialización global.
4. `store/appStore.js` expone el estado de dominio y auth.
5. `routes/appRoutes.js` y `routes/navigation.js` ofrecen navegación semántica.
6. `services/api.js` prepara el acceso a backend con token.

## RootLayout

`app/_layout.jsx` es el layout raíz que Expo Router monta automáticamente. No se importa manualmente desde pantallas: el router detecta el archivo y lo usa como punto de entrada de toda la jerarquía de rutas.

Responsabilidades de `RootLayout`:

- Envolver la app en `AppProviders`.
- Configurar la `StatusBar` según plataforma.
- Declarar el `Stack` principal del router.
- Registrar rutas de alto nivel como `activity` y `location-tracker`.
- Exponer `WebShell` y `MobileShell` como wrappers reutilizables del layout interno de tabs.

Importante: `RootLayout` no renderiza una pantalla de negocio; renderiza el contenedor base para el resto de la aplicación.

## Shells De Plataforma

Los shells están en el mismo archivo que `RootLayout` para dejar explícita la relación entre layout y presentación global.

### WebShell

`WebShell` organiza la experiencia web con una sidebar fija, un header superior y un área de contenido central.

Utilidad:

- hace visible la navegación por módulos;
- aprovecha mejor el ancho de pantalla;
- muestra el contexto actual del módulo activo;
- mantiene la navegación semántica usando `tabNavigationItems` y `goToTab`.

### MobileShell

`MobileShell` organiza la experiencia móvil con contenido principal y tabs inferiores.

Utilidad:

- respeta patrones nativos de navegación;
- reduce fricción táctil;
- mantiene el mismo set de rutas semánticas que la web.

### Relación con `app/(tabs)/_layout.jsx`

`app/(tabs)/_layout.jsx` decide qué shell usar:

- web → `WebShell`
- mobile → `MobileShell`

El `Slot` actúa como contenedor de la pantalla activa dentro de ese shell.

## AppProviders

`providers/AppProviders.jsx` es el punto donde se colocan los providers globales y la inicialización de estado transversal.

Qué hace hoy:

- crea una instancia de `QueryClient`;
- monta `QueryClientProvider`;
- simula la rehidratación de sesión leyendo un token persistido en `localStorage` en web;
- si detecta token, setea `token` y `user` en el store y precarga `me` en la cache de queries;
- marca el store como hidratado para que los guards puedan decidir;
- deja el árbol listo para que cualquier pantalla use `useQuery` o `useMutation`.

Por qué existe:

- centraliza la inicialización una sola vez;
- evita repetir setup en cada pantalla;
- hace posible diferenciar entre “app cargando”, “sesión válida” y “sesión ausente”.

Qué no debería hacer:

- no debería contener lógica específica de pantalla;
- no debería duplicar estado remoto que ya vive en TanStack Query;
- no debería convertirse en un contenedor de negocio.

## Store

`store/appStore.js` usa Zustand como store global.

### Qué guarda

- datos base de demo: `currentUser`, `teams`, `trainingPlans`, `activities`, `subscription`;
- estado de UI o contexto compartido: `activeTeamId`;
- auth ligera: `token`, `user`, `hydrated`.

### Qué resuelve

- leer y escribir estado global sin prop drilling;
- compartir estado entre layouts, pantallas y helpers de navegación;
- almacenar flags de sesión que no justifican un backend roundtrip.

### Qué no resuelve

- no reemplaza el estado del servidor;
- no debería duplicar listas o detalles que ya están cacheados por TanStack Query;
- no es el lugar para lógica de fetch o sincronización de red.

### Regla práctica

Si el dato representa “lo que el usuario ve o modifica localmente” y no necesita revalidación frecuente, puede vivir en Zustand. Si el dato viene del backend y requiere cache, stale/revalidate o invalidation, pertenece a TanStack Query.

## Ruteo

La navegación se estructura en dos capas:

### 1. Rutas reales

Viven en `app/` y son las que Expo Router interpreta.

### 2. Capa semántica

`routes/appRoutes.js` y `routes/navigation.js` describen la intención:

- rutas con nombre estable;
- navegación sin strings sueltos;
- helpers reutilizables para tabs y pantallas.

Esto mejora la legibilidad y facilita extraer un template más simple después.

## Consumo De APIs

La app está pensada para dos tipos de consumo:

### APIs nativas

Se consumen desde el código de plataforma o mediante utilidades cercanas a la raíz.

Ejemplos:

- Expo Location para rutas mobile-only;
- Expo Router para navegación y layouts;
- `StatusBar` de Expo para adaptar la barra del sistema.

### APIs de backend

Se consumen on demand con TanStack Query.

Patrón recomendado:

- `useQuery` para lecturas;
- `useMutation` para escrituras;
- `prefetchQuery` para datos críticos al iniciar;
- invalidación de queries después de mutaciones.

### Arranque vs on demand

No hay una única estrategia correcta. Esta base favorece on demand, con un arranque ligero:

- arranque: rehidratar auth y prefetch de datos críticos;
- on demand: el resto de lecturas y escrituras por pantalla.

Eso evita bloquear toda la interfaz por una dependencia dura del backend.

## Auth Y Flujo De Datos

La secuencia recomendada es:

1. La app arranca y `AppProviders` intenta rehidratar la sesión.
2. Si existe token, se guarda en `zustand` y se precargan datos críticos.
3. Si no existe token, la app puede ir a `Login` o mostrar contenido público.
4. Las pantallas usan TanStack Query para pedir datos específicos.
5. Las mutaciones actualizan cache y, si hace falta, un slice local pequeño en Zustand.

Este proyecto usa una simulación de login para no depender de un backend real.

## Convención De Plataformas

- `*.jsx` se usan como base para mobile.
- `*.web.jsx` se usan para la variante web cuando hace falta una UI distinta.
- Las rutas móviles con GPS o sensores deben quedar protegidas para que no sean accesibles en web.

Ejemplo:

```js
import { isWeb } from '../utils/platform.js';

if (isWeb) {
  // shell o estilos web
}
```

## NativeWind

NativeWind está preparado a nivel de configuración:

- `babel.config.js` integra NativeWind con Expo.
- `tailwind.config.js` cubre `app/`, `components/`, `routes/`, `providers/`, `store/`, `services/`, `data/` y `utils/`.

Regla práctica: usar NativeWind en componentes compartidos donde reduzca ruido de `StyleSheet`, pero no forzar la migración de todo el código de una sola vez.

## Responsabilidad De Cada Capa

- `app/`: navegación y composición de pantallas.
- `components/`: UI reutilizable, guards y shells.
- `providers/`: setup transversal de estado y clientes.
- `store/`: estado local y auth ligera.
- `services/`: cliente HTTP y wrappers de integración.
- `routes/`: rutas semánticas y helpers de navegación.
- `data/`: mock data de la demo.
- `utils/`: utilidades agnósticas de negocio.

## Criterio Para Separar Archivos

Divide en variantes distintas cuando:

- la UI web necesita un layout más amplio o tablas;
- mobile necesita acceso a sensores, GPS o permisos;
- una pantalla empieza a acumular demasiadas condiciones `web/mobile`;
- el costo de mantener una sola implementación supera el beneficio de compartirla.

## Qué Documentar En El Template Simplificado

Cuando extraigas la versión mínima para tesis, conserva como mínimo:

- qué hace cada layout;
- qué vive en Zustand y qué vive en TanStack Query;
- cuándo se usa arranque y cuándo on demand;
- cómo se resuelven rutas mobile-only;
- cómo se conectan las APIs nativas y las APIs backend.

## Reglas De Arquitectura

- `app/` contiene las rutas reales de Expo Router.
- `routes/` solo expone nombres semánticos y helpers de navegación.
- `components/` guarda UI reutilizable y shells visuales.
- `store/` contiene el estado global local.
- `services/` encapsula acceso a API y wrappers de plataforma.
- `data/` centraliza los mocks de la demo.

## Convención De Plataformas

- `*.jsx` se usan como base para mobile.
- `*.web.jsx` se usan para la variante web cuando hace falta una UI distinta.
- Las rutas móviles con GPS o sensores deben quedar protegidas para que no sean accesibles en web.

Ejemplo:

```js
import { isWeb } from '../utils/platform.js';

if (isWeb) {
  // shell o estilos web
}
```

## Próximos Pasos Recomendados

1. Mantener esta guía como la fuente principal para extraer el template mínimo.
2. Si quieres simplificar más, recorta primero el estado de demo y luego las shells.
3. Cuando se agregue backend real, reemplazar la simulación del login y documentar el contrato de sesión.
