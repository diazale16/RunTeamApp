import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store/appStore.js';
import { currentUser as mockCurrentUser } from '../data/mockData.js';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        retry: 1,
      },
    },
  });

/**
 * AppProviders
 * - monta QueryClientProvider
 * - rehidrata sesión (simulada): intenta leer token desde `localStorage` en web
 *   y simula la recuperación del usuario desde el backend.
 * - prefetchea el `me` (simulado) si hay token.
 */
export function AppProviders({ children }) {
  const [queryClient] = useState(createQueryClient);
  const [isReady, setIsReady] = useState(false);
  const setToken = useAppStore((s) => s.setToken);
  const setUser = useAppStore((s) => s.setUser);
  const setHydrated = useAppStore((s) => s.setHydrated);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function rehydrate() {
      try {
        // Simulación simple: leer token desde localStorage en web
        let token = null;
        if (typeof window !== 'undefined' && window.localStorage) {
          token = window.localStorage.getItem('@runteam:token');
        }

        if (token) {
          // set token in store
          setToken(token);
          // Simular fetch de /me usando mock
          setUser(mockCurrentUser);
          // prefetchear datos críticos (ej. 'me') en react-query cache
          await queryClient.prefetchQuery(['me'], async () => mockCurrentUser);
        }

        if (mounted) {
          setHydrated(true);
          setIsReady(true);
        }
      } catch (err) {
        // On any error we still mark hydrated so app can show login
        setHydrated(true);
        setIsReady(true);
      }
    }

    rehydrate();
    return () => {
      mounted = false;
    };
  }, [queryClient, setHydrated, setToken, setUser]);

  // While rehydrating, show a minimal loading screen
  if (!isReady) {
    return (
      <QueryClientProvider client={queryClient}>
        <></>
      </QueryClientProvider>
    );
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}