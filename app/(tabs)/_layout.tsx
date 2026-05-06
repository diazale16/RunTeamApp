import { Slot } from 'expo-router';
import { WebShell, MobileShell, styles } from '../_layout';
import { isWeb } from '../../utils/platform';
import { View } from 'react-native';

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
