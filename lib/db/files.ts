import { supabase } from '../supabaseClient';
import { FileRecord } from './types';

export const getFiles = async (customerId?: string, jobId?: string) => {
  let query = supabase.from('files').select('*').order('created_at', { ascending: false });
  if (customerId) query = query.eq('customer_id', customerId);
  if (jobId) query = query.eq('job_id', jobId);
  
  const { data, error } = await query;
  if (error) throw error;
  return data as FileRecord[];
};

export const getFileById = async (id: string) => {
  const { data, error } = await supabase.from('files').select('*').eq('id', id).single();
  if (error) throw error;
  return data as FileRecord;
};

export const createFile = async (file: Omit<FileRecord, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('files').insert([file]).select().single();
  if (error) throw error;
  return data as FileRecord;
};

export const deleteFile = async (id: string) => {
  const { error } = await supabase.from('files').delete().eq('id', id);
  if (error) throw error;
  return true;
};
