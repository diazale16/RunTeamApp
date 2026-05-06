export interface User {
  id: string;
  name: string;
  email: string;
  role: 'entrenador' | 'corredor' | 'administrador';
  avatar: string;
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  coachId: string;
  runners: string[];
  groups: Group[];
}

export interface Group {
  id: string;
  name: string;
  teamId: string;
  runnerIds: string[];
}

export interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  coachId: string;
  workouts: Workout[];
}

export interface Workout {
  id: string;
  planId: string;
  name: string;
  type: 'intervalos' | 'fondo_largo' | 'tempo' | 'descanso' | 'sprints';
  duration: number;
  intensity: 'baja' | 'media' | 'alta';
  distance?: number;
  description: string;
}

export interface Activity {
  id: string;
  userId: string;
  date: string;
  type: string;
  duration: number;
  distance: number;
  pace: number;
  route?: { lat: number; lng: number }[];
  completed: boolean;
}

export interface Attendance {
  id: string;
  workoutId: string;
  userId: string;
  present: boolean;
  timestamp?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'basic' | 'premium';
  status: 'active' | 'expired' | 'trial';
  startDate: string;
  endDate: string;
}
