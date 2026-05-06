import { User, Team, TrainingPlan, Activity, Achievement, Subscription } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'Juan Pérez',
  email: 'juan@runteam.com',
  role: 'entrenador',
  avatar: 'https://i.pravatar.cc/150?u=user1',
  teamId: 'team-1',
};

export const users: User[] = [
  currentUser,
  { id: 'user-2', name: 'María García', email: 'maria@runteam.com', role: 'corredor', avatar: 'https://i.pravatar.cc/150?u=user2', teamId: 'team-1' },
  { id: 'user-3', name: 'Carlos López', email: 'carlos@runteam.com', role: 'corredor', avatar: 'https://i.pravatar.cc/150?u=user3', teamId: 'team-1' },
  { id: 'user-4', name: 'Ana Martínez', email: 'ana@runteam.com', role: 'corredor', avatar: 'https://i.pravatar.cc/150?u=user4', teamId: 'team-1' },
  { id: 'user-5', name: 'Pedro Sánchez', email: 'pedro@runteam.com', role: 'corredor', avatar: 'https://i.pravatar.cc/150?u=user5', teamId: 'team-1' },
  { id: 'user-6', name: 'Laura Rodríguez', email: 'laura@runteam.com', role: 'corredor', avatar: 'https://i.pravatar.cc/150?u=user6', teamId: 'team-1' },
];

export const teams: Team[] = [
  {
    id: 'team-1',
    name: 'Corredores Urbanos',
    description: 'Equipo de running para principiantes y intermedios',
    coachId: 'user-1',
    runners: ['user-2', 'user-3', 'user-4', 'user-5', 'user-6'],
    groups: [
      { id: 'group-1', name: 'Grupo A - Avanzados', teamId: 'team-1', runnerIds: ['user-3', 'user-4'] },
      { id: 'group-2', name: 'Grupo B - Principiantes', teamId: 'team-1', runnerIds: ['user-2', 'user-5', 'user-6'] },
    ],
  },
];

export const trainingPlans: TrainingPlan[] = [
  {
    id: 'plan-1',
    name: 'Plan 10K - 8 Semanas',
    description: 'Programa para correr tu primera carrera de 10km',
    coachId: 'user-1',
    workouts: [
      { id: 'w-1', planId: 'plan-1', name: 'Carrera larga', type: 'fondo_largo', duration: 60, intensity: 'media', distance: 10, description: 'Corre a ritmo cómodo' },
      { id: 'w-2', planId: 'plan-1', name: 'Intervalos', type: 'intervalos', duration: 45, intensity: 'alta', distance: 8, description: '6x800m a ritmo fuerte' },
      { id: 'w-3', planId: 'plan-1', name: 'Descanso activo', type: 'descanso', duration: 30, intensity: 'baja', description: 'Caminata o trote suave' },
      { id: 'w-4', planId: 'plan-1', name: 'Tempo', type: 'tempo', duration: 40, intensity: 'alta', distance: 7, description: '20min calentamiento, 15min tempo, 5min enfriamiento' },
      { id: 'w-5', planId: 'plan-1', name: 'Sprints', type: 'sprints', duration: 30, intensity: 'alta', description: '10x100m a máxima velocidad' },
    ],
  },
  {
    id: 'plan-2',
    name: 'Plan Media Maratón',
    description: 'Preparate para 21km en 12 semanas',
    coachId: 'user-1',
    workouts: [
      { id: 'w-6', planId: 'plan-2', name: 'Fondo largo', type: 'fondo_largo', duration: 120, intensity: 'media', distance: 20, description: 'Larga carrera de preparación' },
      { id: 'w-7', planId: 'plan-2', name: 'Series', type: 'intervalos', duration: 50, intensity: 'alta', distance: 10, description: '5x1000m' },
    ],
  },
];

export const activities: Activity[] = [
  { id: 'act-1', userId: 'user-2', date: '2026-04-14', type: 'running', duration: 45, distance: 8.5, pace: 5.3, completed: true },
  { id: 'act-2', userId: 'user-2', date: '2026-04-12', type: 'running', duration: 30, distance: 5.2, pace: 5.8, completed: true },
  { id: 'act-3', userId: 'user-3', date: '2026-04-14', type: 'running', duration: 60, distance: 12.0, pace: 5.0, completed: true },
  { id: 'act-4', userId: 'user-4', date: '2026-04-13', type: 'running', duration: 50, distance: 10.0, pace: 5.0, completed: true },
  { id: 'act-5', userId: 'user-2', date: '2026-04-10', type: 'running', duration: 40, distance: 7.0, pace: 5.7, completed: true },
];

export const achievements: Achievement[] = [
  { id: 'ach-1', name: 'Primer Paso', description: 'Completaste tu primera carrera', icon: '🎯', unlocked: true, unlockedAt: '2026-01-15' },
  { id: 'ach-2', name: 'Semana Perfecta', description: 'Entrenaste 5 días seguidos', icon: '🔥', unlocked: true, unlockedAt: '2026-02-20' },
  { id: 'ach-3', name: 'Maratoniano', description: 'Corre tu primera maratón', icon: '🏃', unlocked: false },
  { id: 'ach-4', name: 'Velocista', description: 'Corre 100m en menos de 12 segundos', icon: '⚡', unlocked: false },
  { id: 'ach-5', name: 'Constante', description: 'Mantén tu racha por 30 días', icon: '💪', unlocked: false },
];

export const subscription: Subscription = {
  id: 'sub-1',
  userId: 'user-1',
  plan: 'premium',
  status: 'active',
  startDate: '2026-01-01',
  endDate: '2027-01-01',
};
