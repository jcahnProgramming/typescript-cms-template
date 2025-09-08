import { supabaseServer } from './supabase-server';
export async function getPageBySlug(slug: string) {
const s = supabaseServer();
const { data: page } = await s.from('pages').select('*').eq('slug', slug).single();
if (!page) return null;
const { data: version } = await s.from('page_versions').select('*').eq('id', page.live_version_id).single();
return { page, version };
}
export async function getTestPageBySlug(slug: string) {
const s = supabaseServer();
const { data: page } = await s.from('pages').select('*').eq('slug', slug).single();
if (!page) return null;
const { data: version } = await s.from('page_versions').select('*').eq('id', page.test_version_id).single();
return { page, version };
}