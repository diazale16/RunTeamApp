import { create } from 'zustand';
import { activities, currentUser, subscription, teams, trainingPlans } from '../data/mockData';

const initialState = {
  currentUser,
  teams,
  trainingPlans,
  activities,
  subscription,
  activeTeamId: currentUser.teamId,
  // auth slice
  token: null,
  user: null,
  hydrated: false,
};

export const useAppStore = create((set, get) => ({
  ...initialState,
  // core setters
  setCurrentUser: (user) => set({ currentUser: user }),
  setActiveTeamId: (activeTeamId) => set({ activeTeamId }),
  addActivity: (activity) =>
    set((state) => ({
      activities: [activity, ...state.activities],
    })),
  updateSubscription: (nextSubscription) => set({ subscription: nextSubscription }),

  // auth helpers
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  setHydrated: (hydrated) => set({ hydrated }),
  signOut: () => set({ token: null, user: null }),
  // convenience getter (not a hook) available via useAppStore.getState()
  getAuth: () => ({ token: get().token, user: get().user }),
}));