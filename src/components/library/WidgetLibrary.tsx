'use client';
import { useState } from 'react';
const WIDGETS = { Content:[{key:'text',label:'Text'},{key:'image',label:'Image'},{key:'hero',label:'Hero'}], Layout:[], Media:[] };
export default function WidgetLibrary({ onAdd }:{ onAdd:(type:string)=>void }){
const [open,setOpen]=useState<{[k:string]:boolean}>({Content:true,Layout:false,Media:false});
const [q,setQ]=useState('');
const filtered=(items:any[])=>items.filter(i=>i.label.toLowerCase().includes(q.toLowerCase())||i.key.includes(q));
return (
<aside className="widgetlib card">
<div className="widgetlib__header"><div style={{fontWeight:700}}>Widgets</div><input className="widgetlib__search" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} /></div>
{Object.entries(WIDGETS).map(([section,items])=> (
<div key={section} className="widgetlib__section">
<div className="widgetlib__sectionhead" onClick={()=>setOpen(o=>({...o,[section]:!o[section]}))}><span>{section}</span><span>{open[section]?'▾':'▸'}</span></div>
{open[section] && <div className="widgetlib__items">{filtered(items).map((it:any)=>(<button key={it.key} className="btn" onClick={()=>onAdd(it.key)}>{it.label}</button>))}</div>}
</div>
))}
</aside>
);
}