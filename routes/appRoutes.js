export const appRoutes = {
  home: '/(tabs)',
  team: '/(tabs)/team',
  training: '/(tabs)/training',
  profile: '/(tabs)/profile',
  activity: '/activity',
  locationTracker: '/location-tracker',
};

export const tabNavigationItems = [
  { name: 'index', label: 'Inicio', icon: '🏠', href: appRoutes.home, title: 'Dashboard' },
  { name: 'team', label: 'Equipo', icon: '👥', href: appRoutes.team, title: 'Gestión de Equipo' },
  { name: 'training', label: 'Entrenos', icon: '🏃', href: appRoutes.training, title: 'Planificación' },
  { name: 'profile', label: 'Perfil', icon: '👤', href: appRoutes.profile, title: 'Mi Perfil' },
];

export const mobileOnlyRoutes = [appRoutes.activity, appRoutes.locationTracker];

export const tabTitles = {
  index: 'Dashboard',
  team: 'Gestión de Equipo',
  training: 'Planificación',
  profile: 'Mi Perfil',
};