import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { proyectoApi } from '@entities/proyecto-tesis/api/proyectoApi';
import type { ProyectoTesis } from '@entities/proyecto-tesis/model/types';

export function ProyectoDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
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

  return (
    <ScrollView style={styles.contenedor}>
      <View style={styles.seccion}>
        <Text style={styles.titulo}>{proyecto.titulo}</Text>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.etiqueta}>Autores</Text>
        <Text style={styles.valor}>{proyecto.autores}</Text>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.etiqueta}>Tutor Docente</Text>
        <Text style={styles.valor}>{proyecto.tutor_docente}</Text>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.etiqueta}>Descripción</Text>
        <Text style={styles.resumen}>{proyecto.descripcion}</Text>
      </View>

      <View style={styles.fila}>
        <View style={styles.columna}>
          <Text style={styles.etiqueta}>Fecha de Inicio</Text>
          <Text style={styles.valor}>{proyecto.fecha_inicio}</Text>
        </View>

        {proyecto.fecha_fin && (
          <View style={styles.columna}>
            <Text style={styles.etiqueta}>Fecha de Fin</Text>
            <Text style={styles.valor}>{proyecto.fecha_fin}</Text>
          </View>
        )}
      </View>

      <View style={styles.seccion}>
        <Text style={styles.etiqueta}>Estado</Text>
        <Text style={styles.valor}>{proyecto.estado}</Text>
      </View>

      {proyecto.repositorio_github && (
        <View style={styles.seccion}>
          <Text style={styles.etiqueta}>Repositorio GitHub</Text>
          <Text style={styles.link}>{proyecto.repositorio_github}</Text>
        </View>
      )}

      <View style={styles.seccion}>
        <Text style={styles.etiqueta}>Tecnologías</Text>
        <Text style={styles.valor}>{proyecto.tecnologias_utilizadas}</Text>
      </View>

      <TouchableOpacity
        style={styles.botonEditar}
        onPress={() => router.push(`/proyecto/editar/${proyecto.id}`)}
      >
        <Text style={styles.botonEditarTexto}>Editar Proyecto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
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
  seccion: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A3A5C',
  },
  etiqueta: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  valor: {
    fontSize: 16,
    color: '#333',
  },
  resumen: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  fila: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  columna: {
    flex: 1,
  },
  link: {
    fontSize: 14,
    color: '#2E6DA4',
    textDecorationLine: 'underline',
  },
  botonEditar: {
    backgroundColor: '#1A3A5C',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  botonEditarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});