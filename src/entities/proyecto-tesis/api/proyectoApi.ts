// Todas las caracteristicas o funcionalidades se ven aqui. Nunca directamente al cliente de supabase
import { supabase } from "@shared/api/supabase";
import type { CreateProyectoDto, ProyectoTesis, UpdateProyectoDto } from "../model/types";

const TABLE = "proyectos_tesis";

export const proyectoApi = {
  /** Obtiene todos los proyectos ordenados por fecha de creación */
  async getAll(): Promise<ProyectoTesis[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[proyectoApi.getAll]", error.message);
      throw new Error(error.message);
    }
    return data ?? [];
  },

  /** Obtiene un proyecto por su ID */
  async getById(id: string): Promise<ProyectoTesis> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /** Crea un nuevo proyecto de tesis */
  async create(dto: CreateProyectoDto): Promise<ProyectoTesis> {
    const payload: CreateProyectoDto = { ...dto };

    // Evita enviar strings vacios a columnas opcionales (ej. fecha/date).
    if (!payload.fecha_fin?.trim()) delete payload.fecha_fin;
    if (!payload.repositorio_github?.trim()) delete payload.repositorio_github;

    const { data, error } = await supabase
      .from(TABLE)
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("[proyectoApi.create]", error.message);
      throw new Error(error.message);
    }
    return data;
  },

  /** Busca proyectos por título o autor */
  async search(query: string): Promise<ProyectoTesis[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .or(`titulo.ilike.%${query}%,autores.ilike.%${query}%`)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
  },

  // [RETO 3]: Implementación de actualización en base de datos.
  /** Actualiza un proyecto existente */
  async update(id: string, dto: Partial<ProyectoTesis>): Promise<ProyectoTesis> {
    console.log('[proyectoApi.update] Intentando actualizar ID:', id);

    const payload: any = { ...dto };
    delete payload.id;
    delete payload.created_at;

    if (payload.fecha_fin !== undefined && !payload.fecha_fin?.trim()) delete payload.fecha_fin;
    if (payload.repositorio_github !== undefined && !payload.repositorio_github?.trim()) delete payload.repositorio_github;

    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq('id', id)
      .select();

    if (error) {
      console.error('[proyectoApi.update] Error BD:', error.message);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      const msg = '0 filas actualizadas. Revisa que el ID sea correcto y que las políticas RLS en Supabase permitan UPDATE.';
      console.error('[proyectoApi.update]', msg);
      throw new Error(msg);
    }

    return data[0];
  },

  // [RETO 4]: Implementación de eliminación en base de datos.
  /** Elimina un proyecto por su ID */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[proyectoApi.delete]', error.message);
      throw new Error(error.message);
    }
  },
};