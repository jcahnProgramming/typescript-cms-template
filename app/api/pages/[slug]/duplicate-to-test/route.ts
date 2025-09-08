import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
export async function POST(_:Request,{ params }:{ params:{ slug:string } }){
const s=supabaseServer();
const { data:page, error:e1 } = await s.from('pages').select('*').eq('slug',params.slug).single();
if(e1||!page) return NextResponse.json({ error:e1?.message||'Not found' }, { status:404 });
if(!page.live_version_id) return NextResponse.json({ error:'No live version to duplicate' }, { status:400 });
const { data:live } = await s.from('page_versions').select('*').eq('id',page.live_version_id).single();
const { data:test, error:e2 } = await s.from('page_versions').insert({ page_id:page.id, group_id: page.group_id ?? null, name:`${live?.name||'Live'} (Test)`, status:'test', content:live?.content??[], design_width: live?.design_width ?? 1440, design_height: live?.design_height ?? 900 }).select('*').single();
if(e2) return NextResponse.json({ error:e2.message }, { status:400 });
await s.from('pages').update({ test_version_id:test.id }).eq('id',page.id);
return NextResponse.json({ ok:true, testVersionId:test.id });
}