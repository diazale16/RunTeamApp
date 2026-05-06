import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Button, Badge, ProgressBar } from '../../components';
import { trainingPlans } from '../../data/mockData';
import { isWeb } from '../../utils/platform';

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

export default function TrainingScreen() {
  const router = useRouter();

  const handlePlanWorkout = () => {
    if (isWeb) {
      alert('La planificación con IA está disponible en la app móvil');
    } else {
      alert('🤖 Asistente IA: Generando plan personalizado...');
    }
  };

  return (
    <ScrollView 
      style={isWeb ? styles.scrollWeb : undefined} 
      contentContainerStyle={isWeb ? styles.scrollContentWeb : undefined}
      showsVerticalScrollIndicator={!isWeb}
    >
      {isWeb ? (
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
              <Card title="Calendario de Entrenamientos" rightContent={
                <View style={styles.calendarNav}>
                  <Button title="◀" onPress={() => {}} variant="secondary" style={{ paddingHorizontal: 12 }} />
                  <Text style={styles.calendarTitle}>Abril 2026</Text>
                  <Button title="▶" onPress={() => {}} variant="secondary" style={{ paddingHorizontal: 12 }} />
                </View>
              }>
                <View style={styles.calendarGrid}>
                  {weekDays.map((day, index) => (
                    <View key={day} style={[styles.calendarDay, index === 1 && styles.calendarDayToday]}>
                      <Text style={[styles.calendarDayLabel, index === 1 && styles.calendarDayLabelToday]}>
                        {day}
                      </Text>
                      {index === 1 && <View style={styles.workoutIndicator}><Text style={styles.workoutIndicatorText}>🏃</Text></View>}
                      {index === 3 && <View style={styles.workoutIndicator}><Text style={styles.workoutIndicatorText}>⚡</Text></View>}
                      {index === 5 && <View style={styles.workoutIndicator}><Text style={styles.workoutIndicatorText}>🏃</Text></View>}
                    </View>
                  ))}
                </View>
              </Card>

              {trainingPlans.map((plan) => (
                <Card key={plan.id} title={plan.name} subtitle={plan.description} rightContent={
                  <Badge text={`${plan.workouts.length} workouts`} variant="info" />
                }>
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
        </View>
      ) : (
        <View>
          <Card title="Planes de Entrenamiento">
            <Text style={styles.subtitle}>Crea y gestiona planes de entrenamiento para tu equipo</Text>
            <View style={styles.planActions}>
              <Button title="Crear Nuevo Plan" onPress={() => alert('Crear plan')} variant="primary" />
              {!isWeb && (
                <View style={styles.aiButton}>
                  <Button title="🤖 Asistente IA" onPress={handlePlanWorkout} variant="secondary" />
                </View>
              )}
            </View>
          </Card>

          {trainingPlans.map((plan) => (
            <Card key={plan.id} title={plan.name} subtitle={plan.description}>
              <Text style={styles.workoutsTitle}>Entrenamientos ({plan.workouts.length})</Text>
              {plan.workouts.map((workout) => (
                <View key={workout.id} style={styles.workoutItem}>
                  <View style={styles.workoutHeader}>
                    <View style={styles.workoutInfo}>
                      <Text style={styles.workoutName}>{workout.name}</Text>
                      <View style={styles.workoutMeta}>
                        <Badge text={typeLabels[workout.type]} variant={typeColors[workout.type] as any} />
                        {workout.distance && <Text style={styles.workoutDistance}>{workout.distance} km</Text>}
                        <Text style={styles.workoutDuration}>{workout.duration} min</Text>
                      </View>
                    </View>
                    <View style={[styles.intensityBadge, { backgroundColor: intensityColors[workout.intensity].bg }]}>
                      <Text style={[styles.intensityText, { color: intensityColors[workout.intensity].text }]}>
                        {workout.intensity.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.workoutDescription}>{workout.description}</Text>
                </View>
              ))}
            </Card>
          ))}

          <Card title="Calendario de Entrenamientos">
            <View style={styles.weekDays}>
              {weekDays.map((day, index) => (
                <View key={day} style={[styles.dayColumn, index === 5 && styles.weekendColumn]}>
                  <Text style={styles.dayLabel}>{day}</Text>
                  <View style={[styles.dayDot, (index === 1 || index === 3 || index === 5) && styles.dayDotActive]} />
                </View>
              ))}
            </View>
          </Card>

          {!isWeb && (
            <Card title="Control de Sesiones Grupales">
              <Text style={styles.sectionText}>Genera códigos QR para tomar asistencia en entrenamientos grupales.</Text>
              <View style={styles.qrSection}>
                <View style={styles.qrPlaceholder}>
                  <Text style={styles.qrIcon}>📱</Text>
                  <Text style={styles.qrText}>Código QR</Text>
                </View>
                <View style={styles.qrActions}>
                  <Button title="Generar QR" onPress={() => alert('Generando código QR...')} variant="primary" />
                  <Button title="Escanear QR" onPress={() => alert('Abrir scanner...')} variant="secondary" />
                </View>
              </View>
              <View style={styles.mobileNote}>
                <Text style={styles.mobileNoteText}>📍 Los corredores escanean el QR para registrar su asistencia</Text>
              </View>
            </Card>
          )}
        </View>
      )}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  },
  headerStats: {
    flexDirection: 'row',
    gap: 40,
  },
  headerStat: {
    alignItems: 'center',
  },
  headerStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  headerStatLabel: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
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
    minWidth: 100,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  calendarDay: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    flex: 1,
    marginHorizontal: 4,
  },
  calendarDayToday: {
    backgroundColor: '#2563eb',
  },
  calendarDayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  calendarDayLabelToday: {
    color: '#fff',
  },
  workoutIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutIndicatorText: {
    fontSize: 16,
  },
  workoutsTable: {
    marginTop: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    alignItems: 'center',
  },
  tableRowEven: {
    backgroundColor: '#fafbfc',
  },
  tableCell: {
    paddingHorizontal: 8,
  },
  cellName: {
    flex: 2,
  },
  cellType: {
    flex: 1,
  },
  cellDuration: {
    flex: 0.7,
    textAlign: 'center',
    fontSize: 14,
    color: '#64748b',
  },
  cellDistance: {
    flex: 0.7,
    textAlign: 'center',
    fontSize: 14,
    color: '#64748b',
  },
  cellIntensity: {
    flex: 0.8,
    alignItems: 'center',
  },
  workoutName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  workoutDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  intensityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  intensityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  nextWorkout: {
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  nextWorkoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nextWorkoutDay: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  nextWorkoutName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  nextWorkoutDetails: {
    gap: 6,
    marginBottom: 16,
  },
  nextWorkoutDetail: {
    fontSize: 13,
    color: '#64748b',
  },
  nextWorkoutActions: {
    gap: 8,
  },
  sessionsList: {
    gap: 12,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  sessionInfo: {},
  sessionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  sessionDate: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  sessionStatus: {
    alignItems: 'flex-end',
  },
  sessionAttendance: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },
  sessionLabel: {
    fontSize: 10,
    color: '#94a3b8',
  },
  weekProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  weekLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  weekValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  planActions: {
    marginTop: 16,
    gap: 12,
  },
  aiButton: {
    marginTop: 8,
  },
  workoutsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
    marginTop: 8,
  },
  workoutItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  workoutDistance: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  workoutDuration: {
    fontSize: 13,
    color: '#666',
  },
  workoutDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  weekendColumn: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 2,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  dayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e5e5',
  },
  dayDotActive: {
    backgroundColor: '#2563eb',
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  qrSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 20,
  },
  qrPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderStyle: 'dashed',
  },
  qrIcon: {
    fontSize: 32,
  },
  qrText: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  qrActions: {
    flex: 1,
    gap: 12,
  },
  mobileNote: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
  },
  mobileNoteText: {
    fontSize: 13,
    color: '#1e40af',
  },
  bottomSpacing: {
    height: 100,
  },
});
