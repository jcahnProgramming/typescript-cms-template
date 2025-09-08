'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser';


export default function GroupDetail(){
const s = supabaseBrowser(); const params = useParams(); const gid = params?.id as string;
const [group,setGroup]=useState<any>(null); const [subs,setSubs]=useState<any[]>([]);
const [members,setMembers]=useState<any[]>([]); const [rolePerms,setRolePerms]=useState<any[]>([]);


const load=async()=>{
const [g,gs,gm,grp] = await Promise.all([
s.from('groups').select('*').eq('id',gid).single(),
s.from('group_subdomains').select('*').eq('group_id',gid),
s.from('group_members').select('*').eq('group_id',gid),
s.from('group_role_permissions').select('*, permissions(*)').eq('group_id',gid),
]);
setGroup(g.data); setSubs(gs.data??[]); setMembers(gm.data??[]); setRolePerms(grp.data??[]);
};
useEffect(()=>{ load(); },[gid]);


const addSub=async(sub:string)=>{ const { error } = await s.from('group_subdomains').insert({ group_id:gid, subdomain:sub }); if(error) return alert(error.message); load(); };
const addMember=async(userId:string, role:'admin'|'editor'|'viewer')=>{ const { error } = await s.from('group_members').insert({ group_id:gid, user_id:userId, role }); if(error) return alert(error.message); load(); };


return (
<div className="container" style={{ padding:'24px 0' }}>
<h1>{group?.name}</h1>
<section className="card" style={{ padding:16, marginBottom:12 }}>
<h3>Subdomains</h3>
{subs.map(su => (<div key={su.id} className="card" style={{ padding:10, margin:'6px 0' }}>{su.subdomain}.yourdomain.com</div>))}
<div style={{ display:'flex', gap:8 }}>
<input placeholder="new subdomain" id="newsub" />
<button className="btn" onClick={()=>{ const v=(document.getElementById('newsub') as HTMLInputElement).value; addSub(v); }}>Add</button>
</div>
</section>


<section className="card" style={{ padding:16, marginBottom:12 }}>
<h3>Members</h3>
{members.map(m => (<div key={`${m.group_id}-${m.user_id}`} className="card" style={{ padding:10, margin:'6px 0' }}>
<div className="tag">{m.user_id}</div> — {m.role}
</div>))}
</section>


<section className="card" style={{ padding:16 }}>
<h3>Role Permissions</h3>
{rolePerms.map(rp => (<div key={`${rp.group_id}-${rp.role}-${rp.permission_id}`} className="card" style={{ padding:10, margin:'6px 0' }}>
<div className="tag">{rp.role}</div> → {rp.permissions?.name} ({rp.permissions?.key})
</div>))}
</section>
</div>
);
}