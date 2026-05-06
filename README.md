# RunTeamApp - Aplicación de Ejemplo

Aplicación de ejemplo para tesis que demuestra el uso de **Expo + React Native** para crear una app que funciona en **mobile (iOS/Android)** y **web** desde un único codebase.

## Características Implementadas

### Interfaz Adaptada por Plataforma

**Web:**
- Sidebar lateral colapsable con navegación
- Header con título de sección actual
- Layout de múltiples columnas para aprovechar ancho de pantalla
- Tablas y grids para mostrar datos de forma organizada

**Mobile:**
- Tabs en la parte inferior para navegación
- Layout vertical adaptado a pantallas pequeñas
- Cards apiladas para mejor visualización

### Módulos Demo
- **Inicio/Dashboard**: Estadísticas, actividades recientes, planes y logros
- **Gestión de Equipo**: Equipos, grupos, corredores y rendimiento
- **Planificación**: Calendario, workouts y sesiones grupales
- **Perfil**: Usuario, suscripción, estadísticas y logros

### Características Mobile-Only (GPS)
- `app/activity.tsx`: Registro de actividades con opciones de GPS
- `app/location-tracker.tsx`: Tracking GPS en tiempo real usando expo-location

## Arquitectura

```
RunTeamApp/
├── app/                    # Rutas Expo Router
│   ├── (tabs)/            # 4 tabs: Home, Equipo, Entrenos, Perfil
│   │   ├── index.tsx      # Dashboard mobile
│   │   ├── index.web.tsx  # Dashboard web
│   │   ├── team.tsx       # Equipo mobile
│   │   ├── team.web.tsx   # Equipo web
│   │   ├── training.tsx   # Entrenamiento mobile
│   │   ├── training.web.tsx # Entrenamiento web
│   │   ├── profile.tsx    # Perfil mobile
│   │   └── profile.web.tsx # Perfil web
│   ├── activity.tsx        # Ruta mobile-only con guard de plataforma
│   └── location-tracker.tsx # Ruta mobile-only con GPS
├── components/             # UI compartida y shells de plataforma
├── data/                   # Datos mock hardcodeados
├── types/                  # Tipos TypeScript
└── utils/platform.ts       # Detección de plataforma
```

## Ejecución

### Preparar el entorno
Antes de levantar la app, instalá las dependencias desde la raíz del proyecto:

```bash
npm install
```

Si vas a probar la versión móvil, instalá también Expo Go en el teléfono para poder abrir la app con el QR.

### Web
```bash
npm run web
# o para desarrollo con hot reload:
npx expo start --web
```

### Mobile (iOS/Android)
```bash
# Desarrollo
npx expo start

# Escanea el QR con Expo Go (iOS/Android)
```

### Flujo recomendado para compartir con el equipo
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Probar la versión web con `npm run web`.
4. Probar la versión móvil con `npx expo start` y escanear el QR desde Expo Go.

## Detección de Plataforma

```typescript
import { isWeb } from '../utils/platform';

// Componente condicional
{isWeb ? <WebLayout /> : <MobileLayout />}

// Estilos condicionales
const styles = StyleSheet.create({
  container: isWeb ? stylesWeb : stylesMobile,
});

// Features mobile-only
{!isWeb && <GPSFeature />}
```

En este repositorio, las pantallas mobile-only están protegidas a nivel de ruta. Eso evita que en web se vean por accidente al entrar directo a la URL.

## Arquitectura Sugerida

La base actual está pensada para una demo seria de single codebase. La decisión importante es no mezclar la lógica de plataforma dentro de la pantalla: la ruta elige el archivo correcto y el layout elige el shell visual. Para mantener eso claro, conviene usar esta separación:

1. UI compartida en `components/`, `data/` y `types/`.
2. Pantallas por plataforma en `app/(tabs)/*.tsx` para mobile y `app/(tabs)/*.web.tsx` para web.
3. Features exclusivas de mobile, como GPS y sensores, resueltas como rutas mobile-only.
4. Shells de plataforma en `app/_layout.tsx` y `app/(tabs)/_layout.tsx` para navegación y chrome.
5. Si un componente empieza a tener demasiadas condiciones `web/mobile`, conviene partirlo en dos variantes de archivo en lugar de seguir agregando ifs.

Eso deja la demo más clara y más fácil de explicar cuando la compartas con tu equipo o la muestres en la tesis.

## Responsabilidades Por Carpeta

- `app/`: define rutas y navegación.
- `app/(tabs)/`: contiene las pantallas principales y sus variantes por plataforma.
- `components/`: guarda UI reutilizable y piezas de shell, como cards, badges, wrappers y guards.
- `data/`: centraliza los datos de demostración.
- `types/`: modela las entidades del dominio.
- `utils/platform.ts`: expone capacidades como `isWeb` e `isMobile` cuando realmente hace falta.

La regla práctica es simple: si la diferencia es de navegación o acceso, se resuelve en ruta o layout; si la diferencia es visual y repetible, se resuelve en componentes; si la diferencia es estructural entre web y mobile, se separa en archivos específicos de plataforma.

## Stack Recomendado para Proyecto Completo

| Componente | Recomendación |
|------------|---------------|
| Frontend Mobile | Expo + React Native |
| Frontend Web | Mismo código (react-native-web) |
| Navegación | Expo Router |
| Backend | Node.js + Express o Go |
| Base de Datos | PostgreSQL + Prisma |
| Auth | JWT o OAuth |
| AI Assistant | OpenAI API |
| Deploy Mobile | EAS Build |
| Deploy Web | Vercel / Netlify / EAS Hosting |

## Notas para el Equipo

1. **~80% del código es compartido** entre mobile y web
2. **Features específicas de plataforma** (GPS, cámara, sensores) requieren código condicional
3. **UI responsive**: Los componentes se adaptan pero mantenés la misma base de código
4. Para la tesis, documentá cómo la arquitectura permite single codebase para ambas plataformas
5. Usen `LayoutWrapper` para centrar contenido en web con `maxWidth`
