'use client';
import type { Block } from '@/types/Page';
export default function InspectorPanel({ block, onChange }:{ block: Block|null; onChange:(b:Block)=>void; }){
if(!block) return (<aside className="inspector card"><div className="inspector__empty">Select a widget to edit its properties</div></aside>);
const style=(block.props as any).style||{};
const set=(path:string,value:any)=>{ const next:any={...block}; const parts=path.split('.'); let obj=next; for(let i=0;i<parts.length-1;i++) obj= (obj as any)[parts[i]] ||= {}; (obj as any)[parts.at(-1)!]=value; onChange(next); };
const kind=(block.props as any).onClick?.kind || 'none';
return (
<aside className="inspector card">
<div className="inspector__header"><div className="tag">{block.type}</div><div style={{fontWeight:700}}>{block.id.slice(0,8)}</div></div>
<div className="inspector__section"><div className="inspector__title">Position & Size</div><div className="inspector__grid">
<label>X</label><input type="number" value={block.layout?.x ?? 0} onChange={e=>onChange({ ...block, layout:{ ...block.layout, x:Number(e.target.value) } as any })} />
<label>Y</label><input type="number" value={block.layout?.y ?? 0} onChange={e=>onChange({ ...block, layout:{ ...block.layout, y:Number(e.target.value) } as any })} />
<label>W</label><input type="number" value={block.layout?.w ?? 400} onChange={e=>onChange({ ...block, layout:{ ...block.layout, w:Number(e.target.value) } as any })} />
<label>H</label><input type="number" value={block.layout?.h ?? 200} onChange={e=>onChange({ ...block, layout:{ ...block.layout, h:Number(e.target.value) } as any })} />
</div></div>
<div className="inspector__section"><div className="inspector__title">Style</div><div className="inspector__grid">
<label>Radius</label><input type="number" value={style.radius ?? 12} onChange={e=>set('props.style.radius', Number(e.target.value))} />
<label>BG</label><input value={style.bg ?? ''} onChange={e=>set('props.style.bg', e.target.value)} />
<label>Text</label><input value={style.color ?? ''} onChange={e=>set('props.style.color', e.target.value)} />
<label>Border</label><input value={style.border ?? ''} onChange={e=>set('props.style.border', e.target.value)} />
<label>Shadow</label><select value={style.shadow ?? 'none'} onChange={e=>set('props.style.shadow', e.target.value)}><option value="none">None</option><option value="1">Shadow 1</option><option value="2">Shadow 2</option></select>
<label>Class</label><input value={style.className ?? ''} onChange={e=>set('props.style.className', e.target.value)} />
</div></div>
<div className="inspector__section"><div className="inspector__title">On Click</div>
<select value={kind} onChange={e=>set('props.onClick.kind', e.target.value)}>
<option value="none">None</option><option value="link">Link</option><option value="scroll">Scroll</option><option value="emit">Emit</option>
</select>
{kind==='link' && (<div className="inspector__grid"><label>Href</label><input onChange={e=>set('props.onClick.href', e.target.value)} /></div>)}
{kind==='scroll' && (<div className="inspector__grid"><label>Selector</label><input onChange={e=>set('props.onClick.selector', e.target.value)} /></div>)}
{kind==='emit' && (<div className="inspector__grid"><label>Event</label><input onChange={e=>set('props.onClick.event', e.target.value)} /></div>)}
</div>
</aside>
);
}