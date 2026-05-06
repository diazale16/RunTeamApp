import { View, StyleSheet, Platform } from 'react-native';
import { isWeb } from '../utils/platform';

interface LayoutWrapperProps {
  children: React.ReactNode;
  maxWidth?: number;
  noPadding?: boolean;
}

export function LayoutWrapper({ children, maxWidth = 1200, noPadding = false }: LayoutWrapperProps) {
  if (isWeb) {
    return (
      <View style={styles.webWrapper}>
        <View style={[styles.webContent, { maxWidth }]}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.mobileWrapper, noPadding && styles.mobileNoPadding]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
  },
  webContent: {
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  mobileWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mobileNoPadding: {
    paddingHorizontal: 0,
  },
});
