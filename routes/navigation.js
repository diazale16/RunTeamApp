import { router } from 'expo-router';
import { appRoutes } from './appRoutes';

export function goToTab(name) {
  switch (name) {
    case 'index':
      router.push(appRoutes.home);
      return;
    case 'team':
      router.push(appRoutes.team);
      return;
    case 'training':
      router.push(appRoutes.training);
      return;
    case 'profile':
      router.push(appRoutes.profile);
      return;
    default:
      router.push(appRoutes.home);
  }
}

export function goToHome() {
  router.push(appRoutes.home);
}

export function goToActivity() {
  router.push(appRoutes.activity);
}