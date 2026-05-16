'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (firebaseUser) => {
          setUser(firebaseUser);
          setLoading(false);
          clearTimeout(timeoutId);
        },
        (error) => {
          console.error("Firebase auth error:", error);
          setLoading(false);
          clearTimeout(timeoutId);
        }
      );

      // Fallback timeout in case Firebase is blocked or unresponsive
      timeoutId = setTimeout(() => {
        console.warn("Firebase auth timed out");
        setLoading(false);
      }, 3000);

      return () => {
        unsubscribe();
        clearTimeout(timeoutId);
      };
    } catch (e) {
      console.error("Failed to initialize auth:", e);
      setLoading(false);
    }
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
