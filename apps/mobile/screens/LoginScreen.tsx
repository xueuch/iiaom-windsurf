import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

// ⚠️ Vérifiez que c'est toujours votre bon lien ngrok
const API_URL = 'https://vaguest-pamella-disconsolate.ngrok-free.dev/api';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('admin@test.com'); 
  const [password, setPassword] = useState('monSuperMotDePasse123');
  const [loading, setLoading] = useState(false);

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
          navigation.replace('Home', { user: json.user });
        } else {
          Alert.alert("Erreur", json.message || "Échec connexion");
        }
      } catch (e) {
        console.error("Erreur parsing:", text);
        Alert.alert("Erreur", "Réponse serveur invalide");
      }
    } catch (error) {
      Alert.alert("Erreur Réseau", "Vérifiez Ngrok et Docker");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>🎓 IIAOM</Text>
        <Text style={styles.subtitle}>Espace Numérique</Text>
        
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

        {/* Bouton de Connexion */}
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Se connecter</Text>}
        </TouchableOpacity>

        {/* NOUVEAU : Bouton pour aller vers l'inscription */}
        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.linkText}>
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
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  // Styles pour le nouveau bouton
  linkButton: { marginTop: 20, alignItems: 'center', padding: 10 },
  linkText: { color: '#007AFF', fontWeight: '600' }
});