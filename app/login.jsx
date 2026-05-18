import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useAppStore } from '../store/appStore.js';
import { currentUser as mockCurrentUser } from '../data/mockData.js';

export default function LoginScreen() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const router = useRouter();
  const setToken = useAppStore((s) => s.setToken);
  const setUser = useAppStore((s) => s.setUser);

  const mutation = useMutation(async ({ email, password }) => {
    // Simulated login: accept any credentials and return a fake token
    await new Promise((r) => setTimeout(r, 500));
    return { token: 'fake-token-1234', user: mockCurrentUser };
  }, {
    onSuccess: (data) => {
      // persist token in localStorage (web) so rehydration can pick it up
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('@runteam:token', data.token);
        }
      } catch (e) {}

      setToken(data.token);
      setUser(data.user);
      router.replace('/(tabs)');
    },
  });

  const onSubmit = () => {
    mutation.mutate({ email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>{mutation.isLoading ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>
      {mutation.isError && <Text style={styles.error}>Error al loguear</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 12 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 12, borderRadius: 8 },
  btn: { backgroundColor: '#2563eb', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '600' },
  error: { marginTop: 12, color: 'red' },
});
