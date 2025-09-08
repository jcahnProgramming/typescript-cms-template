'use client';
import { usePathname, useRouter } from 'next/navigation';
export default function AdminBar(){
const router = useRouter(); const pathname = usePathname();
const go=(p:string)=>router.push(p);
const onTest=async()=>{ const slug = pathname==='/'?'home':pathname.split('/').filter(Boolean).pop(); if(!slug) return; await fetch(`/api/pages/${slug}/duplicate-to-test`,{method:'POST'}); router.push(`/test/${slug}`); };
const active=(t:'Live'|'Test'|'Playground')=> t==='Live' ? (!pathname?.startsWith('/test') && !pathname?.startsWith('/playground')) : t==='Test' ? pathname?.startsWith('/test') : pathname?.startsWith('/playground');
return (
<div className="adminbar">
<div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
<div className="tabs">
<div className={`tab ${active('Live')?'active':''}`} onClick={()=>go('/')}>Live Version</div>
<div className={`tab ${active('Test')?'active':''}`} onClick={onTest}>Test Version</div>
<div className={`tab ${active('Playground')?'active':''}`} onClick={()=>go('/playground')}>Playground</div>
</div>
<a className="btn" href="/settings">Settings</a>
</div>
</div>
);
}