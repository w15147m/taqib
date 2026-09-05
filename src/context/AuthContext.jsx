import React, { createContext, useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from AsyncStorage on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const authInfo = await getItem('authInfo');
      if (authInfo) {
        setUser(authInfo);
      } else {
        // Bypass login system by default on first install
        setUser({
          user: {
            id: 1,
            name: 'Guest User',
            email: 'guest@taqeebat.com',
            profile_image: null,
          },
          token: 'guest-token',
        });
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      await setItem('authInfo', userData);
      setUser(userData);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user?.user?.id) throw new Error('User not found');

      const updatedUser = {
        ...user,
        user: {
          ...user.user,
          ...updates,
        },
      };

      await setItem('authInfo', updatedUser);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await removeItem('authInfo');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const changePassword = async () => {
    return true;
  };

  const deleteUser = async () => {
    await logout();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      updateProfile, 
      changePassword,
      deleteUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
