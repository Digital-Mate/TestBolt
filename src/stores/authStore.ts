import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/auth';
import { login as apiLogin, getProfile } from '../api/auth';

interface AuthStore extends AuthState {
  token: string | null;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user: User) => set({ user }),
      login: async (email: string, password: string) => {
        try {
          const { user, token } = await apiLogin(email, password);
          set({ user, token, isAuthenticated: true });
        } catch (error) {
          set({ user: null, token: null, isAuthenticated: false });
          throw error;
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);