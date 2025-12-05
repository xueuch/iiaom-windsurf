import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, View } from 'react-native';

// La forme de nos données utilisateur
type User = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Au lancement de l'app : on vérifie le coffre-fort
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const jsonValue = await SecureStore.getItemAsync('user_session');
      if (jsonValue) {
        setUser(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Erreur lecture session", e);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (userData: User) => {
    try {
      // 1. On met à jour l'état de l'app (immédiat)
      setUser(userData);
      // 2. On sauvegarde dans le coffre-fort (persistant)
      await SecureStore.setItemAsync('user_session', JSON.stringify(userData));
    } catch (e) {
      console.error("Erreur sauvegarde session", e);
    }
  };

  const signOut = async () => {
    try {
      // 1. On vide l'état
      setUser(null);
      // 2. On vide le coffre-fort
      await SecureStore.deleteItemAsync('user_session');
    } catch (e) {
      console.error("Erreur suppression session", e);
    }
  };

  // Pendant qu'on vérifie le coffre-fort, on affiche un rond de chargement
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Un petit raccourci pour utiliser le contexte facilement
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};