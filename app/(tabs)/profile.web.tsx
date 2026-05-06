import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Card, Badge, ProgressBar, Button } from '../../components';
import { currentUser, achievements, subscription } from '../../data/mockData';

export default function ProfileScreenWeb() {
  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const lockedAchievements = achievements.filter((a) => !a.unlocked);

  return (
    <ScrollView style={styles.scrollWeb} contentContainerStyle={styles.scrollContentWeb} showsVerticalScrollIndicator={false}>
      <View style={styles.webContainer}>
        <View style={styles.webHeader}>
          <View style={styles.profileSection}>
            <Image source={{ uri: currentUser.avatar }} style={styles.webAvatar} />
            <View style={styles.profileInfo}>
              <View style={styles.profileNameRow}>
                <Text style={styles.webName}>{currentUser.name}</Text>
                <Badge text={currentUser.role.toUpperCase()} variant={currentUser.role === 'entrenador' ? 'warning' : 'info'} />
              </View>
              <Text style={styles.webEmail}>{currentUser.email}</Text>
              <View style={styles.profileActions}>
                <Button title="Editar Perfil" onPress={() => {}} variant="secondary" style={{ paddingVertical: 8 }} />
                <Button title="Cerrar Sesión" onPress={() => {}} variant="danger" style={{ paddingVertical: 8 }} />
              </View>
            </View>
          </View>
          <View style={styles.subscriptionBadge}>
            <View style={styles.subscriptionMain}>
              <Text style={styles.subscriptionPlan}>Plan {subscription.plan.toUpperCase()}</Text>
              <Badge text={subscription.status} variant={subscription.status === 'active' ? 'success' : 'warning'} />
            </View>
            <Text style={styles.subscriptionDates}>Vigente hasta {subscription.endDate}</Text>
          </View>
        </View>

        <View style={styles.webGrid}>
          <View style={styles.webMain}>
            <View style={styles.statsCardsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>🏃</Text>
                <Text style={styles.statValue}>156 km</Text>
                <Text style={styles.statLabel}>Distancia total</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>📅</Text>
                <Text style={styles.statValue}>24</Text>
                <Text style={styles.statLabel}>Entrenamientos</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>⏱️</Text>
                <Text style={styles.statValue}>5:15</Text>
                <Text style={styles.statLabel}>Ritmo promedio</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>🔥</Text>
                <Text style={styles.statValue}>7</Text>
                <Text style={styles.statLabel}>Días de racha</Text>
              </View>
            </View>

            <Card title="Progreso">
              <ProgressBar progress={78} label="Meta mensual de kilometraje" />
              <ProgressBar progress={65} label="Objetivos de consistencia" />
              <ProgressBar progress={100} label="Nivel de suscripción" />
            </Card>

            <Card title="Logros Desbloqueados" rightContent={<Badge text={`${unlockedAchievements.length} de ${achievements.length}`} variant="success" />}>
              <View style={styles.achievementsGrid}>
                {unlockedAchievements.map((achievement) => (
                  <View key={achievement.id} style={styles.achievementCard}>
                    <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                    <Text style={styles.achievementName}>{achievement.name}</Text>
                    <Text style={styles.achievementDesc}>{achievement.description}</Text>
                    {achievement.unlockedAt && <Text style={styles.achievementDate}>{achievement.unlockedAt}</Text>}
                  </View>
                ))}
              </View>
            </Card>

            <Card title="Logros por Desbloquear">
              <View style={styles.lockedGrid}>
                {lockedAchievements.map((achievement) => (
                  <View key={achievement.id} style={styles.lockedCard}>
                    <Text style={styles.lockedIcon}>🔒</Text>
                    <Text style={styles.lockedName}>{achievement.name}</Text>
                    <Text style={styles.lockedDesc}>{achievement.description}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>

          <View style={styles.webSide}>
            <Card title="Suscripción">
              <View style={styles.subCard}>
                <View style={styles.subHeader}>
                  <Text style={styles.subPlanName}>Plan {subscription.plan.toUpperCase()}</Text>
                  <Badge text={subscription.status} variant="success" />
                </View>
                <Text style={styles.subDates}>Vigente hasta: {subscription.endDate}</Text>
                <View style={styles.subFeatures}>
                  <Text style={styles.subFeaturesTitle}>Incluye:</Text>
                  <Text style={styles.subFeature}>✓ Entrenamientos ilimitados</Text>
                  <Text style={styles.subFeature}>✓ Asistente IA avanzado</Text>
                  <Text style={styles.subFeature}>✓ Análisis detallado</Text>
                  <Text style={styles.subFeature}>✓ Múltiples equipos</Text>
                </View>
                <Button title="Gestionar Suscripción" onPress={() => {}} variant="secondary" style={{ marginTop: 16 }} />
              </View>
            </Card>

            <Card title="Configuración">
              <View style={styles.settingsList}>
                <View style={styles.settingsItem}>
                  <Text style={styles.settingsLabel}>Notificaciones</Text>
                  <Badge text="Activadas" variant="success" />
                </View>
                <View style={styles.settingsItem}>
                  <Text style={styles.settingsLabel}>Unidades</Text>
                  <Text style={styles.settingsValue}>Kilómetros</Text>
                </View>
                <View style={styles.settingsItem}>
                  <Text style={styles.settingsLabel}>Zona horaria</Text>
                  <Text style={styles.settingsValue}>America/Argentina</Text>
                </View>
                <View style={styles.settingsItem}>
                  <Text style={styles.settingsLabel}>Idioma</Text>
                  <Text style={styles.settingsValue}>Español</Text>
                </View>
              </View>
            </Card>

            <Card title="Recordatorios y Rachas">
              <View style={styles.streakCard}>
                <View style={styles.streakMain}>
                  <Text style={styles.streakEmoji}>🔥</Text>
                  <View>
                    <Text style={styles.streakValue}>7 días</Text>
                    <Text style={styles.streakLabel}>Racha actual</Text>
                  </View>
                </View>
                <View style={styles.streakBest}>
                  <Text style={styles.streakBestValue}>23</Text>
                  <Text style={styles.streakBestLabel}>Mejor racha</Text>
                </View>
              </View>
              <View style={styles.reminderInfo}>
                <Text style={styles.reminderText}>
                  💪 ¡Sigue así! Completa un entrenamiento hoy para mantener tu racha.
                </Text>
              </View>
            </Card>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  scrollWeb: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContentWeb: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  webContainer: {
    flex: 1,
  },
  webHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 24,
  },
  profileSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
  },
  webAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    flex: 1,
  },
  profileNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  webName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  webEmail: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  profileActions: {
    flexDirection: 'row',
    gap: 8,
  },
  subscriptionBadge: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  subscriptionMain: {
    marginBottom: 8,
  },
  subscriptionPlan: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subscriptionDates: {
    fontSize: 13,
    color: '#64748b',
  },
  webGrid: {
    flexDirection: 'row',
    gap: 24,
  },
  webMain: {
    flex: 2,
  },
  webSide: {
    flex: 1,
    maxWidth: 360,
  },
  statsCardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '23%',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  achievementName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  achievementDate: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
  },
  lockedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  lockedCard: {
    width: '23%',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    opacity: 0.5,
  },
  lockedIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  lockedName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  lockedDesc: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 2,
  },
  subCard: {
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subPlanName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  subDates: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 12,
  },
  subFeatures: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  subFeaturesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  subFeature: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  settingsList: {
    gap: 12,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingsLabel: {
    fontSize: 14,
    color: '#1e293b',
  },
  settingsValue: {
    fontSize: 13,
    color: '#64748b',
  },
  streakCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    marginBottom: 12,
  },
  streakMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakEmoji: {
    fontSize: 28,
  },
  streakValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  streakLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  streakBest: {
    alignItems: 'center',
  },
  streakBestValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#d97706',
  },
  streakBestLabel: {
    fontSize: 11,
    color: '#64748b',
  },
  reminderInfo: {
    padding: 12,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
  },
  reminderText: {
    fontSize: 13,
    color: '#1e40af',
    lineHeight: 18,
  },
});