'use client';
import { useState } from 'react';
import DesignCanvas from '@/components/canvas/DesignCanvas';
import WidgetLibrary from '@/components/library/WidgetLibrary';
import InspectorPanel from '@/components/inspector/InspectorPanel';
import SaveOverlay from '@/components/SaveOverlay';
import { supabaseBrowser } from '@/lib/supabase-browser';
import type { Block, PageVersionContent } from '@/types/Page';


export default function PlaygroundPage(){
const [blocks,setBlocksState]=useState<PageVersionContent>([]);
const [dirty,setDirty]=useState(false);
const [selectedId,setSelectedId]=useState<string|null>(null);
const selected=blocks.find(b=>b.id===selectedId) ?? null;
const onDirty=()=>setDirty(true);
const setBlocks=(fn:(b:PageVersionContent)=>PageVersionContent)=>setBlocksState(fn(blocks));


const addAtCenter=(type:string)=>{ const id=crypto.randomUUID(); const base:any={ id, type, layout:{x:0,y:0,w:400,h:200,z:1}, props:{} }; if(type==='text') base.props={ html:'<p>New text</p>', variant:'p' }; if(type==='hero') base.props={ headline:'Headline', subhead:'Subhead', ctaText:'Learn more', ctaHref:'#' }; setBlocks(prev=>[...prev,base]); setSelectedId(id); onDirty(); };
const updateBlock=(next:Block)=>{ setBlocks(prev=>prev.map(b=>b.id===next.id?next:b)); onDirty(); };


async function saveVersion(name:string, folderId?:string){ const s=supabaseBrowser(); let {data:page}=await s.from('pages').select('*').eq('slug','home').single(); if(!page) page=(await s.from('pages').insert({ slug:'home', title:'Home', folder_id: folderId ?? null }).select('*').single()).data!; const { error }=await s.from('page_versions').insert({ page_id:page.id, name, content:blocks, is_playground:true, design_width:1440, design_height:900 }); if(error) alert(error.message); else setDirty(false); }


return (
<div className="playground">
<WidgetLibrary onAdd={addAtCenter} />
<div className="playground__center">
<DesignCanvas blocks={blocks} setBlocks={setBlocks} onDirty={onDirty} onSelect={id=>setSelectedId(id)} selectedId={selectedId} />
<SaveOverlay dirty={dirty} onSave={saveVersion} withFolderSelect />
</div>
<InspectorPanel block={selected ?? null} onChange={updateBlock} />
</div>
);
}