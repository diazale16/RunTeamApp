import { Redirect } from 'expo-router';
import type { Href } from 'expo-router';
import { isWeb } from '../utils/platform';

interface MobileOnlyRouteProps {
  children: React.ReactNode;
  redirectHref?: Href;
}

export function MobileOnlyRoute({ children, redirectHref = '/' }: MobileOnlyRouteProps) {
  if (isWeb) {
    return <Redirect href={redirectHref} />;
  }

  return <>{children}</>;
}