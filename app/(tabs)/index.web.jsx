import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Button, Badge, ProgressBar } from '../../components';
import { currentUser, activities, achievements, teams, trainingPlans } from '../../data/mockData.js';

export default function HomeScreenWeb() {
  const router = useRouter();
  const team = teams.find((t) => t.id === currentUser.teamId);
  const userActivities = activities.filter((a) => a.userId === currentUser.id || a.userId === 'user-2');

  return (
    <ScrollView style={styles.scrollWeb} contentContainerStyle={styles.scrollContentWeb}>
      <View style={styles.webContainer}>
        <View style={styles.statsCards}>
          <View style={styles.statsCard}>
            <Text style={styles.statsIcon}>🏃</Text>
            <View>
              <Text style={styles.statsValue}>156 km</Text>
              <Text style={styles.statsLabel}>Total acumulados</Text>
            </View>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsIcon}>📅</Text>
            <View>
              <Text style={styles.statsValue}>24</Text>
              <Text style={styles.statsLabel}>Entrenamientos</Text>
            </View>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsIcon}>⏱️</Text>
            <View>
              <Text style={styles.statsValue}>5:15</Text>
              <Text style={styles.statsLabel}>Ritmo promedio</Text>
            </View>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsIcon}>🔥</Text>
            <View>
              <Text style={styles.statsValue}>7 días</Text>
              <Text style={styles.statsLabel}>Racha actual</Text>
            </View>
          </View>
        </View>

        <View style={styles.webGrid}>
          <View style={styles.webMain}>
            <Card title="Actividades Recientes" rightContent={<Badge text="Ver todas" variant="info" />}>
              <View style={styles.activitiesList}>
                {userActivities.map((activity, index) => (
                  <View key={activity.id} style={[styles.activityRow, index % 2 === 0 && styles.activityRowEven]}>
                    <View style={styles.activityDateBox}>
                      <Text style={styles.activityDay}>{activity.date.split('-')[2]}</Text>
                      <Text style={styles.activityMonth}>
                        {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][parseInt(activity.date.split('-')[1]) - 1]}
                      </Text>
                    </View>
                    <View style={styles.activityDetails}>
                      <Text style={styles.activityType}>🏃 Carrera {activity.distance} km</Text>
                      <Text style={styles.activityMeta}>{activity.duration} min • Ritmo {activity.pace}'/km</Text>
                    </View>
                    <Badge text="Completado" variant="success" />
                  </View>
                ))}
              </View>
            </Card>

            <Card
              title="Planes de Entrenamiento"
              rightContent={<Button title="Crear Plan" onPress={() => {}} variant="secondary" style={{ paddingVertical: 6, paddingHorizontal: 12 }} />}
            >
              <View style={styles.plansGrid}>
                {trainingPlans.map((plan) => (
                  <View key={plan.id} style={styles.planCard}>
                    <View style={styles.planHeader}>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <Badge text={`${plan.workouts.length} workouts`} variant="info" />
                    </View>
                    <Text style={styles.planDescription}>{plan.description}</Text>
                    <View style={styles.planProgress}>
                      <ProgressBar progress={65} label="Progreso" />
                    </View>
                    <Button title="Ver Detalle" onPress={() => {}} variant="secondary" style={{ marginTop: 12 }} />
                  </View>
                ))}
              </View>
            </Card>
          </View>

          <View style={styles.webSide}>
            <Card title="Logros" subtitle="Progreso de la semana">
              <View style={styles.achievementsGrid}>
                {achievements.slice(0, 4).map((achievement) => (
                  <View key={achievement.id} style={[
                    styles.achievementItem,
                    !achievement.unlocked && styles.achievementLocked,
                  ]}>
                    <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                    <Text style={styles.achievementName}>{achievement.name}</Text>
                  </View>
                ))}
              </View>
              <ProgressBar progress={75} label="Meta semanal: 30 km" />
              <Text style={styles.weeklyProgress}>18.7 km / 30 km</Text>
            </Card>

            <Card title="Mi Equipo">
              <View style={styles.teamPreview}>
                <Text style={styles.teamName}>{team?.name}</Text>
                <Text style={styles.teamMembers}>{team?.runners.length} corredores activos</Text>
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
  webContainer: {
    flex: 1,
  },
  mobileContent: {
    paddingBottom: 24,
  },
  statsCards: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statsCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  statsIcon: {
    fontSize: 28,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  statsLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
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
  activitiesList: {
    gap: 0,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 16,
  },
  activityRowEven: {
    backgroundColor: '#fafbfc',
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  activityDateBox: {
    width: 50,
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    paddingVertical: 8,
  },
  activityDay: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563eb',
  },
  activityMonth: {
    fontSize: 10,
    color: '#2563eb',
    textTransform: 'uppercase',
  },
  activityDetails: {
    flex: 1,
  },
  activityType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  activityMeta: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  plansGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  planCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  planDescription: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  planProgress: {
    marginTop: 12,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  achievementItem: {
    width: '23%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  achievementLocked: {
    opacity: 0.4,
  },
  achievementIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  achievementNameLocked: {
    color: '#94a3b8',
  },
  weeklyProgress: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
    textAlign: 'right',
    marginTop: 8,
  },
  teamPreview: {
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  teamMembers: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  mobileHeader: {
    padding: 16,
    backgroundColor: '#2563eb',
    marginBottom: 8,
    borderRadius: 12,
    marginHorizontal: -16,
    marginTop: -16,
    paddingTop: Platform.OS === 'web' ? 0 : 60,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  roleText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 16,
  },
  mobileFeature: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
  },
  mobileFeatureText: {
    fontSize: 13,
    color: '#92400e',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityInfo: {
    flex: 1,
  },
  activityDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  mobileActivityType: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  planItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  mobilePlanName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  mobilePlanDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  achievementsGridMobile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  weeklyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  bottomSpacing: {
    height: 100,
  },
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
});
