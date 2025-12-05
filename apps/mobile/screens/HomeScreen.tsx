import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user } = useAuth();

  const ActionButton = ({ icon, label, color }: any) => (
    <TouchableOpacity style={styles.actionBtn}>
      <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Bonjour,</Text>
          <Text style={styles.name}>{user?.firstName}</Text>
        </View>
        <TouchableOpacity style={styles.notifButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#e3f2fd' }]}>
          <Text style={[styles.statNumber, { color: '#1976d2' }]}>0</Text>
          <Text style={[styles.statLabel, { color: '#1976d2' }]}>Absences</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#fff3e0' }]}>
          <Text style={[styles.statNumber, { color: '#f57c00' }]}>0</Text>
          <Text style={[styles.statLabel, { color: '#f57c00' }]}>Retards</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Accès Rapide</Text>
      <View style={styles.actionsGrid}>
        <ActionButton icon="calendar" label="Emploi du temps" color="#007AFF" />
        <ActionButton icon="school" label="Mes Notes" color="#FF9500" />
        <ActionButton icon="library" label="Devoirs" color="#34C759" />
        <ActionButton icon="chatbubbles" label="Messages" color="#5856D6" />
      </View>

      <View style={styles.newsCard}>
        <Text style={styles.newsTitle}>📢 Information École</Text>
        <Text style={styles.newsText}>
          Bienvenue sur la nouvelle application IIAOM ! Retrouvez toutes vos informations scolaires ici.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60 },
  welcome: { fontSize: 16, color: '#666' },
  name: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  notifButton: { padding: 10, backgroundColor: '#f5f5f5', borderRadius: 50 },
  badge: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: 'red' },
  statsContainer: { flexDirection: 'row', padding: 20, justifyContent: 'space-between' },
  statCard: { width: '48%', padding: 20, borderRadius: 20, alignItems: 'center' },
  statNumber: { fontSize: 32, fontWeight: 'bold' },
  statLabel: { fontSize: 14, fontWeight: '600', marginTop: 5 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginBottom: 15, color: '#333' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  actionBtn: { width: '50%', alignItems: 'center', marginBottom: 20 },
  iconBox: { width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionLabel: { fontWeight: '600', color: '#444' },
  newsCard: { margin: 20, padding: 20, backgroundColor: '#333', borderRadius: 20 },
  newsTitle: { color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  newsText: { color: '#ddd', lineHeight: 22 }
});