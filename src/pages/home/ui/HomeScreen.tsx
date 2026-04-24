import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { ListaProyectos } from '@features/lista-proyectos/ui/ListaProyectos';
 
export function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.contenedor}>
      <View style={styles.headerContainer}>
        {/* [RETO 6]: Personalización con imagen institucional ESFOT-EPN */}
        <Image source={require('../../../../assets/images/esfot-shield-removebg-preview.png')} style={styles.logo} resizeMode="contain" />
        <View>
          <Text style={styles.headerTitle}>Proyectos de Tesis</Text>
          <Text style={styles.headerSubtitle}>ESFOT - EPN</Text>
        </View>
      </View>
      {/* [RETO 1]: Buscador para filtrar proyectos por título */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar proyectos..."
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ListaProyectos searchQuery={searchQuery} />
    </View>
  );
}
 
const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#F5F7FA' },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 20,
  },
  logo: { width: 200, height: 90, marginBottom: 20 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#0033A0', textAlign: 'center', marginBottom: 5 },
  headerSubtitle: { fontSize: 16, fontWeight: '600', color: '#666666', textAlign: 'center' },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E6EE',
    borderRadius: 8,
    fontSize: 16,
    color: '#1A3A5C',
  },
});