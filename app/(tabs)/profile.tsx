import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Badge, ProgressBar, Button } from '../../components';
import { currentUser, achievements, subscription } from '../../data/mockData';
import { isWeb } from '../../utils/platform';

export default function ProfileScreen() {
  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const lockedAchievements = achievements.filter((a) => !a.unlocked);

  return (
    <ScrollView 
      style={isWeb ? styles.scrollWeb : undefined} 
      contentContainerStyle={isWeb ? styles.scrollContentWeb : undefined}
      showsVerticalScrollIndicator={!isWeb}
    >
      {isWeb ? (
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
      ) : (
        <View>
          <View style={styles.mobileHeader}>
            <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{currentUser.name}</Text>
            <Text style={styles.email}>{currentUser.email}</Text>
            <Badge text={currentUser.role.toUpperCase()} variant={currentUser.role === 'entrenador' ? 'warning' : 'info'} />
          </View>

          <Card title="Suscripción">
            <View style={styles.subscriptionInfo}>
              <View style={styles.subscriptionMain}>
                <Text style={styles.planName}>Plan {subscription.plan.toUpperCase()}</Text>
                <Badge text={subscription.status} variant={subscription.status === 'active' ? 'success' : 'warning'} />
              </View>
              <Text style={styles.subscriptionDates}>Vigente hasta: {subscription.endDate}</Text>
            </View>
            <View style={styles.featuresList}>
              <Text style={styles.featuresTitle}>Características del plan:</Text>
              {subscription.plan === 'premium' && (
                <>
                  <Text style={styles.featureItem}>✓ Entrenamientos ilimitados</Text>
                  <Text style={styles.featureItem}>✓ Asistente IA avanzado</Text>
                  <Text style={styles.featureItem}>✓ Análisis detallado</Text>
                  <Text style={styles.featureItem}>✓ Múltiples equipos</Text>
                </>
              )}
            </View>
          </Card>

          <Card title="Estadísticas">
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>156</Text>
                <Text style={styles.mobileStatLabel}>km Totales</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>24</Text>
                <Text style={styles.mobileStatLabel}>Entrenamientos</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>5:15</Text>
                <Text style={styles.mobileStatLabel}>Ritmo Prom.</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.mobileStatLabel}>Días Activo</Text>
              </View>
            </View>
          </Card>

          <Card title="Progreso">
            <ProgressBar progress={78} label="Meta mensual" />
            <ProgressBar progress={65} label="Consistencia" />
            <ProgressBar progress={100} label="Suscripción" />
          </Card>

          <Card title="Logros Desbloqueados">
            <View style={styles.achievementsList}>
              {unlockedAchievements.map((achievement) => (
                <View key={achievement.id} style={styles.achievementRow}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.mobileAchievementName}>{achievement.name}</Text>
                    <Text style={styles.mobileAchievementDesc}>{achievement.description}</Text>
                  </View>
                  {achievement.unlockedAt && <Text style={styles.mobileAchievementDate}>{achievement.unlockedAt}</Text>}
                </View>
              ))}
            </View>
          </Card>

          <Card title="Logros por Desbloquear">
            <View style={styles.achievementsList}>
              {lockedAchievements.map((achievement) => (
                <View key={achievement.id} style={styles.achievementRowLocked}>
                  <Text style={styles.achievementIcon}>🔒</Text>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.mobileAchievementNameLocked}>{achievement.name}</Text>
                    <Text style={styles.mobileAchievementDesc}>{achievement.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          <Card title="Recordatorios y Rachas">
            <View style={styles.streakSection}>
              <View style={styles.streakMainMobile}>
                <Text style={styles.streakEmoji}>🔥</Text>
                <View>
                  <Text style={styles.streakValue}>7 días</Text>
                  <Text style={styles.streakLabel}>Racha actual</Text>
                </View>
              </View>
              <View style={styles.streakStats}>
                <Text style={styles.streakStatValue}>23</Text>
                <Text style={styles.streakStatLabel}>Mejor racha</Text>
              </View>
            </View>
            <View style={styles.reminderInfoMobile}>
              <Text style={styles.reminderText}>💪 ¡Sigue así!</Text>
            </View>
          </Card>

          <Card title="Configuración">
            <View style={styles.settingsListMobile}>
              <View style={styles.settingsItemMobile}>
                <Text style={styles.settingsLabel}>Notificaciones</Text>
                <Text style={styles.settingsValue}>Activadas</Text>
              </View>
              <View style={styles.settingsItemMobile}>
                <Text style={styles.settingsLabel}>Unidades</Text>
                <Text style={styles.settingsValue}>Kilómetros</Text>
              </View>
              <View style={styles.settingsItemMobile}>
                <Text style={styles.settingsLabel}>Zona horaria</Text>
                <Text style={styles.settingsValue}>America/Argentina</Text>
              </View>
            </View>
            <View style={styles.settingsActions}>
              <Button title="Editar Perfil" onPress={() => alert('Editar perfil')} variant="secondary" />
              <Button title="Cerrar Sesión" onPress={() => alert('Cerrar sesión')} variant="danger" />
            </View>
          </Card>
        </View>
      )}
      <View style={styles.bottomSpacing} />
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
    flexDirection: 'row',
    gap: 20,
  },
  webAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#e2e8f0',
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
    gap: 12,
  },
  subscriptionBadge: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 220,
  },
  subscriptionMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subscriptionPlan: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
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
    maxWidth: 380,
  },
  statsCardsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
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
    gap: 16,
  },
  achievementCard: {
    width: '30%',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 14,
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
    marginTop: 8,
  },
  lockedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  lockedCard: {
    width: '45%',
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    opacity: 0.6,
    alignItems: 'center',
  },
  lockedIcon: {
    fontSize: 28,
    marginBottom: 8,
    opacity: 0.5,
  },
  lockedName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
    textAlign: 'center',
  },
  lockedDesc: {
    fontSize: 11,
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 4,
  },
  subCard: {
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subPlanName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  subDates: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 16,
  },
  subFeatures: {
    gap: 6,
  },
  subFeaturesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  subFeature: {
    fontSize: 13,
    color: '#16a34a',
  },
  settingsList: {
    gap: 0,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingsLabel: {
    fontSize: 14,
    color: '#1e293b',
  },
  settingsValue: {
    fontSize: 14,
    color: '#64748b',
  },
  streakCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fef3c7',
    borderRadius: 10,
  },
  streakMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakEmoji: {
    fontSize: 40,
  },
  streakValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  streakLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  streakBest: {
    alignItems: 'flex-end',
  },
  streakBestValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563eb',
  },
  streakBestLabel: {
    fontSize: 11,
    color: '#64748b',
  },
  reminderInfo: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
  },
  reminderText: {
    fontSize: 13,
    color: '#1e40af',
  },
  mobileHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#2563eb',
    marginBottom: 8,
    borderRadius: 12,
    marginHorizontal: -16,
    marginTop: -16,
    paddingTop: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  subscriptionInfo: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  featuresList: {
    marginTop: 12,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#16a34a',
    marginVertical: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    width: '47%',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  mobileStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  achievementsList: {
    gap: 12,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  achievementRowLocked: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    opacity: 0.6,
  },
  achievementInfo: {
    flex: 1,
  },
  mobileAchievementName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  mobileAchievementNameLocked: {
    fontSize: 15,
    fontWeight: '600',
    color: '#999',
  },
  mobileAchievementDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  mobileAchievementDate: {
    fontSize: 12,
    color: '#999',
  },
  streakSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakMainMobile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakStats: {
    alignItems: 'flex-end',
  },
  streakStatValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563eb',
  },
  streakStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  reminderInfoMobile: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
  },
  settingsListMobile: {
    gap: 0,
  },
  settingsItemMobile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsActions: {
    marginTop: 16,
    gap: 12,
  },
  bottomSpacing: {
    height: 100,
  },
});
