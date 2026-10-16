import { supabase } from '../supabaseClient';

export function createDbHelper<T extends { [key: string]: any }>(tableName: string, idField: string) {
  return {
    async getAll(options?: { orderBy?: string; ascending?: boolean }) {
      let query = supabase.from(tableName).select('*');
      if (options?.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending ?? true });
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as T[];
    },

    async getById(id: string | number) {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(idField, id)
        .single();
      if (error) throw error;
      return data as T;
    },

    async create(item: Omit<T, any>) {
      const { data, error } = await supabase
        .from(tableName)
        .insert(item as any)
        .select()
        .single();
      if (error) throw error;
      return data as T;
    },

    async update(id: string | number, updates: Partial<T>) {
      const { data, error } = await supabase
        .from(tableName)
        .update(updates as any)
        .eq(idField, id)
        .select()
        .single();
      if (error) throw error;
      return data as T;
    },

    async delete(id: string | number) {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq(idField, id);
      if (error) throw error;
      return true;
    },

    query() {
      return supabase.from(tableName).select('*');
    }
  };
}
