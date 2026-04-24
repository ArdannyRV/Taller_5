import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import type { ProyectoTesis } from '@entities/proyecto-tesis/model/types';
import { proyectoApi } from '@entities/proyecto-tesis/api/proyectoApi';
 
const BADGE_COLOR: Record<string, string> = {
  'En Progreso': '#3498DB',
  'Completado':  '#27AE60',
  'Suspendido':  '#E74C3C',
};
 
interface Props {
  proyecto: ProyectoTesis;
  onDeleteSuccess?: () => void;
}

export function ProyectoCard({ proyecto, onDeleteSuccess }: Props) {
  const router = useRouter();

  const abrirRepo = () => {
    if (proyecto.repositorio_github)
      Linking.openURL(proyecto.repositorio_github);
  };

  const handleDelete = async () => {
    Alert.alert(
      'Eliminar Proyecto',
      '¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await proyectoApi.delete(proyecto.id);
              onDeleteSuccess?.();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el proyecto.');
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.tarjeta}
      onPress={() => router.push(`/proyecto/${proyecto.id}`)}
      activeOpacity={0.7}
    >
      {/* [RETO 2]: Navegación al detalle del proyecto */}
      {/* Encabezado: título + badge de estado */}
      <View style={styles.encabezado}>
        <Text style={styles.titulo} numberOfLines={2}>{proyecto.titulo}</Text>
        <View style={[styles.badge, { backgroundColor: BADGE_COLOR[proyecto.estado] }]}>
          <Text style={styles.badgeTexto}>{proyecto.estado}</Text>
        </View>
      </View>
 
      {/* Autores */}
      <Text style={styles.etiqueta}>Autores</Text>
      <Text style={styles.valor}>{proyecto.autores}</Text>
 
      {/* Tutor */}
      <Text style={styles.etiqueta}>Tutor Docente</Text>
      <Text style={styles.valor}>{proyecto.tutor_docente}</Text>
 
      {/* Tecnologías */}
      <Text style={styles.etiqueta}>Tecnologías</Text>
      <Text style={styles.valor}>{proyecto.tecnologias_utilizadas}</Text>
 
      {/* Fechas */}
      <View style={styles.filaFechas}>
        <View style={styles.fecha}>
          <Text style={styles.etiqueta}>Inicio</Text>
          <Text style={styles.valor}>{proyecto.fecha_inicio}</Text>
        </View>
        {proyecto.fecha_fin && (
          <View style={styles.fecha}>
            <Text style={styles.etiqueta}>Fin</Text>
            <Text style={styles.valor}>{proyecto.fecha_fin}</Text>
          </View>
        )}
      </View>
 
{/* Link a GitHub */}
      {proyecto.repositorio_github && (
        <TouchableOpacity style={styles.repoBoton} onPress={abrirRepo}>
          <Text style={styles.repoTexto}>Ver en GitHub →</Text>
        </TouchableOpacity>
      )}

      {/* [RETO 4]: Eliminación de proyecto con diálogo de confirmación */}
      <TouchableOpacity style={styles.eliminarBoton} onPress={handleDelete}>
        <Text style={styles.eliminarTexto}>Eliminar Proyecto</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  encabezado: { flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 12 },
  titulo: { fontSize: 16, fontWeight: '700', color: '#1A3A5C', flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeTexto: { color: '#fff', fontSize: 11, fontWeight: '700' },
  etiqueta: { fontSize: 11, color: '#888', fontWeight: '600', marginTop: 8 },
  valor: { fontSize: 14, color: '#333', marginTop: 2 },
  filaFechas: { flexDirection: 'row', gap: 24 },
  fecha: { flex: 1 },
  repoBoton: { marginTop: 12, paddingVertical: 8, paddingHorizontal: 12,
    backgroundColor: '#EBF5FB', borderRadius: 8, alignSelf: 'flex-start' },
  repoTexto: { color: '#2E6DA4', fontSize: 13, fontWeight: '600' },
  eliminarBoton: { marginTop: 16, paddingVertical: 10, paddingHorizontal: 12,
    backgroundColor: '#FDEEEE', borderRadius: 8, alignSelf: 'flex-start' },
  eliminarTexto: { color: '#E74C3C', fontSize: 13, fontWeight: '600' },
});