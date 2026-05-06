import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import { ScreenContainer, Card, Button } from '../components';
import { isWeb } from '../utils/platform';
import { MobileOnlyRoute } from '../components/PlatformGate';

export default function ActivityScreen() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    if (isWeb) {
      Alert.alert('Error', 'El registro con GPS solo está disponible en la app móvil');
    } else {
      setIsRecording(true);
      router.push('/location-tracker');
    }
  };

  const handleManualEntry = () => {
    Alert.alert(
      'Registro Manual',
      'Ingresa los datos de tu entrenamiento manualmente.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: '10 km - 50 min', onPress: () => alert('Actividad registrada: 10km en 50min') },
        { text: '5 km - 25 min', onPress: () => alert('Actividad registrada: 5km en 25min') },
      ]
    );
  };

  return (
    <MobileOnlyRoute>
      <>
        <Stack.Screen
          options={{
            title: 'Registrar Actividad',
            presentation: 'modal',
          }}
        />
        <ScreenContainer>
          <View style={styles.container}>
            <Card title="¿Cómo quieres registrar tu actividad?">
              <View style={styles.optionsContainer}>
                <View style={styles.optionCard}>
                  <Text style={styles.optionIcon}>🏃</Text>
                  <Text style={styles.optionTitle}>GPS en Vivo</Text>
                  <Text style={styles.optionDescription}>
                    Registra tu ruta en tiempo real usando el GPS del celular
                  </Text>
                  <Button
                    title="Iniciar con GPS"
                    onPress={handleStartRecording}
                    variant="primary"
                  />
                </View>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>O</Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.optionCard}>
                  <Text style={styles.optionIcon}>📝</Text>
                  <Text style={styles.optionTitle}>Manual</Text>
                  <Text style={styles.optionDescription}>
                    Ingresa los datos de tu entrenamiento manualmente
                  </Text>
                  <Button
                    title="Ingresar Manualmente"
                    onPress={handleManualEntry}
                    variant="secondary"
                  />
                </View>
              </View>
            </Card>

            <Card title="Entrenamientos Recientes">
              <Text style={styles.recentText}>
                Tus últimos entrenamientos aparecerán aquí
              </Text>
            </Card>

            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>💡</Text>
              <Text style={styles.infoText}>
                Durante el registro con GPS, tu ubicación se trackeará continuamente 
                para mostrar tu ruta en el mapa al finalizar.
              </Text>
            </View>
          </View>
        </ScreenContainer>
      </>
    </MobileOnlyRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 24 : 0,
  },
  optionsContainer: {
    gap: 20,
  },
  optionCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  optionIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e5e5',
  },
  dividerText: {
    fontSize: 14,
    color: '#999',
  },
  recentText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 20,
  },
  infoBox: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    gap: 12,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1e40af',
    lineHeight: 18,
  },
});
