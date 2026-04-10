import { supabase } from '../supabaseClient';
import { CustomerActivity } from './types';

export const getActivities = async (customerId?: string) => {
  let query = supabase.from('customer_activities').select('*').order('created_at', { ascending: false });
  if (customerId) {
    query = query.eq('customer_id', customerId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data as CustomerActivity[];
};

export const createActivity = async (activity: Omit<CustomerActivity, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('customer_activities').insert([activity]).select().single();
  if (error) throw error;
  return data as CustomerActivity;
};

export const deleteActivity = async (id: string) => {
  const { error } = await supabase.from('customer_activities').delete().eq('id', id);
  if (error) throw error;
  return true;
};
