import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';

// ⚠️ Vérifiez votre lien ngrok
const API_URL = 'https://vaguest-pamella-disconsolate.ngrok-free.dev/api';

export default function RegisterScreen({ navigation }: any) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    setLoading(true);
    try {
      // 1. On appelle l'API d'inscription
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' 
        },
        body: JSON.stringify({ 
          email, 
          password,
          firstName,
          lastName
        }),
      });

      const text = await response.text();
      const json = JSON.parse(text);

      if (response.ok) {
        // 2. Si ça marche, on connecte directement l'utilisateur
        Alert.alert("Succès", "Compte créé avec succès !");
        await signIn({
          ...json.user,
          token: json.accessToken
        });
        // Pas besoin de naviguer, le AuthContext va afficher Home tout seul !
      } else {
        Alert.alert("Erreur", json.message || "Impossible de créer le compte");
      }
    } catch (error) {
      Alert.alert("Erreur Réseau", "Vérifiez votre connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>🚀 Rejoindre</Text>
          <Text style={styles.subtitle}>Créez votre compte IIAOM</Text>
          
          <View style={styles.row}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Prénom" value={firstName} onChangeText={setFirstName} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Nom" value={lastName} onChangeText={setLastName} />
          </View>

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
            placeholder="Mot de passe (8 car. min)" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>S'inscrire</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>Déjà un compte ? Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', padding: 30, borderRadius: 20, elevation: 5 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#1a1a1a', marginBottom: 5 },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 30 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  input: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  linkButton: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#007AFF', fontWeight: '600' }
});