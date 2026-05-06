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
│   │   ├── index.tsx      # Dashboard con estadísticas
│   │   ├── team.tsx       # Gestión de equipo
│   │   ├── training.tsx    # Planificación
│   │   └── profile.tsx     # Perfil de usuario
│   ├── activity.tsx        # Registro (mobile-only UI)
│   └── location-tracker.tsx # GPS tracking (mobile-only)
├── components/             # Componentes reutilizables
├── data/                  # Datos mock hardcodeados
├── types/                  # Tipos TypeScript
└── utils/platform.ts       # Detección de plataforma
```

## Ejecución

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
