'use client';
import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase-browser';


export default function PermissionsAdmin(){
const s = supabaseBrowser();
const [perms,setPerms]=useState<any[]>([]);
const [key,setKey]=useState(''); const [name,setName]=useState(''); const [description,setDescription]=useState('');
const load=async()=>{ const { data } = await s.from('permissions').select('*').order('created_at'); setPerms(data??[]); };
useEffect(()=>{ load(); },[]);
const create=async()=>{ const { error } = await s.from('permissions').insert({ key, name, description }); if(error) return alert(error.message); setKey(''); setName(''); setDescription(''); load(); };
return (
<div className="container" style={{ padding:'24px 0' }}>
<h1>Permissions</h1>
<div className="card" style={{ padding:16, marginBottom:12 }}>
<input placeholder="key (e.g. edit_content)" value={key} onChange={e=>setKey(e.target.value)} />
<input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
<input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
<button className="btn primary" onClick={create}>Create Permission</button>
</div>
<div className="card" style={{ padding:16 }}>
{perms.map(p => (<div key={p.id} className="card" style={{ padding:12, margin:'8px 0' }}>
<div style={{ fontWeight:700 }}>{p.name} <span className="tag">{p.key}</span></div>
<div className="tag">{p.description}</div>
</div>))}
</div>
</div>
);
}