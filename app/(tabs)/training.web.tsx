import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Button, Badge, ProgressBar } from '../../components';
import { trainingPlans } from '../../data/mockData';

const typeColors: Record<string, string> = {
  intervalos: 'warning',
  fondo_largo: 'success',
  tempo: 'info',
  descanso: 'default',
  sprints: 'danger',
};

const typeLabels: Record<string, string> = {
  intervalos: 'Intervalos',
  fondo_largo: 'Fondo Largo',
  tempo: 'Tempo',
  descanso: 'Descanso',
  sprints: 'Sprints',
};

const intensityColors: Record<string, { bg: string; text: string }> = {
  baja: { bg: '#dcfce7', text: '#16a34a' },
  media: { bg: '#fef3c7', text: '#d97706' },
  alta: { bg: '#fee2e2', text: '#dc2626' },
};

const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function TrainingScreenWeb() {
  return (
    <ScrollView style={styles.scrollWeb} contentContainerStyle={styles.scrollContentWeb} showsVerticalScrollIndicator={false}>
      <View style={styles.webContainer}>
        <View style={styles.webHeader}>
          <View style={styles.headerStats}>
            <View style={styles.headerStat}>
              <Text style={styles.headerStatValue}>8</Text>
              <Text style={styles.headerStatLabel}>Entrenamientos esta semana</Text>
            </View>
            <View style={styles.headerStat}>
              <Text style={styles.headerStatValue}>65 km</Text>
              <Text style={styles.headerStatLabel}>Distancia planificada</Text>
            </View>
            <View style={styles.headerStat}>
              <Text style={styles.headerStatValue}>6h 30m</Text>
              <Text style={styles.headerStatLabel}>Tiempo total</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <Button title="Crear Plan" onPress={() => {}} variant="primary" />
          </View>
        </View>

        <View style={styles.webGrid}>
          <View style={styles.webMain}>
            <Card
              title="Calendario de Entrenamientos"
              rightContent={
                <View style={styles.calendarNav}>
                  <Button title="◀" onPress={() => {}} variant="secondary" style={{ paddingHorizontal: 12 }} />
                  <Text style={styles.calendarTitle}>Abril 2026</Text>
                  <Button title="▶" onPress={() => {}} variant="secondary" style={{ paddingHorizontal: 12 }} />
                </View>
              }
            >
              <View style={styles.calendarGrid}>
                {weekDays.map((day, index) => (
                  <View key={day} style={[styles.calendarDay, index === 1 && styles.calendarDayToday]}>
                    <Text style={[styles.calendarDayLabel, index === 1 && styles.calendarDayLabelToday]}>{day}</Text>
                    {index === 1 && <View style={styles.workoutIndicator}><Text style={styles.workoutIndicatorText}>🏃</Text></View>}
                    {index === 3 && <View style={styles.workoutIndicator}><Text style={styles.workoutIndicatorText}>⚡</Text></View>}
                    {index === 5 && <View style={styles.workoutIndicator}><Text style={styles.workoutIndicatorText}>🏃</Text></View>}
                  </View>
                ))}
              </View>
            </Card>

            {trainingPlans.map((plan) => (
              <Card key={plan.id} title={plan.name} subtitle={plan.description} rightContent={<Badge text={`${plan.workouts.length} workouts`} variant="info" />}>
                <View style={styles.workoutsTable}>
                  <View style={styles.tableHeader}>
                    <Text style={[styles.tableCell, styles.cellName]}>Entrenamiento</Text>
                    <Text style={[styles.tableCell, styles.cellType]}>Tipo</Text>
                    <Text style={[styles.tableCell, styles.cellDuration]}>Duración</Text>
                    <Text style={[styles.tableCell, styles.cellDistance]}>Distancia</Text>
                    <Text style={[styles.tableCell, styles.cellIntensity]}>Intensidad</Text>
                  </View>
                  {plan.workouts.map((workout, index) => (
                    <View key={workout.id} style={[styles.tableRow, index % 2 === 0 && styles.tableRowEven]}>
                      <View style={[styles.tableCell, styles.cellName]}>
                        <Text style={styles.workoutName}>{workout.name}</Text>
                        <Text style={styles.workoutDesc}>{workout.description}</Text>
                      </View>
                      <View style={[styles.tableCell, styles.cellType]}>
                        <Badge text={typeLabels[workout.type]} variant={typeColors[workout.type] as any} />
                      </View>
                      <Text style={[styles.tableCell, styles.cellDuration]}>{workout.duration} min</Text>
                      <Text style={[styles.tableCell, styles.cellDistance]}>{workout.distance ? `${workout.distance} km` : '-'}</Text>
                      <View style={[styles.tableCell, styles.cellIntensity]}>
                        <View style={[styles.intensityBadge, { backgroundColor: intensityColors[workout.intensity].bg }]}>
                          <Text style={[styles.intensityText, { color: intensityColors[workout.intensity].text }]}>
                            {workout.intensity.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </Card>
            ))}
          </View>

          <View style={styles.webSide}>
            <Card title="Próximo Entrenamiento">
              <View style={styles.nextWorkout}>
                <View style={styles.nextWorkoutHeader}>
                  <Text style={styles.nextWorkoutDay}>Mañana</Text>
                  <Badge text="Intervalos" variant="warning" />
                </View>
                <Text style={styles.nextWorkoutName}>Series de 800m</Text>
                <View style={styles.nextWorkoutDetails}>
                  <Text style={styles.nextWorkoutDetail}>⏱️ 45 minutos</Text>
                  <Text style={styles.nextWorkoutDetail}>📍 Parque Central</Text>
                  <Text style={styles.nextWorkoutDetail}>👥 5 corredores</Text>
                </View>
                <View style={styles.nextWorkoutActions}>
                  <Button title="Ver Detalle" onPress={() => {}} variant="primary" />
                  <Button title="📱 Generar QR" onPress={() => alert('QR generado')} variant="secondary" />
                </View>
              </View>
            </Card>

            <Card title="Sesiones Grupales">
              <View style={styles.sessionsList}>
                <View style={styles.sessionItem}>
                  <View style={styles.sessionInfo}>
                    <Text style={styles.sessionName}>Carrera larga</Text>
                    <Text style={styles.sessionDate}>15 Abr - 8:00</Text>
                  </View>
                  <View style={styles.sessionStatus}>
                    <Text style={styles.sessionAttendance}>4/5</Text>
                    <Text style={styles.sessionLabel}>asistieron</Text>
                  </View>
                </View>
                <View style={styles.sessionItem}>
                  <View style={styles.sessionInfo}>
                    <Text style={styles.sessionName}>Intervalos</Text>
                    <Text style={styles.sessionDate}>13 Abr - 18:00</Text>
                  </View>
                  <View style={styles.sessionStatus}>
                    <Text style={styles.sessionAttendance}>5/5</Text>
                    <Text style={styles.sessionLabel}>asistieron</Text>
                  </View>
                </View>
              </View>
            </Card>

            <Card title="Progreso del Plan">
              <ProgressBar progress={42} label="Plan 10K - 8 Semanas" />
              <View style={styles.weekProgress}>
                <Text style={styles.weekLabel}>Semana actual: 4/8</Text>
                <Text style={styles.weekValue}>42%</Text>
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
    alignItems: 'center',
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
  headerStats: {
    flexDirection: 'row',
    gap: 24,
    flex: 1,
  },
  headerStat: {
    alignItems: 'center',
    flex: 1,
  },
  headerStatValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2563eb',
  },
  headerStatLabel: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
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
  calendarNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  calendarTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    minWidth: 80,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  calendarDay: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    minHeight: 80,
  },
  calendarDayToday: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  calendarDayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  calendarDayLabelToday: {
    color: '#2563eb',
  },
  workoutIndicator: {
    marginTop: 8,
  },
  workoutIndicatorText: {
    fontSize: 24,
  },
  workoutsTable: {
    gap: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tableRowEven: {
    backgroundColor: '#fafbfc',
  },
  tableCell: {
    paddingHorizontal: 8,
  },
  cellName: {
    flex: 1.5,
  },
  cellType: {
    flex: 0.8,
  },
  cellDuration: {
    flex: 0.7,
    textAlign: 'center',
    fontSize: 13,
    color: '#1e293b',
  },
  cellDistance: {
    flex: 0.7,
    textAlign: 'center',
    fontSize: 13,
    color: '#1e293b',
  },
  cellIntensity: {
    flex: 0.8,
    alignItems: 'center',
  },
  workoutName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  workoutDesc: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  intensityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  intensityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  nextWorkout: {
    gap: 12,
  },
  nextWorkoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nextWorkoutDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  nextWorkoutName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563eb',
    marginVertical: 8,
  },
  nextWorkoutDetails: {
    gap: 6,
    marginBottom: 12,
  },
  nextWorkoutDetail: {
    fontSize: 13,
    color: '#64748b',
  },
  nextWorkoutActions: {
    flexDirection: 'row',
    gap: 8,
  },
  sessionsList: {
    gap: 12,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  sessionDate: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  sessionStatus: {
    alignItems: 'center',
  },
  sessionAttendance: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },
  sessionLabel: {
    fontSize: 11,
    color: '#64748b',
  },
  weekProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  weekLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  weekValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },
  bottomSpacing: {
    height: 100,
  },
});