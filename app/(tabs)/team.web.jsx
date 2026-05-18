import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Card, Badge, Button } from '../../components';
import { teams, users } from '../../data/mockData.js';

export default function TeamScreenWeb() {
  const team = teams[0];
  const runners = users.filter((u) => team.runners.includes(u.id));
  const groups = team.groups;

  return (
    <ScrollView style={styles.scrollWeb} contentContainerStyle={styles.scrollContentWeb} showsVerticalScrollIndicator={false}>
      <View style={styles.webContainer}>
        <View style={styles.webHeader}>
          <View style={styles.teamInfo}>
            <Text style={styles.teamName}>{team.name}</Text>
            <Text style={styles.teamDescription}>{team.description}</Text>
          </View>
          <View style={styles.teamActions}>
            <Button title="Agregar Corredor" onPress={() => {}} variant="primary" />
            <Button title="Crear Grupo" onPress={() => {}} variant="secondary" />
          </View>
        </View>

        <View style={styles.statsCards}>
          <View style={styles.statCard}><Text style={styles.statValue}>{runners.length}</Text><Text style={styles.statLabel}>Corredores Activos</Text></View>
          <View style={styles.statCard}><Text style={styles.statValue}>{groups.length}</Text><Text style={styles.statLabel}>Grupos</Text></View>
          <View style={styles.statCard}><Text style={styles.statValue}>12</Text><Text style={styles.statLabel}>Entrenamientos/Sem</Text></View>
          <View style={styles.statCard}><Text style={styles.statValue}>87%</Text><Text style={styles.statLabel}>Asistencia Promedio</Text></View>
        </View>

        <View style={styles.webGrid}>
          <View style={styles.webMain}>
            <Card title="Grupos de Entrenamiento">
              <View style={styles.groupsTable}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableCell, styles.tableCellName]}>Grupo</Text>
                  <Text style={[styles.tableCell, styles.tableCellMembers]}>Miembros</Text>
                  <Text style={[styles.tableCell, styles.tableCellProgress]}>Progreso</Text>
                  <Text style={[styles.tableCell, styles.tableCellActions]}>Acciones</Text>
                </View>
                {groups.map((group) => {
                  const groupRunners = users.filter((u) => group.runnerIds.includes(u.id));
                  return (
                    <View key={group.id} style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.tableCellName]}>
                        <Text style={styles.groupName}>{group.name}</Text>
                        <Badge text={`${groupRunners.length} corredores`} variant="info" />
                      </View>
                      <View style={[styles.tableCell, styles.tableCellMembers]}>
                        <View style={styles.memberAvatars}>
                          {groupRunners.slice(0, 3).map((runner) => (
                            <Image key={runner.id} source={{ uri: runner.avatar }} style={styles.miniAvatar} />
                          ))}
                          {groupRunners.length > 3 && (
                            <View style={styles.moreCount}><Text style={styles.moreCountText}>+{groupRunners.length - 3}</Text></View>
                          )}
                        </View>
                      </View>
                      <View style={[styles.tableCell, styles.tableCellProgress]}>
                        <View style={styles.progressBar}><View style={[styles.progressFill, { width: '72%' }]} /></View>
                        <Text style={styles.progressText}>72%</Text>
                      </View>
                      <View style={[styles.tableCell, styles.tableCellActions]}>
                        <Button title="Ver" onPress={() => {}} variant="secondary" style={{ paddingVertical: 6, paddingHorizontal: 12 }} />
                      </View>
                    </View>
                  );
                })}
              </View>
            </Card>

            <Card title="Todos los Corredores" rightContent={<Badge text={`${runners.length} total`} variant="info" />}>
              <View style={styles.runnersGrid}>
                {runners.map((runner) => (
                  <View key={runner.id} style={styles.runnerCard}>
                    <Image source={{ uri: runner.avatar }} style={styles.runnerAvatar} />
                    <View style={styles.runnerDetails}>
                      <Text style={styles.runnerName}>{runner.name}</Text>
                      <Text style={styles.runnerEmail}>{runner.email}</Text>
                      <View style={styles.runnerStats}>
                        <Text style={styles.runnerStat}>📅 24 entrenos</Text>
                        <Text style={styles.runnerStat}>🏃 156 km</Text>
                      </View>
                    </View>
                    <Badge text={runner.role === 'entrenador' ? 'Entrenador' : 'Corredor'} variant={runner.role === 'entrenador' ? 'warning' : 'success'} />
                  </View>
                ))}
              </View>
            </Card>
          </View>

          <View style={styles.webSide}>
            <Card title="Rendimiento del Equipo">
              <View style={styles.performanceList}>
                <View style={styles.performanceItem}><Text style={styles.performanceLabel}>Distancia semanal prom.</Text><Text style={styles.performanceValue}>18.5 km</Text></View>
                <View style={styles.performanceItem}><Text style={styles.performanceLabel}>Entrenamientos/semana</Text><Text style={styles.performanceValue}>3.8</Text></View>
                <View style={styles.performanceItem}><Text style={styles.performanceLabel}>Ritmo promedio</Text><Text style={styles.performanceValue}>5:15/km</Text></View>
              </View>
            </Card>

            <Card title="Actividad Reciente">
              <View style={styles.activityList}>
                <View style={styles.activityItem}>
                  <Text style={styles.activityIcon}>🏃</Text>
                  <View style={styles.activityContent}><Text style={styles.activityText}>María completó 8km</Text><Text style={styles.activityTime}>Hace 2 horas</Text></View>
                </View>
                <View style={styles.activityItem}>
                  <Text style={styles.activityIcon}>🎯</Text>
                  <View style={styles.activityContent}><Text style={styles.activityText}>Carlos alcanzó su meta</Text><Text style={styles.activityTime}>Ayer</Text></View>
                </View>
              </View>
            </Card>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  scrollWeb: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContentWeb: { paddingHorizontal: 32, paddingVertical: 24, maxWidth: 1400, alignSelf: 'center', width: '100%' },
  webContainer: { flex: 1 },
  webHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, padding: 24, backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  teamInfo: { flex: 1 },
  teamName: { fontSize: 28, fontWeight: '700', color: '#1e293b', marginBottom: 8 },
  teamDescription: { fontSize: 15, color: '#64748b' },
  teamActions: { flexDirection: 'row', gap: 12 },
  statsCards: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  statCard: { flex: 1, padding: 20, backgroundColor: '#fff', borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  statValue: { fontSize: 28, fontWeight: '700', color: '#2563eb' },
  statLabel: { fontSize: 13, color: '#64748b', marginTop: 4, textAlign: 'center' },
  webGrid: { flexDirection: 'row', gap: 24 },
  webMain: { flex: 2 },
  webSide: { flex: 1, maxWidth: 360 },
  groupsTable: { gap: 0 },
  tableHeader: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', backgroundColor: '#f8fafc', borderRadius: 8, paddingHorizontal: 12 },
  tableRow: { flexDirection: 'row', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' },
  tableCell: { paddingHorizontal: 8 },
  tableCellName: { flex: 2 },
  tableCellMembers: { flex: 1 },
  tableCellProgress: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  tableCellActions: { flex: 0.5, alignItems: 'flex-end' },
  groupName: { fontSize: 15, fontWeight: '600', color: '#1e293b', marginBottom: 4 },
  memberAvatars: { flexDirection: 'row' },
  miniAvatar: { width: 28, height: 28, borderRadius: 14, marginRight: -8, borderWidth: 2, borderColor: '#fff' },
  moreCount: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center', marginLeft: 4 },
  moreCountText: { fontSize: 10, fontWeight: '600', color: '#64748b' },
  progressBar: { flex: 1, height: 6, backgroundColor: '#e2e8f0', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#2563eb', borderRadius: 3 },
  progressText: { fontSize: 12, color: '#64748b', width: 35 },
  runnersGrid: { gap: 12 },
  runnerCard: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#f8fafc', borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0', gap: 12 },
  runnerAvatar: { width: 56, height: 56, borderRadius: 28 },
  runnerDetails: { flex: 1 },
  runnerName: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  runnerEmail: { fontSize: 13, color: '#64748b', marginTop: 2 },
  runnerStats: { flexDirection: 'row', gap: 12, marginTop: 6 },
  runnerStat: { fontSize: 12, color: '#64748b' },
  performanceList: { gap: 16 },
  performanceItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  performanceLabel: { fontSize: 14, color: '#64748b' },
  performanceValue: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  activityList: { gap: 16 },
  activityItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  activityIcon: { fontSize: 24 },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500', color: '#1e293b' },
  activityTime: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  bottomSpacing: { height: 100 },
});