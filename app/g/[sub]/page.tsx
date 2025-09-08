import { supabaseServer } from '@/lib/supabase-server';
import PageRenderer from '@/components/PageRenderer';
import { notFound } from 'next/navigation';


async function GroupThemeVars(groupId: string){
const s = supabaseServer();
const { data: gb } = await s.from('group_branding').select('theme_id, themes:theme_id(tokens)').eq('group_id', groupId).maybeSingle();
const tokens = (gb?.themes?.tokens as Record<string,string>) || {};
if (!Object.keys(tokens).length) return null;
const style = Object.entries(tokens).map(([k,v])=>`${k}:${v}`).join(';');
return <style dangerouslySetInnerHTML={{ __html: `:root{${style}}` }} />;
}


export default async function GroupSubdomainPage({ params }:{ params:{ sub:string } }){
const s = supabaseServer();
const { data: gsub } = await s.from('group_subdomains').select('*, groups!inner(id)').eq('subdomain', params.sub).eq('active', true).maybeSingle();
if (!gsub) notFound();


const { data: page } = await s.from('pages').select('*').eq('group_id', gsub.group_id).eq('slug','home').maybeSingle();
if (!page || !page.live_version_id) notFound();
const { data: version } = await s.from('page_versions').select('*').eq('id', page.live_version_id).single();


return (
<div className="container" style={{ padding:'24px 0' }}>
{/* Tenant theme override */}
{await GroupThemeVars(gsub.group_id)}
<PageRenderer content={version?.content ?? []} />
</div>
);
}