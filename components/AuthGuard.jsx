import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store/appStore.js';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const token = useAppStore((s) => s.token);
  const hydrated = useAppStore((s) => s.hydrated);

  useEffect(() => {
    if (hydrated && !token) {
      // if we are hydrated and no token, go to login
      router.replace('/login');
    }
  }, [hydrated, token, router]);

  // while rehydrating allow children to decide; once hydrated and no token
  // the effect above will redirect to login. If token exists, render children.
  if (!hydrated) return null;
  if (!token) return null;

  return children;
}
