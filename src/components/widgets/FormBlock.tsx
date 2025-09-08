'use client';

import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase-browser';

type Field = { key:string; label:string; type:'text'|'email'|'textarea'; required?:boolean; placeholder?:string };

export default function FormBlock({
  title='Contact us',
  submitLabel='Send',
  fields,
  successMessage='Thanks! We will reply soon.',
  errorMessage='Sorry—something went wrong.',
  webhookUrl,
  supabaseTable,
}: {
  title?: string;
  submitLabel?: string;
  fields: Field[];
  successMessage?: string;
  errorMessage?: string;
  webhookUrl?: string;
  supabaseTable?: string;
}) {
  const [values, setValues] = useState<Record<string,string>>({});
  const [status, setStatus] = useState<'idle'|'submitting'|'ok'|'error'>('idle');

  const set = (k:string,v:string)=>setValues(prev=>({...prev,[k]:v}));

  async function onSubmit(e:React.FormEvent) {
    e.preventDefault();
    if (status==='submitting') return;
    setStatus('submitting');
    try {
      // 1) Optional Supabase persistence
      if (supabaseTable) {
        const s = supabaseBrowser();
        const { error } = await s.from(supabaseTable).insert({ payload: values });
        if (error) throw error;
      }
      // 2) Optional webhook
      if (webhookUrl) {
        await fetch(webhookUrl, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(values) });
      }
      setStatus('ok');
      setValues({});
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="card" onSubmit={onSubmit} style={{ padding:16 }}>
      {title && <h3 style={{ marginTop:0 }}>{title}</h3>}
      <div style={{ display:'grid', gap:12 }}>
        {fields.map(f => (
          <div key={f.key} style={{ display:'grid', gap:6 }}>
            <label htmlFor={f.key} style={{ fontSize:12, opacity:.8 }}>{f.label}{f.required ? ' *' : ''}</label>
            {f.type === 'textarea' ? (
              <textarea
                id={f.key} required={!!f.required} placeholder={f.placeholder}
                value={values[f.key] ?? ''} onChange={e=>set(f.key, e.target.value)}
                style={{ padding:10, borderRadius:8, border:'1px solid rgba(255,255,255,0.15)', minHeight:100 }}
              />
            ) : (
              <input
                id={f.key} type={f.type} required={!!f.required} placeholder={f.placeholder}
                value={values[f.key] ?? ''} onChange={e=>set(f.key, e.target.value)}
                style={{ padding:10, borderRadius:8, border:'1px solid rgba(255,255,255,0.15)' }}
              />
            )}
          </div>
        ))}
        <div>
          <button className="btn primary" disabled={status==='submitting'}>{submitLabel}</button>
          {status==='ok' && <span className="tag" style={{ marginLeft:8 }}>{successMessage}</span>}
          {status==='error' && <span className="tag" style={{ marginLeft:8, background:'#e5484d' }}>{errorMessage}</span>}
        </div>
      </div>
    </form>
  );
}

export const createForm = () => ({
  type: 'form',
  props: {
    title: 'Contact us',
    submitLabel: 'Send',
    supabaseTable: 'form_submissions',
    fields: [
      { key:'name',  label:'Your Name', type:'text', required:true,  placeholder:'Jane Doe' },
      { key:'email', label:'Email',     type:'email', required:true, placeholder:'jane@example.com' },
      { key:'msg',   label:'Message',   type:'textarea', required:true, placeholder:'How can we help?' },
    ],
    successMessage: 'Thanks! We will reply soon.',
    errorMessage: 'Sorry—something went wrong.',
  },
});
