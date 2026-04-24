import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { proyectoApi } from '@entities/proyecto-tesis/api/proyectoApi';
import type { ProyectoTesis } from '@entities/proyecto-tesis/model/types';
import { EditarProyectoForm } from '@features/editar-proyecto/ui/EditarProyectoForm';

export function ProyectoEditarScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [proyecto, setProyecto] = useState<ProyectoTesis | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      if (!id) {
        setError('ID de proyecto no proporcionado');
        setCargando(false);
        return;
      }

      setCargando(true);
      setError(null);

      try {
        const data = await proyectoApi.getById(id);
        setProyecto(data);
      } catch (e) {
        const mensaje = e instanceof Error ? e.message : 'Error desconocido';
        setError(mensaje);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [id]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1A3A5C" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  if (!proyecto) {
    return <Text style={styles.error}>Proyecto no encontrado</Text>;
  }

  return <EditarProyectoForm proyectoInicial={proyecto} />;
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#E74C3C',
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
});