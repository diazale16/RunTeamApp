import { View, Text, StyleSheet } from 'react-native';

export function Badge({ text, variant = 'default' }) {
  return (
    <View style={[styles.badge, styles[variant]]}>
      <Text style={[styles.text, styles[`text_${variant}`]]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: '#e5e5e5',
  },
  success: {
    backgroundColor: '#dcfce7',
  },
  warning: {
    backgroundColor: '#fef3c7',
  },
  info: {
    backgroundColor: '#dbeafe',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  text_default: {
    color: '#666',
  },
  text_success: {
    color: '#16a34a',
  },
  text_warning: {
    color: '#d97706',
  },
  text_info: {
    color: '#2563eb',
  },
});