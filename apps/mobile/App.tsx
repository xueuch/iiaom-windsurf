import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import de tous nos écrans
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen'; // <--- Le nouveau !

import { AuthProvider, useAuth } from './context/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- 1. La barre d'onglets (Une fois connecté) ---
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,             // Pas de titre en haut (on a le nôtre)
        tabBarActiveTintColor: '#007AFF', // Couleur quand c'est sélectionné (Bleu)
        tabBarInactiveTintColor: 'gray',  // Couleur quand c'est pas sélectionné (Gris)
        // Logique pour choisir la bonne icône
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home'; // Par défaut

          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Onglet 1 : L'accueil avec les stats */}
      <Tab.Screen name="Accueil" component={HomeScreen} />
      
      {/* Onglet 2 : Le vrai profil avec la déconnexion */}
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// --- 2. Le navigateur principal (Sécurité) ---
function RootNavigator() {
  const { user } = useAuth(); // On vérifie si on est connecté

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // CAS 1 : Connecté -> On affiche les Onglets (Main)
        <Stack.Screen name="Main" component={AppTabs} />
      ) : (
        // CAS 2 : Pas connecté -> On affiche Login ou Inscription
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

// --- 3. L'application (Point d'entrée) ---
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}