'use client';
import { useEffect, useRef, useState } from 'react';
import type { PageVersionContent } from '@/types/Page';
import WidgetSwitch from '@/components/WidgetSwitch';

const GRID = 12;
const MIN_W = 120;
const MIN_H = 80;

function useScale(designW:number, designH:number){
  const [scale,setScale]=useState(1);
  useEffect(()=>{
    const onResize=()=>{
      const vw=window.innerWidth, vh=window.innerHeight-64;
      setScale(Math.min(vw/designW, vh/designH));
    };
    onResize();
    window.addEventListener('resize',onResize);
    return ()=>window.removeEventListener('resize',onResize);
  },[designW,designH]);
  return scale;
}

export default function DesignCanvas({
  blocks, setBlocks, designW=1440, designH=900, onDirty, onSelect, selectedId
}:{
  blocks: PageVersionContent;
  setBlocks: (fn:(b:PageVersionContent)=>PageVersionContent)=>void;
  designW?: number; designH?: number;
  onDirty: ()=>void; onSelect:(id:string|null)=>void; selectedId: string|null;
}){
  const scale=useScale(designW,designH);
  const rootRef=useRef<HTMLDivElement>(null);
  const [menu,setMenu]=useState<{open:boolean;x:number;y:number}>({open:false,x:0,y:0});
  const [hoverId,setHoverId]=useState<string|null>(null);

  const toDesign=(clientX:number,clientY:number)=>{
    const rect=rootRef.current!.getBoundingClientRect();
    const cx=clientX-(rect.left+rect.width/2);
    const cy=clientY-(rect.top+rect.height/2);
    const x=Math.round((cx/scale)/GRID)*GRID;
    const y=Math.round((cy/scale)/GRID)*GRID;
    return {x,y};
  };

  const onContext=(e:React.MouseEvent)=>{
    e.preventDefault();
    setMenu({open:true,x:e.clientX,y:e.clientY});
  };

  const addBlock=(type:'text'|'image'|'hero')=>()=> {
    const {x,y}=toDesign(menu.x,menu.y);
    const id=crypto.randomUUID();
    const base:any={ id, type, layout:{x,y,w:400,h:240,z:1}, props:{} };
    if(type==='text') base.props={ html:'<p>New text</p>', variant:'p' };
    if(type==='hero') base.props={ headline:'Headline', subhead:'Subhead', ctaText:'Learn more', ctaHref:'#' };
    setBlocks(prev=>[...prev,base]);
    onDirty();
    setMenu(m=>({ ...m, open:false }));
  };

  // Move
  const onDrag=(id:string)=>(e:React.MouseEvent)=>{
    e.preventDefault();
    const start={mx:e.clientX,my:e.clientY};
    const blk=blocks.find(b=>b.id===id)!;
    const startPos={x:blk.layout?.x??0, y:blk.layout?.y??0};
    const onMove=(ev:MouseEvent)=>{
      const dx=(ev.clientX-start.mx)/scale, dy=(ev.clientY-start.my)/scale;
      const nx=Math.round((startPos.x+dx)/GRID)*GRID;
      const ny=Math.round((startPos.y+dy)/GRID)*GRID;
      setBlocks(prev=>prev.map(b=>b.id===id?{...b,layout:{...b.layout,x:nx,y:ny}}:b));
    };
    const onUp=()=>{
      window.removeEventListener('mousemove',onMove);
      window.removeEventListener('mouseup',onUp);
      onDirty();
    };
    window.addEventListener('mousemove',onMove);
    window.addEventListener('mouseup',onUp);
  };

  // Resize (bottom-right handle)
  const onResize=(id:string)=>(e:React.MouseEvent)=>{
    e.stopPropagation();
    e.preventDefault();
    const start={mx:e.clientX,my:e.clientY};
    const blk=blocks.find(b=>b.id===id)!;
    const startSize={w:blk.layout?.w ?? 400, h:blk.layout?.h ?? 240};
    const onMove=(ev:MouseEvent)=>{
      const dx=(ev.clientX-start.mx)/scale, dy=(ev.clientY-start.my)/scale;
      let w=Math.max(MIN_W, startSize.w+dx);
      let h=Math.max(MIN_H, startSize.h+dy);
      w = Math.round(w/GRID)*GRID;
      h = Math.round(h/GRID)*GRID;
      setBlocks(prev=>prev.map(b=>b.id===id?{...b,layout:{...b.layout,w,h,size:undefined}}:b));
    };
    const onUp=()=>{
      window.removeEventListener('mousemove',onMove);
      window.removeEventListener('mouseup',onUp);
      onDirty();
    };
    window.addEventListener('mousemove',onMove);
    window.addEventListener('mouseup',onUp);
  };

  const setWidthPreset=(id:string, preset:'small'|'medium'|'full')=>{
    const w = preset==='small' ? Math.round(designW/3) : preset==='medium' ? Math.round(designW/2) : designW;
    setBlocks(prev=>prev.map(b=> b.id===id ? { ...b, layout: { ...b.layout, w, size:preset } } : b));
    onDirty();
  };

  const onClickCanvas=()=>onSelect(null);

  return (
    <div style={{ position:'relative', height:'calc(100vh - 64px)' }} onMouseDown={onClickCanvas}>
      <div
        ref={rootRef}
        onContextMenu={onContext}
        style={{
          position:'absolute', left:'50%', top:'50%',
          width:designW, height:designH,
          transform:`translate(-50%,-50%) scale(${scale})`, transformOrigin:'center center',
          background:'rgba(255,255,255,0.02)', outline:'1px dashed rgba(255,255,255,0.08)'
        }}
      >
        {/* grid */}
        <svg width={designW} height={designH} style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <defs>
            <pattern id="grid" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
              <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <line x1={designW/2} y1={0} x2={designW/2} y2={designH} stroke="rgba(255,255,255,0.25)" />
          <line x1={0} y1={designH/2} x2={designW} y2={designH/2} stroke="rgba(255,255,255,0.25)" />
        </svg>

        {blocks.map(b=>{
          const w=b.layout?.w ?? 400, h=b.layout?.h ?? 240;
          const x=(designW/2)+(b.layout?.x??0), y=(designH/2)+(b.layout?.y??0);
          const selected=b.id===selectedId;
          return (
            <div
              key={b.id}
              onMouseEnter={()=>setHoverId(b.id)} onMouseLeave={()=>setHoverId(p=> p===b.id ? null : p)}
              onMouseDown={(e)=>{ e.stopPropagation(); onSelect(b.id); onDrag(b.id)(e); }}
              style={{
                position:'absolute', left:x-w/2, top:y-h/2, width:w, height:h,
                border:selected?'2px solid var(--color-accent)':'1px solid rgba(255,255,255,0.2)',
                borderRadius:8, cursor:'move', background:'rgba(0,0,0,0.02)', overflow:'hidden'
              }}
            >
              {/* size preset toolbar */}
              {(hoverId===b.id || selected) && (
                <div style={{ position:'absolute', left:'50%', top:-32, transform:'translateX(-50%)', display:'flex', gap:6 }}>
                  <button className="btn btn-tiny" onClick={(e)=>{ e.stopPropagation(); setWidthPreset(b.id,'small'); }}>Small</button>
                  <button className="btn btn-tiny" onClick={(e)=>{ e.stopPropagation(); setWidthPreset(b.id,'medium'); }}>Medium</button>
                  <button className="btn btn-tiny" onClick={(e)=>{ e.stopPropagation(); setWidthPreset(b.id,'full'); }}>Full</button>
                </div>
              )}

              {/* ✅ render the real widget preview */}
              <div style={{ width:'100%', height:'100%' }}>
                <WidgetSwitch block={b} />
              </div>

              {/* resize handle */}
              <div
                onMouseDown={onResize(b.id)}
                style={{
                  position:'absolute', right:2, bottom:2, width:14, height:14,
                  border:'1px solid rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.2)',
                  borderRadius:3, cursor:'nwse-resize'
                }}
                title="Drag to resize"
              />
            </div>
          );
        })}

        {menu.open && rootRef.current && (
          <div style={{
            position:'absolute',
            left:(menu.x-rootRef.current.getBoundingClientRect().left)/scale,
            top:(menu.y-rootRef.current.getBoundingClientRect().top)/scale,
            background:'rgba(14,17,22,0.95)', border:'1px solid rgba(255,255,255,0.12)',
            borderRadius:8, padding:8, width:180
          }}>
            <div className="btn" onClick={addBlock('text')}>Add Text</div>
            <div className="btn" onClick={addBlock('image')}>Add Image</div>
            <div className="btn" onClick={addBlock('hero')}>Add Hero</div>
          </div>
        )}
      </div>
    </div>
  );
}
