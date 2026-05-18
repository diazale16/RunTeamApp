import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Button, Badge, ProgressBar } from '../../components';
import { currentUser, activities, achievements, teams, trainingPlans } from '../../data/mockData.js';

export default function HomeScreen() {
  const router = useRouter();
  const team = teams.find((t) => t.id === currentUser.teamId);
  const userActivities = activities.filter((a) => a.userId === currentUser.id || a.userId === 'user-2');

  const handleStartActivity = () => {
    router.push('/activity');
  };

  return (
    <ScrollView>
      <View style={styles.mobileContent}>
        <View style={styles.mobileHeader}>
          <Text style={styles.welcomeText}>¡Hola, {currentUser.name}!</Text>
          <Text style={styles.roleText}>Rol: {currentUser.role}</Text>
        </View>

        <Card title="Registro de Actividad">
          <Text style={styles.description}>
            Registra tus entrenamientos usando el GPS del celular o manualmente.
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Iniciar Entrenamiento" onPress={handleStartActivity} variant="primary" />
          </View>
          <View style={styles.mobileFeature}>
            <Text style={styles.mobileFeatureText}>
              📍 Esta función usa GPS para rastrear tu ruta en tiempo real
            </Text>
          </View>
        </Card>

        <Card title="Actividades Recientes">
          {userActivities.slice(0, 3).map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityInfo}>
                <Text style={styles.activityDate}>{activity.date}</Text>
                <Text style={styles.mobileActivityType}>
                  {activity.distance} km • {activity.duration} min
                </Text>
              </View>
              <Badge text={`${activity.pace}'/km`} variant="success" />
            </View>
          ))}
        </Card>

        <Card title="Planes de Entrenamiento">
          {trainingPlans.map((plan) => (
            <View key={plan.id} style={styles.planItem}>
              <View>
                <Text style={styles.mobilePlanName}>{plan.name}</Text>
                <Text style={styles.mobilePlanDescription}>{plan.description}</Text>
              </View>
              <Badge text={`${plan.workouts.length} entrenos`} variant="info" />
            </View>
          ))}
        </Card>

        <Card title="Logros">
          <View style={styles.achievementsGridMobile}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={[
                styles.achievementItem,
                !achievement.unlocked && styles.achievementLocked,
              ]}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={[styles.achievementName, !achievement.unlocked && styles.achievementNameLocked]}>
                  {achievement.name}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <Card title="Progreso Semanal">
          <ProgressBar progress={75} label="Meta semanal: 30 km" />
          <View style={styles.weeklyStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>18.7</Text>
              <Text style={styles.statLabel}>km</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>entrenos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5:18</Text>
              <Text style={styles.statLabel}>ritmo</Text>
            </View>
          </View>
        </Card>

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
