# RunTeamApp - Guía de Arquitectura

Este documento responde las preguntas más comunes sobre arquitectura y patrones en apps React Native + Expo con soporte mobile y web.

---

## 1. Patrón de Estilos - Respuesta a tu pregunta ✅

### ¿Es correcto lo que agregaste a `index.web.tsx`?

**Sí, totalmente correcto.** Aquí está el por qué:

#### El Problema
Cuando Expo Router compila para web, **solo carga archivos `.web.tsx`**. Los imports desde archivos `.tsx` (mobile) no se incluyen en el bundle de web. Por lo tanto:

```tsx
// ❌ ESTO NO FUNCIONA EN WEB (el archivo móvil no se carga)
import { styles } from './index';  // index.tsx no existe en bundle web

// ✅ ESTO SÍ FUNCIONA (cada variante tiene sus propios estilos)
export const styles = StyleSheet.create({ ... });
```

#### La Solución - Patrón de Dos Variantes

```
app/(tabs)/
├── index.tsx              # Mobile-only (limpio, solo React Native)
├── index.web.tsx          # Web-only (con estilos web completos)
├── team.tsx               # Mobile-only
├── team.web.tsx           # Web-only (con estilos web)
└── ...
```

**Cada archivo `.web.tsx` debe exportar su propio objeto `styles` completo:**

```tsx
// app/(tabs)/index.web.tsx
export default function HomeScreenWeb() {
  return <ScrollView style={styles.scrollWeb}>...</ScrollView>;
}

export const styles = StyleSheet.create({
  scrollWeb: { /* estilos específicos para web */ },
  webContainer: { /* ... */ },
  // ... todos los estilos necesarios
});
```

**Lo que hiciste fue exactamente esto** - bien hecho. ✅

---

## 2. Organización de Carpetas - ¿Puedo crear subdirectorios?

### Sí, es perfectamente válido. Aquí están los patrones recomendados:

#### Opción A: Estructura Plana (Actual)
```
app/(tabs)/
├── index.tsx
├── index.web.tsx
├── team.tsx
├── team.web.tsx
├── training.tsx
├── training.web.tsx
└── profile.tsx
└── profile.web.tsx
```
**Ventajas:** Simpleza, fácil de escanear
**Desventajas:** Mucho duplicado en la raíz

#### Opción B: Organizada por Pantalla (Recomendado para Escalabilidad)
```
app/(tabs)/
├── home/
│   ├── index.tsx
│   ├── index.web.tsx
│   └── useHomeData.ts
├── team/
│   ├── index.tsx
│   ├── index.web.tsx
│   └── useTeamData.ts
├── training/
│   ├── index.tsx
│   ├── index.web.tsx
│   └── useTrainingData.ts
└── profile/
    ├── index.tsx
    ├── index.web.tsx
    └── useProfileData.ts
```

**Cómo funciona con Expo Router:**
- `/team` → carga `team/index.tsx` (mobile) o `team/index.web.tsx` (web)
- Expo Router automáticamente elige la variante correcta
- ✅ **Sí, el fallback de plataforma funciona en subdirectorios**

#### Opción C: Por Feature (Para proyectos grandes)
```
app/(tabs)/
├── _layout.tsx
├── home/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── index.web.tsx
│   └── components/
├── team/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── index.web.tsx
│   ├── group-details.tsx
│   └── group-details.web.tsx
└── ...
```

**Recomendación:** Usa Opción B para este proyecto - ofrece buen balance.

---

## 3. Gestión del Router - Mejores Prácticas

### Situación Actual
Tienes routing básico type-safe:

```tsx
// app/_layout.tsx
const tabRoutes: Record<TabName, string> = {
  index: '/(tabs)',
  team: '/(tabs)/team',
  training: '/(tabs)/training',
  profile: '/(tabs)/profile',
};

const getTabRoute = (name: TabName) => tabRoutes[name];
```

### Mejora Recomendada: Hook de Navegación

**Crear `hooks/useNavigation.ts`:**

```tsx
import { useRouter } from 'expo-router';

export type AppRoute = 
  | 'home'
  | 'team'
  | 'training'
  | 'profile'
  | 'activity'
  | 'location-tracker';

const routeMap: Record<AppRoute, string> = {
  home: '/(tabs)',
  team: '/(tabs)/team',
  training: '/(tabs)/training',
  profile: '/(tabs)/profile',
  activity: '/activity',
  'location-tracker': '/location-tracker',
};

export function useAppNavigation() {
  const router = useRouter();

  return {
    goToHome: () => router.push(routeMap.home),
    goToTeam: () => router.push(routeMap.team),
    goToTraining: () => router.push(routeMap.training),
    goToProfile: () => router.push(routeMap.profile),
    goToActivity: () => router.push(routeMap.activity),
    goToLocationTracker: () => router.push(routeMap['location-tracker']),
    push: (route: AppRoute) => router.push(routeMap[route]),
  };
}
```

**Uso en componentes:**

```tsx
import { useAppNavigation } from '../hooks/useNavigation';

export function TeamCard() {
  const nav = useAppNavigation();

  return <Button onPress={() => nav.goToTeam()} title="Ver Equipo" />;
}
```

**Ventajas:**
- ✅ Type-safe: El IDE autocomplete te sugiere rutas disponibles
- ✅ Cambios centralizados: Editas rutas en un solo lugar
- ✅ Mantenible: Evita strings duplicados en toda la app

---

## 4. Gestión de Estado - React Native + Web

### Opciones por Escala de Proyecto

#### Opción 1: Context API (Recomendado para DEMO)
**Para:** Apps pequeñas, prototipos, demostraciones
**Setup:** Cero dependencias adicionales

```tsx
// context/AppContext.tsx
import React, { createContext, useReducer } from 'react';

export type AppState = {
  currentUser: typeof currentUser;
  activities: typeof activities[];
  teams: typeof teams[];
};

const initialState: AppState = {
  currentUser,
  activities,
  teams,
};

export const AppContext = createContext<AppState>(initialState);

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContext.Provider value={initialState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppState debe usarse dentro de AppProvider');
  }
  return context;
}
```

**Uso:**

```tsx
import { useAppState } from '../context/AppContext';

export default function HomeScreen() {
  const { currentUser, teams } = useAppState();
  return <Text>{currentUser.name}</Text>;
}
```

#### Opción 2: Zustand (Recomendado para PRODUCCIÓN)
**Para:** Apps medianas-grandes, feature-rich
**Setup:** Una dependency adicional
**Ventajas:** Más simple que Redux, funciona perfectamente en RN+Web

```tsx
// store/appStore.ts
import { create } from 'zustand';
import { currentUser, activities, teams } from '../data/mockData';

type AppStore = {
  user: typeof currentUser;
  activities: typeof activities[];
  teams: typeof teams[];
  setUser: (user: typeof currentUser) => void;
  addActivity: (activity: typeof activities[0]) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  user: currentUser,
  activities,
  teams,
  setUser: (user) => set({ user }),
  addActivity: (activity) =>
    set((state) => ({ activities: [activity, ...state.activities] })),
}));
```

**Uso:**

```tsx
import { useAppStore } from '../store/appStore';

export default function ProfileScreen() {
  const { user, setUser } = useAppStore();
  
  return (
    <Button
      title="Actualizar"
      onPress={() => setUser({ ...user, name: 'Nuevo nombre' })}
    />
  );
}
```

**Comparación:**
| Feature | Context API | Zustand | Redux |
|---------|-------------|---------|-------|
| Setup | Fácil | Fácil | Complejo |
| Tamaño | Ninguno | ~1KB | ~5KB |
| DevTools | No | Sí | Excelente |
| Performance | OK | Excelente | Excelente |
| RN + Web | ✅ | ✅✅ | ✅ |
| Aprendizaje | Rápido | Rápido | Lento |

### Recomendación para RunTeamApp
- **Ahora (demo):** Context API básico
- **Si necesitas persistencia:** Agrega `zustand` + `zustand/middleware` para localStorage
- **Si crece mucho:** Migra a Zustand o Redux

---

## 5. Convención de Nombres: `.mobile.tsx` vs Default

### Respuesta: Sigue el Estándar Expo

#### ❌ NO RECOMENDADO: Usar `.mobile.tsx`
```
index.mobile.tsx    # ❌ Expo Router no reconoce esto
index.web.tsx       # ✅ Esto sí
```

Expo Router prioriza:
1. `.native.tsx` → para React Native (iOS/Android)
2. `.web.tsx` → para web
3. `.ios.tsx`, `.android.tsx` → específicos del SO
4. `.tsx` → fallback por defecto

**Problema con `.mobile.tsx`:** Expo no lo reconoce como variante específica.

#### ✅ RECOMENDADO: Patrón Actual
```
index.tsx           # Carga en mobile (fallback por defecto)
index.web.tsx       # Carga en web (específico)
```

**Cómo funciona:**
- En iOS/Android: Expo Metro carga `index.tsx`
- En Web: Expo carga `index.web.tsx`
- Es el patrón estándar en el ecosistema Expo

#### Alternativa (si quieres ser explícito):
```
index.native.tsx    # ✅ Funciona también
index.web.tsx       # ✅ Explícito para web
```

Pero **no hay ventaja sobre `index.tsx`** - es más verborragee.

**Recomendación:** Mantén:
- `*.tsx` para mobile
- `*.web.tsx` para web

---

## Resumen de Cambios Implementados

### ✅ Lo que ya hiciste bien:
1. **Estilos en web variants** - Cada `.web.tsx` tiene su propio `StyleSheet.create()`
2. **Componentes limpios** - Removimos `isWeb` conditionals
3. **Guard pattern** - `MobileOnlyRoute` previene acceso web a rutas mobile

### 🎯 Próximas Mejoras (Opcional):
1. **Organiza en carpetas** - Usa Opción B (subdirectorios por screen)
2. **Crea hook de navegación** - Centraliza todas las rutas
3. **Evalúa estado global** - Context API está bien para demo, Zustand para producción
4. **Mantén el naming** - `.tsx` para mobile, `.web.tsx` para web

---

## Referencias

- [Expo Router Platform Specific Module Resolution](https://docs.expo.dev/routing/appearance-based-routing/)
- [React Native Web Documentation](https://necolas.github.io/react-native-web/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
