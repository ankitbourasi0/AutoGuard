import { useAuthStore } from '../states/index';


export const useUser = () => {
    const user = useAuthStore((state) => state.user);
    if (!user) {
      throw new Error('User not loaded. Call initializeAuth first.');
    }
    return user;
  };