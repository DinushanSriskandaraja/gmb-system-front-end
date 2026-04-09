import { supabase } from '../supabaseClient';
import { Customer } from './types';

export const getCustomers = async () => {
  const { data, error } = await supabase.from('customers').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Customer[];
};

export const getCustomerById = async (id: string) => {
  const { data, error } = await supabase.from('customers').select('*').eq('customer_id', id).single();
  if (error) throw error;
  return data as Customer;
};

export const createCustomer = async (customer: Omit<Customer, 'customer_id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase.from('customers').insert([customer]).select().single();
  if (error) throw error;
  return data as Customer;
};

export const updateCustomer = async (id: string, updates: Partial<Omit<Customer, 'customer_id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase.from('customers').update(updates).eq('customer_id', id).select().single();
  if (error) throw error;
  return data as Customer;
};

export const deleteCustomer = async (id: string) => {
  const { error } = await supabase.from('customers').delete().eq('customer_id', id);
  if (error) throw error;
  return true;
};
