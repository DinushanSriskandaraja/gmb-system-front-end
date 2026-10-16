import { supabase } from '../supabaseClient';
import { Employee } from './types';

export const getEmployees = async () => {
  const { data, error } = await supabase.from('employees').select('*');
  if (error) throw error;
  return data as any[];
};
export const getEmployeeById = async (id: string) => {
  const { data, error } = await supabase.from('employees').select('*').eq('id', id).single();
  if (error) throw error;
  return data as any;
};
export const createEmployee = async (employee: any) => {
  const { data, error } = await supabase.from('employees').insert([employee]).select().single();
  if (error) throw error;
  return data as any;
};
export const updateEmployee = async (id: string, updates: any) => {
  const { data, error } = await supabase.from('employees').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data as any;
};
export const deleteEmployee = async (id: string) => {
  const { error } = await supabase.from('employees').delete().eq('id', id);
  if (error) throw error;
  return true;
};
