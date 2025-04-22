import React from 'react';

// Create context with default undefined value
const UserContext = React.createContext(undefined);

/**
 * UserProvider Component - Updated for React 19
 */
export function UserProvider({ children }) {
  // State for user data
  const [user, setUser] = React.useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error retrieving user from localStorage:', error);
      return null;
    }
  });

  // Derived state for authentication status
  const isAuthenticated = !!user;

  /**
   * Login function
   */
  const login = (userData) => {
    if (!userData) {
      throw new Error('User data is required for login');
    }

    if (!userData.id || !userData.role) {
      throw new Error('User data must include id and role');
    }

    setUser(userData);
    return userData;
  };

  /**
   * Logout function
   */
  const logout = () => {
    setUser(null);
  };

  // Sync user state with localStorage
  React.useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error syncing user to localStorage:', error);
    }
  }, [user]);

  // Context value
  const contextValue = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * useUser Hook - Updated for React 19
 */
export function useUser() {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

// Export default for convenience
export default { UserProvider, useUser };