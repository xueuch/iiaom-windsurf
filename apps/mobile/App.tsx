import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

// Votre lien ngrok (Vérifiez qu'il correspond bien à celui de votre terminal noir)
const API_URL = 'https://vaguest-pamella-disconsolate.ngrok-free.dev/api'; 

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log(`Tentative de connexion à ${API_URL}...`);
      
      // --- MODIFICATION CRUCIALE ICI ---
      // On ajoute un 'header' pour dire à ngrok de ne pas afficher la page d'alerte
      const response = await fetch(API_URL, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });

      const text = await response.text(); // On lit la réponse en texte d'abord
      
      try {
        const json = JSON.parse(text); // On essaie de transformer le texte en JSON
        console.log('Réponse reçue:', json);
        setData(json);
        setError(null);
      } catch (e) {
        console.error('Ce n\'est pas du JSON:', text.substring(0, 100));
        throw new Error("Le serveur a renvoyé une page web au lieu de données.");
      }

    } catch (err: any) {
      console.error('Erreur de connexion:', err);
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 IIAOM Mobile</Text>
      
      <View style={styles.card}>
        <Text style={styles.subtitle}>État du Serveur :</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <View>
            <Text style={styles.error}>❌ {error}</Text>
            <Text style={styles.ip}>Cible : {API_URL}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.success}>✅ Connecté !</Text>
            <Text style={styles.data}>Version API : {data?.version}</Text>
            <Text style={styles.data}>Status : {data?.status}</Text>
            <Text style={styles.timestamp}>{data?.timestamp}</Text>
          </View>
        )}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '600',
  },
  success: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  ip: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  data: {
    fontSize: 16,
    marginVertical: 2,
    color: '#444',
  },
  timestamp: {
    marginTop: 10,
    fontSize: 12,
    color: '#999',
  }
});