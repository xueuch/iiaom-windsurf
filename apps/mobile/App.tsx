import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// Votre lien ngrok actuel (Vérifiez qu'il est toujours bon !)
const API_URL = 'https://vaguest-pamella-disconsolate.ngrok-free.dev/api';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    try {
      console.log('Envoi des données...');
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password: password,
        }),
      });

      const text = await response.text();
      
      try {
        const json = JSON.parse(text);
        
        if (response.ok) {
          console.log('Succès !', json);
          setUser(json.user); // On sauvegarde l'utilisateur connecté
          Alert.alert("Succès", `Bienvenue ${json.user.firstName} !`);
        } else {
          // Erreur venant de l'API (ex: mauvais mot de passe)
          Alert.alert("Erreur", json.message || "Connexion échouée");
        }
      } catch (e) {
        console.error("Erreur réponse:", text);
        Alert.alert("Erreur Technique", "Le serveur a renvoyé une réponse invalide.");
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Erreur Réseau", "Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
  };

  // Si l'utilisateur est connecté, on affiche son profil
  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>👤 Profil</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Nom :</Text>
          <Text style={styles.value}>{user.firstName} {user.lastName}</Text>
          
          <Text style={styles.label}>Email :</Text>
          <Text style={styles.value}>{user.email}</Text>
          
          <Text style={styles.label}>Rôle :</Text>
          <Text style={styles.roleBadge}>{user.role}</Text>
        </View>
        
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Sinon, on affiche le formulaire de connexion
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>👋 Bienvenue</Text>
        <Text style={styles.subtitle}>Connectez-vous à IIAOM</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="exemple@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Se connecter</Text>
          )}
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  input: {
    backgroundColor: '#f0f2f5',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#99c9ff',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    marginTop: 30,
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '100%',
  },
  roleBadge: {
    backgroundColor: '#e3f2fd',
    color: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
  },
});