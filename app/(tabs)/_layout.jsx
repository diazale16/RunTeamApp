import { Slot } from 'expo-router';
import { WebShell, MobileShell } from '../_layout.jsx';
import { isWeb } from '../../utils/platform.js';

export default function TabsLayout() {
  if (isWeb) {
    return (
      <WebShell>
        <Slot />
      </WebShell>
    );
  }

  return (
    <MobileShell>
      <Slot />
    </MobileShell>
  );
}