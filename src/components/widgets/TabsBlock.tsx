'use client';
import { useState, useMemo } from 'react';

type Item = { id:string; title:string; html:string };

export default function TabsBlock({ variant='tabs', items }: { variant?: 'tabs'|'accordion'; items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const map = useMemo(()=>Object.fromEntries(items.map(i=>[i.id,i])),[items]);

  if (variant === 'accordion') {
    return (
      <div className="card" style={{ padding:8 }}>
        {items.map(it => {
          const open = active === it.id;
          return (
            <div key={it.id} className="card" style={{ margin:'8px 0', overflow:'hidden' }}>
              <button className="tab" onClick={()=>setActive(open ? '' : it.id)} style={{ width:'100%', textAlign:'left' }}>
                {it.title}
              </button>
              {open && <div style={{ padding:12 }} dangerouslySetInnerHTML={{ __html: it.html }} />}
            </div>
          );
        })}
      </div>
    );
  }

  // tabs
  return (
    <div className="card" style={{ padding:8 }}>
      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        {items.map(it => (
          <button key={it.id} className={`tab ${active===it.id?'active':''}`} onClick={()=>setActive(it.id)}>
            {it.title}
          </button>
        ))}
      </div>
      <div style={{ marginTop:12 }}>
        {active && <div dangerouslySetInnerHTML={{ __html: map[active]?.html ?? '' }} />}
      </div>
    </div>
  );
}

export const createTabs = () => ({
  type: 'tabs',
  props: {
    variant: 'tabs',
    items: [
      { id: crypto.randomUUID(), title:'Tab A', html:'<p>Content A</p>' },
      { id: crypto.randomUUID(), title:'Tab B', html:'<p>Content B</p>' },
      { id: crypto.randomUUID(), title:'Tab C', html:'<p>Content C</p>' },
    ],
  },
});
