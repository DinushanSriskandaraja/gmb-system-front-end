import { supabase } from '../supabaseClient';
import { Employee } from './types';

export const getEmployees = async () => {
  const { data, error } = await supabase.from('employees').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Employee[];
};

export const getEmployeeById = async (id: string) => {
  const { data, error } = await supabase.from('employees').select('*').eq('id', id).single();
  if (error) throw error;
  return data as Employee;
};

export const createEmployee = async (employee: Omit<Employee, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('employees').insert([employee]).select().single();
  if (error) throw error;
  return data as Employee;
};

export const updateEmployee = async (id: string, updates: Partial<Omit<Employee, 'id' | 'created_at'>>) => {
  const { data, error } = await supabase.from('employees').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data as Employee;
};

export const deleteEmployee = async (id: string) => {
  const { error } = await supabase.from('employees').delete().eq('id', id);
  if (error) throw error;
  return true;
};
