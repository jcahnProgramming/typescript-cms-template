'use client';
import { supabaseBrowser } from '@/lib/supabase-browser';

export async function uploadImage(file: File, folder = 'uploads') {
  const s = supabaseBrowser();
  const ext = file.name.split('.').pop() || 'bin';
  const key = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await s.storage.from('assets').upload(key, file, { upsert: false });
  if (error) throw error;
  const { data } = s.storage.from('assets').getPublicUrl(key);
  return { key, publicUrl: data.publicUrl };
}
