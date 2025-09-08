'use client';
import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase-browser';
export default function SaveOverlay({ dirty, onSave, withFolderSelect=false }:{ dirty:boolean; onSave:(name:string, folderId?:string)=>Promise<void>; withFolderSelect?:boolean; }){
const [open,setOpen]=useState(false); const [name,setName]=useState('');
const [folders,setFolders]=useState<any[]>([]); const [folderId,setFolderId]=useState('');
useEffect(()=>{ if(!withFolderSelect) return; (async()=>{ const s=supabaseBrowser(); const {data}=await s.from('folders').select('*').order('created_at'); setFolders(data??[]); })(); },[withFolderSelect]);
return (
<div className="save-overlay">
<button className={`btn ${dirty?'dirty':'clean'}`} onClick={()=>dirty&&setOpen(true)}>{dirty?'Save':'Saved'}</button>
{open && (
<div className="card" style={{ position:'fixed', right:20, bottom:70, padding:16, width:360 }}>
<div style={{ fontWeight:700, marginBottom:8 }}>Save Version</div>
<input value={name} onChange={e=>setName(e.target.value)} placeholder="Version name" style={{ width:'100%', padding:8, borderRadius:8, marginBottom:8 }} />
{withFolderSelect && (
<div style={{ display:'grid', gap:8 }}>
<label>Folder</label>
<select value={folderId} onChange={e=>setFolderId(e.target.value)}>
<option value="">(none)</option>
{folders.map(f=> <option key={f.id} value={f.id}>{f.name}</option>)}
</select>
</div>
)}
<div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:12 }}>
<button className="btn" onClick={()=>setOpen(false)}>Cancel</button>
<button className="btn primary" onClick={async()=>{ await onSave(name||'Untitled', folderId||undefined); setOpen(false); }}>Save</button>
</div>
</div>
)}
</div>
);
}