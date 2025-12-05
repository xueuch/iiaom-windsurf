import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';

// ⚠️ Vérifiez toujours votre lien ngrok ici !
const API_URL = 'https://vaguest-pamella-disconsolate.ngrok-free.dev/api';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('admin@test.com'); 
  const [password, setPassword] = useState('monSuperMotDePasse123');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' 
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      try {
        const json = JSON.parse(text);
        if (response.ok) {
          // ✅ CORRECTION : On ne navigue plus manuellement.
          // On met à jour le contexte, et l'App va basculer toute seule sur l'Accueil.
          await signIn({
            ...json.user,
            token: json.accessToken
          });
        } else {
          Alert.alert("Erreur", json.message || "Échec connexion");
        }
      } catch (e) {
        console.error("Erreur:", text);
        Alert.alert("Erreur", "Réponse serveur invalide");
      }
    } catch (error) {
      Alert.alert("Erreur Réseau", "Vérifiez Ngrok");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>🎓 IIAOM</Text>
        <Text style={styles.subtitle}>Connexion</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none" 
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Mot de passe" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Se connecter</Text>}
        </TouchableOpacity>

        <TouchableOpacity 
          style={{ marginTop: 20, alignItems: 'center' }} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{ color: '#007AFF', fontWeight: '600' }}>
            Pas de compte ? Créer un compte
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f2f5' },
  card: { backgroundColor: 'white', padding: 30, borderRadius: 20, elevation: 5 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#1a1a1a', marginBottom: 5 },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 30 },
  input: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});