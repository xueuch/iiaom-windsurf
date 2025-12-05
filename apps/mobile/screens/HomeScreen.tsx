import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bonjour,</Text>
        <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.role}>{user?.role?.toUpperCase()}</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#999', marginBottom: 20 }}>Contenu de l'application...</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 },
  header: { marginBottom: 20 },
  welcome: { fontSize: 18, color: '#666' },
  name: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  role: { marginTop: 5, color: '#007AFF', fontWeight: 'bold', backgroundColor: '#e3f2fd', alignSelf: 'flex-start', padding: 5, borderRadius: 5, fontSize: 12 },
  logoutButton: { backgroundColor: '#ffebee', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  logoutText: { color: '#d32f2f', fontWeight: 'bold' }
});