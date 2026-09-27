import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'customer' | 'admin' | 'superadmin' | null;

export interface User {
  email: string;
  name: string;
  role: UserRole;
  storeName?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
}

const DEMO_USERS: Record<string, User> = {
  'customer@demo.com': {
    email: 'customer@demo.com',
    name: 'Aarav Sharma',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  'admin@demo.com': {
    email: 'admin@demo.com',
    name: 'Vikram Sengupta (Shop Owner)',
    role: 'admin',
    storeName: 'Urban Style Fashion',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  'superadmin@demo.com': {
    email: 'superadmin@demo.com',
    name: 'SaaS Platform Administrator',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('localstore_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    // Default logged in as customer for immediate seamless experience
    return DEMO_USERS['customer@demo.com'];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('localstore_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('localstore_user');
    }
  }, [user]);

  const login = (email: string, explicitRole?: UserRole): boolean => {
    const trimmed = email.trim().toLowerCase();
    let matchedUser = DEMO_USERS[trimmed];

    if (!matchedUser && explicitRole) {
      matchedUser = {
        email: trimmed,
        name: trimmed.split('@')[0],
        role: explicitRole,
      };
    } else if (!matchedUser) {
      if (trimmed.includes('super')) {
        matchedUser = DEMO_USERS['superadmin@demo.com'];
      } else if (trimmed.includes('admin')) {
        matchedUser = DEMO_USERS['admin@demo.com'];
      } else {
        matchedUser = DEMO_USERS['customer@demo.com'];
      }
    }

    setUser(matchedUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'customer') {
      setUser(DEMO_USERS['customer@demo.com']);
    } else if (newRole === 'admin') {
      setUser(DEMO_USERS['admin@demo.com']);
    } else if (newRole === 'superadmin') {
      setUser(DEMO_USERS['superadmin@demo.com']);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
