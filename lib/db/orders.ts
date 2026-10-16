import { supabase } from '../supabaseClient';
import { Order } from './types';

export const getOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*, supplier:suppliers(*)');
  if (error) throw error;
  return data as any[];
};
export const getOrderById = async (id: string) => {
  const { data, error } = await supabase.from('orders').select('*, supplier:suppliers(*)').eq('order_id', id).single();
  if (error) throw error;
  return data as any;
};
export const createOrder = async (order: any) => {
  const { data, error } = await supabase.from('orders').insert([order]).select().single();
  if (error) throw error;
  return data as any;
};
export const updateOrder = async (id: string, updates: any) => {
  const { data, error } = await supabase.from('orders').update(updates).eq('order_id', id).select().single();
  if (error) throw error;
  return data as any;
};
export const deleteOrder = async (id: string) => {
  const { error } = await supabase.from('orders').delete().eq('order_id', id);
  if (error) throw error;
  return true;
};
