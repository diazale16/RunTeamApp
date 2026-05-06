import { View, Text, StyleSheet, Platform } from 'react-native';
import { isWeb } from '../utils/platform';

interface CardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export function Card({ title, subtitle, children, rightContent }: CardProps) {
  return (
    <View style={[styles.card, isWeb && styles.cardWeb]}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
        </View>
        {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
      </View>
      {children && <View style={styles.cardContent}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardWeb: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rightContent: {
    marginLeft: 12,
  },
  cardContent: {
    marginTop: 12,
  },
});
