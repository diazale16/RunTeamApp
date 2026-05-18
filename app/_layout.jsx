import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { isWeb } from '../utils/platform.js';
import { tabNavigationItems, tabTitles } from '../routes/appRoutes.js';
import { goToTab } from '../routes/navigation.js';
import { AppProviders } from '../providers/AppProviders.jsx';

export function WebShell({ children }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isActive = (name) => {
    if (name === 'index') {
      return pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/index';
    }
    return pathname.includes(`/${name}`);
  };

  const getCurrentTitle = () => {
    if (pathname.includes('/team')) return tabTitles.team;
    if (pathname.includes('/training')) return tabTitles.training;
    if (pathname.includes('/profile')) return tabTitles.profile;
    return tabTitles.index;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.sidebar, sidebarCollapsed && styles.sidebarCollapsed]}>
        <View style={styles.logo}>
          <Text style={styles.logoIcon}>🏃</Text>
          {!sidebarCollapsed && <Text style={styles.logoText}>RunTeam</Text>}
        </View>

        <TouchableOpacity style={styles.collapseBtn} onPress={() => setSidebarCollapsed(!sidebarCollapsed)}>
          <Text style={styles.collapseIcon}>{sidebarCollapsed ? '→' : '←'}</Text>
        </TouchableOpacity>

        <View style={styles.navItems}>
          {tabNavigationItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[styles.navItem, isActive(item.name) && styles.navItemActive]}
              onPress={() => goToTab(item.name)}
            >
              <Text style={styles.navIcon}>{item.icon}</Text>
              {!sidebarCollapsed && (
                <Text style={[styles.navLabel, isActive(item.name) && styles.navLabelActive]}>
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sidebarFooter}>
          {!sidebarCollapsed && (
            <View>
              <Text style={styles.userName}>Juan Pérez</Text>
              <Text style={styles.userRole}>Entrenador</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{getCurrentTitle()}</Text>
          <View style={styles.headerActions}>
            <Text style={styles.headerIcon}>🔔</Text>
            <Text style={styles.headerIcon}>⚙️</Text>
          </View>
        </View>

        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
}

export function MobileShell({ children }) {
  const pathname = usePathname();

  const isActive = (name) => {
    if (name === 'index') {
      return pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/index';
    }
    return pathname.includes(`/${name}`);
  };

  return (
    <View style={styles.mobileContainer}>
      <View style={styles.mobileContent}>{children}</View>
      <View style={styles.mobileTabs}>
        {tabNavigationItems.map((item) => (
          <TouchableOpacity key={item.name} style={styles.mobileTab} onPress={() => goToTab(item.name)}>
            <Text style={[styles.mobileTabIcon, isActive(item.name) && styles.mobileTabIconActive]}>
              {item.icon}
            </Text>
            <Text style={[styles.mobileTabLabel, isActive(item.name) && styles.mobileTabLabelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style={isWeb ? 'dark' : 'light'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="activity" options={{ presentation: 'modal' }} />
        <Stack.Screen name="location-tracker" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
    </AppProviders>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f8fafc' },
  sidebar: { backgroundColor: '#1e293b', width: 240, paddingVertical: 20, justifyContent: 'space-between' },
  sidebarCollapsed: { width: 70 },
  logo: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 30 },
  logoIcon: { fontSize: 28 },
  logoText: { fontSize: 20, fontWeight: '700', color: '#fff', marginLeft: 12 },
  collapseBtn: { position: 'absolute', right: -12, top: 60, width: 24, height: 24, backgroundColor: '#2563eb', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  collapseIcon: { color: '#fff', fontSize: 12, fontWeight: '600' },
  navItems: { flex: 1, paddingHorizontal: 12 },
  navItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10, marginBottom: 4 },
  navItemActive: { backgroundColor: '#2563eb' },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: 15, fontWeight: '500', color: '#94a3b8', marginLeft: 12 },
  navLabelActive: { color: '#fff', fontWeight: '600' },
  sidebarFooter: { paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#334155' },
  userName: { fontSize: 14, fontWeight: '600', color: '#fff' },
  userRole: { fontSize: 12, color: '#94a3b8', marginTop: 2, textTransform: 'capitalize' },
  main: { flex: 1, flexDirection: 'column' },
  header: { height: 64, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 32 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1e293b' },
  headerActions: { flexDirection: 'row', gap: 16 },
  headerIcon: { fontSize: 20, opacity: 0.6 },
  content: { flex: 1, overflow: 'scroll' },
  mobileContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  mobileContent: { flex: 1 },
  mobileTabs: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e5e5', paddingBottom: 20, paddingTop: 8 },
  mobileTab: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  mobileTabIcon: { fontSize: 22, marginBottom: 2, opacity: 0.5 },
  mobileTabIconActive: { opacity: 1 },
  mobileTabLabel: { fontSize: 11, color: '#999', fontWeight: '500' },
  mobileTabLabelActive: { color: '#2563eb', fontWeight: '600' },
});