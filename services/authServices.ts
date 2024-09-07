// services/authService.ts
export const loginToBackend = async (username: string, password: string): Promise<string> => {
    // Simulate an API call to the backend that returns a token
    if (username === 'test' && password === '123') {
      return 'success'; // Simulated token
    }
    throw new Error('Invalid credentials');
  };
  