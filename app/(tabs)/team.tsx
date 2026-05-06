import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Badge, Button } from '../../components';
import { teams, users } from '../../data/mockData';

export default function TeamScreen() {
  const team = teams[0];
  const runners = users.filter((u) => team.runners.includes(u.id));
  const groups = team.groups;

  return (
    <ScrollView>
      <Card title={team.name} subtitle={team.description}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValueMobile}>{runners.length}</Text>
            <Text style={styles.statLabelMobile}>Corredores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValueMobile}>{groups.length}</Text>
            <Text style={styles.statLabelMobile}>Grupos</Text>
          </View>
        </View>
      </Card>

      <Card title="Grupos de Entrenamiento">
        {groups.map((group) => {
          const groupRunners = users.filter((u) => group.runnerIds.includes(u.id));
          return (
            <View key={group.id} style={styles.groupSection}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupNameMobile}>{group.name}</Text>
                <Badge text={`${groupRunners.length} miembros`} variant="info" />
              </View>
              <View style={styles.runnersRow}>
                {groupRunners.map((runner) => (
                  <View key={runner.id} style={styles.runnerCardMobile}>
                    <Image source={{ uri: runner.avatar }} style={styles.avatar} />
                    <Text style={styles.runnerNameMobile}>{runner.name}</Text>
                    <Badge text={runner.role} variant={runner.role === 'entrenador' ? 'warning' : 'default'} />
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </Card>

      <Card title="Todos los Corredores">
        {runners.map((runner) => (
          <View key={runner.id} style={styles.runnerItem}>
            <Image source={{ uri: runner.avatar }} style={styles.avatarSmall} />
            <View style={styles.runnerInfo}>
              <Text style={styles.runnerItemName}>{runner.name}</Text>
              <Text style={styles.runnerEmailMobile}>{runner.email}</Text>
            </View>
            <Badge text={runner.role} variant={runner.role === 'entrenador' ? 'warning' : 'default'} />
          </View>
        ))}
      </Card>

      <Card title="Asistente IA">
        <Text style={styles.aiText}>
          💬 Consulta información sobre tu equipo usando lenguaje natural.
          Ejemplo: "¿Cuántos kilómetros corrieron esta semana los corredores del Grupo A?"
        </Text>
        <View style={styles.aiFeature}>
          <Text style={styles.aiFeatureIcon}>🤖</Text>
          <Text style={styles.aiFeatureText}>
            Disponible solo en la app móvil
          </Text>
        </View>
      </Card>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValueMobile: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2563eb',
  },
  statLabelMobile: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  groupSection: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  groupNameMobile: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  runnersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  runnerCardMobile: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    minWidth: 90,
  },
  runnerNameMobile: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 4,
  },
  runnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  runnerInfo: {
    flex: 1,
  },
  runnerItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  runnerEmailMobile: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  aiText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  aiFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
  },
  aiFeatureIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  aiFeatureText: {
    fontSize: 13,
    color: '#1e40af',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 100,
  },
});
