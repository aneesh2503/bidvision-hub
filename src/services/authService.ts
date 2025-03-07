
// This is a simple mock auth service
// In a real app, this would connect to a backend authentication service

interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
}

// Check if user is stored in localStorage
const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Store user in localStorage
const storeUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Remove user from localStorage
const removeUser = (): void => {
  localStorage.removeItem('user');
};

// Mock sign in function
const signIn = (provider: string): User => {
  // In a real app, this would authenticate with a backend
  const mockUser: User = {
    id: 'user-' + Math.random().toString(36).substr(2, 9),
    name: 'Test User',
    email: 'user@example.com',
    provider
  };
  
  storeUser(mockUser);
  return mockUser;
};

// Sign out function
const signOut = (): void => {
  removeUser();
};

// Check if user is authenticated
const isAuthenticated = (): boolean => {
  return !!getStoredUser();
};

// Get current user
const getCurrentUser = (): User | null => {
  return getStoredUser();
};

export const authService = {
  signIn,
  signOut,
  isAuthenticated,
  getCurrentUser
};
