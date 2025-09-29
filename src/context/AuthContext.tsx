import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'Nguyễn Văn A',
  email: 'admin@vietnam-airlines.com',
  role: 'Quản trị viên hệ thống',
  phone: '+84 901 234 567',
  employeeId: 'VNA-2024-001',
  status: 'verified',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('ifc-token');
    if (token) {
      setUser(mockUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Mock login validation
    if (email === 'admin@vietnam-airlines.com' && password === 'admin123') {
      setUser(mockUser);
      localStorage.setItem('ifc-token', 'mock-token');
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ifc-token');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}