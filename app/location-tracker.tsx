import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { ScreenContainer, Card, Button } from '../components';

interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export default function LocationTrackerScreen() {
  const router = useRouter();
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [route, setRoute] = useState<LocationData[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const requestPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Permiso requerido',
          'Necesitamos acceso a tu ubicación para rastrear tu carrera.'
        );
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      setHasPermission(false);
    }
  };

  const startTracking = async () => {
    if (!hasPermission) {
      await requestPermissions();
      return;
    }

    setIsTracking(true);
    setElapsedTime(0);
    setDistance(0);
    setRoute([]);

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (location) => {
        const newPoint = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp: location.timestamp,
        };
        setLocation(newPoint);

        if (route.length > 0) {
          const lastPoint = route[route.length - 1];
          const dist = calculateDistance(
            lastPoint.latitude,
            lastPoint.longitude,
            newPoint.latitude,
            newPoint.longitude
          );
          setDistance((prev) => prev + dist);
        }

        setRoute((prev) => [...prev, newPoint]);
      }
    );
  };

  const stopTracking = () => {
    setIsTracking(false);
    Alert.alert(
      'Entrenamiento Guardado',
      `Duración: ${formatTime(elapsedTime)}\nDistancia: ${distance.toFixed(2)} km\nRuta registrada: ${route.length} puntos`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDistance = (km: number): string => {
    if (km < 1) {
      return `${Math.round(km * 1000)} m`;
    }
    return `${km.toFixed(2)} km`;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Seguimiento GPS',
          presentation: 'fullScreenModal',
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Tiempo</Text>
            <Text style={styles.statValue}>{formatTime(elapsedTime)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Distancia</Text>
            <Text style={styles.statValue}>{formatDistance(distance)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Ritmo</Text>
            <Text style={styles.statValue}>
              {distance > 0 ? `${(elapsedTime / 60 / distance).toFixed(2)}` : '--'}
              <Text style={styles.statUnit}> min/km</Text>
            </Text>
          </View>
        </View>

        <Card title="Mapa de Ruta">
          <View style={styles.mapPlaceholder}>
            {isTracking && location ? (
              <View style={styles.mapContent}>
                <Text style={styles.mapIcon}>📍</Text>
                <Text style={styles.mapText}>
                  Ubicación actual: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </Text>
                <Text style={styles.mapPoints}>
                  Puntos registrados: {route.length}
                </Text>
                {route.length > 1 && (
                  <Text style={styles.routeInfo}>
                    📊 Ruta mostrándose en mapa interactivo...
                  </Text>
                )}
              </View>
            ) : (
              <View style={styles.mapContent}>
                <Text style={styles.mapIcon}>🗺️</Text>
                <Text style={styles.mapText}>
                  {hasPermission === false
                    ? 'Permisos de ubicación no concedidos'
                    : 'Presiona "Iniciar" para comenzar a rastrear'}
                </Text>
              </View>
            )}
          </View>
        </Card>

        <Card title="Sensores del Dispositivo">
          <View style={styles.sensorsInfo}>
            <View style={styles.sensorRow}>
              <Text style={styles.sensorIcon}>📡</Text>
              <View style={styles.sensorText}>
                <Text style={styles.sensorName}>GPS</Text>
                <Text style={styles.sensorStatus}>
                  {hasPermission ? 'Activo' : 'Sin permiso'}
                </Text>
              </View>
              <View
                style={[
                  styles.sensorIndicator,
                  hasPermission ? styles.sensorActive : styles.sensorInactive,
                ]}
              />
            </View>
            <View style={styles.sensorRow}>
              <Text style={styles.sensorIcon}>⚡</Text>
              <View style={styles.sensorText}>
                <Text style={styles.sensorName}>Acelerómetro</Text>
                <Text style={styles.sensorStatus}>
                  {isTracking ? 'Monitoreando pasos' : 'Disponible'}
                </Text>
              </View>
              <View
                style={[
                  styles.sensorIndicator,
                  isTracking ? styles.sensorActive : styles.sensorInactive,
                ]}
              />
            </View>
            <View style={styles.sensorRow}>
              <Text style={styles.sensorIcon}>❤️</Text>
              <View style={styles.sensorText}>
                <Text style={styles.sensorName}>Frecuencia Cardíaca</Text>
                <Text style={styles.sensorStatus}>
                  {isTracking ? 'Conectar dispositivo' : 'Requerido wearable'}
                </Text>
              </View>
              <View style={[styles.sensorIndicator, styles.sensorInactive]} />
            </View>
          </View>
        </Card>

        <View style={styles.controlsContainer}>
          {!isTracking ? (
            <Button
              title="▶️ INICIAR ENTRENAMIENTO"
              onPress={startTracking}
              variant="primary"
              style={styles.mainButton}
              textStyle={styles.mainButtonText}
            />
          ) : (
            <Button
              title="⏹️ FINALIZAR"
              onPress={stopTracking}
              variant="danger"
              style={styles.mainButton}
              textStyle={styles.mainButtonText}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  statUnit: {
    fontSize: 12,
    fontWeight: '400',
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContent: {
    alignItems: 'center',
    padding: 20,
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  mapText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  mapPoints: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  routeInfo: {
    fontSize: 13,
    color: '#2563eb',
    marginTop: 12,
    fontWeight: '500',
  },
  sensorsInfo: {
    gap: 16,
  },
  sensorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sensorIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sensorText: {
    flex: 1,
  },
  sensorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  sensorStatus: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  sensorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  sensorActive: {
    backgroundColor: '#22c55e',
  },
  sensorInactive: {
    backgroundColor: '#dc2626',
  },
  controlsContainer: {
    marginTop: 'auto',
    paddingTop: 16,
  },
  mainButton: {
    paddingVertical: 18,
    borderRadius: 12,
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
