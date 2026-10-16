import { supabase } from '../supabaseClient';

export const getMeasurements = async () => {
  const { data, error } = await supabase.from('measurements').select('*, customer:customers(*)').order('created_at', { ascending: false });
  if (error) throw error;
  return data as any[];
};

export const getMeasurementById = async (id: string) => {
  const { data, error } = await supabase.from('measurements').select('*, customer:customers(*)').eq('id', id).single();
  if (error) throw error;
  return data as any;
};

export const getMeasurementsByCustomerId = async (customerId: string) => {
  const { data, error } = await supabase.from('measurements').select('*').eq('customer_id', customerId).order('created_at', { ascending: false });
  if (error) throw error;
  return data as any[];
};

export const createMeasurement = async (measurement: any) => {
  const { data, error } = await supabase.from('measurements').insert([measurement]).select().single();
  if (error) throw error;
  return data as any;
};

export const updateMeasurement = async (id: string, updates: any) => {
  const { data, error } = await supabase.from('measurements').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) throw error;
  return data as any;
};

export const deleteMeasurement = async (id: string) => {
  const { error } = await supabase.from('measurements').delete().eq('id', id);
  if (error) throw error;
  return true;
};
