import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const langs = [
  { key: 'python', name: 'Python', icon: '🐍', color: '#3776ab', desc: 'Easy to learn, powerful scripting' },
  { key: 'javascript', name: 'JavaScript', icon: '⚡', color: '#f7df1e', desc: 'Web development essential' },
  { key: 'java', name: 'Java', icon: '☕', color: '#007396', desc: 'Enterprise and Android apps' },
  { key: 'cpp', name: 'C++', icon: '⚙️', color: '#00599c', desc: 'High-performance systems' },
];

export default function Courses() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Course</Text>
      <Text style={styles.subtitle}>Pick a language to start learning</Text>
      <View style={styles.grid}>
        {langs.map((l) => (
          <Link key={l.key} href={`/courses/${l.key}`} asChild>
            <TouchableOpacity style={[styles.card, { borderLeftColor: l.color }]}>
              <Text style={styles.icon}>{l.icon}</Text>
              <Text style={styles.langName}>{l.name}</Text>
              <Text style={styles.desc}>{l.desc}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f9fafb' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 6, color: '#1f2937' },
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 24 },
  grid: { gap: 16 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, borderLeftWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 },
  icon: { fontSize: 36, marginBottom: 8 },
  langName: { fontSize: 22, fontWeight: '700', color: '#1f2937', marginBottom: 4 },
  desc: { fontSize: 14, color: '#6b7280' },
});
