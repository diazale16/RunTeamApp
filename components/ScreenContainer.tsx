import { View, Text, StyleSheet, Platform } from 'react-native';
import { isWeb } from '../utils/platform';

export function ScreenContainer({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <View style={[styles.container, isWeb && styles.containerWeb]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerWeb: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'web' ? 24 : 60,
    paddingBottom: 16,
  },
});
