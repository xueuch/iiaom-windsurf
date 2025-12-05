import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen'; // On n'oublie pas d'importer le nouvel écran
import { AuthProvider, useAuth } from './context/AuthContext';

const Stack = createNativeStackNavigator();

// Ce composant gère la logique de navigation (Cerveau de la navigation)
function RootNavigator() {
  const { user } = useAuth(); // On demande au contexte : "Est-ce qu'on est connecté ?"

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // SCÉNARIO 1 : L'utilisateur EST connecté
        // On ne lui montre QUE l'accueil (il ne peut pas revenir au login)
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        // SCÉNARIO 2 : L'utilisateur N'EST PAS connecté
        // On lui montre le Login et l'Inscription
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

// Le composant principal qui assemble tout
export default function App() {
  return (
    // 1. On active le système de mémoire (Auth)
    <AuthProvider>
      {/* 2. On active le système de navigation */}
      <NavigationContainer>
        {/* 3. On affiche nos écrans */}
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}