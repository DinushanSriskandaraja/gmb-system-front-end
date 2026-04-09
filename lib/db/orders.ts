import { supabase } from '../supabaseClient';
import { Order } from './types';

export const getOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Order[];
};

export const getOrderById = async (id: string) => {
  const { data, error } = await supabase.from('orders').select('*').eq('order_id', id).single();
  if (error) throw error;
  return data as Order;
};

export const createOrder = async (order: Omit<Order, 'order_id' | 'order_date' | 'created_at'>) => {
  const { data, error } = await supabase.from('orders').insert([order]).select().single();
  if (error) throw error;
  return data as Order;
};

export const updateOrder = async (id: string, updates: Partial<Omit<Order, 'order_id' | 'order_date' | 'created_at'>>) => {
  const { data, error } = await supabase.from('orders').update(updates).eq('order_id', id).select().single();
  if (error) throw error;
  return data as Order;
};

export const deleteOrder = async (id: string) => {
  const { error } = await supabase.from('orders').delete().eq('order_id', id);
  if (error) throw error;
  return true;
};
