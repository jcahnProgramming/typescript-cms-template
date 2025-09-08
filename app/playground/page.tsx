'use client';
import { useState } from 'react';
import DesignCanvas from '@/components/canvas/DesignCanvas';
import WidgetLibrary from '@/components/library/WidgetLibrary';
import InspectorPanel from '@/components/inspector/InspectorPanel';
import SaveOverlay from '@/components/SaveOverlay';
import { supabaseBrowser } from '@/lib/supabase-browser';
import type { Block, PageVersionContent } from '@/types/Page';

export default function PlaygroundPage(){
  const [blocks, setBlocksState] = useState<PageVersionContent>([]);
  const [dirty, setDirty] = useState(false);
  const [selectedId, setSelectedId] = useState<string|null>(null);
  const selected = blocks.find(b => b.id === selectedId) ?? null;
  const onDirty = () => setDirty(true);

  // ✅ functional state setter to avoid stale closures
  const setBlocks = (fn: (b: PageVersionContent) => PageVersionContent) =>
    setBlocksState(prev => fn(prev));

  const addAtCenter = (type: string) => {
    const id = crypto.randomUUID();
    const base: any = { id, type, layout: { x:0, y:0, w:400, h:200, z:1 }, props: {} };
    if (type === 'text') base.props = { html:'<p>New text</p>', variant:'p' };
    if (type === 'hero') base.props = { headline:'Headline', subhead:'Subhead', ctaText:'Learn more', ctaHref:'#' };
    setBlocks(prev => [...prev, base]);
    setSelectedId(id);
    onDirty();
  };

  const updateBlock = (next: Block) => {
    setBlocks(prev => prev.map(b => (b.id === next.id ? next : b)));
    onDirty();
  };

  // ✅ robust save
  async function saveVersion(name: string, folderId?: string) {
    const s = supabaseBrowser();

    const { data: pageRow, error: selErr } =
      await s.from('pages').select('id').eq('slug', 'home').maybeSingle();
    if (selErr && selErr.code !== 'PGRST116') {
      alert(`Load page failed: ${selErr.message}`);
      return;
    }
    let pageId = pageRow?.id as string | undefined;

    if (!pageId) {
      const { data: created, error: insErr } =
        await s.from('pages')
          .insert({ slug: 'home', title: 'Home', folder_id: folderId ?? null })
          .select('id')
          .single();
      if (insErr || !created?.id) {
        alert(`Create page failed: ${insErr?.message ?? 'no id returned'}`);
        return;
      }
      pageId = created.id;
    }

    const { error: verErr } = await s.from('page_versions').insert({
      page_id: pageId,
      name,
      content: blocks,
      is_playground: true,
      design_width: 1440,
      design_height: 900
    });
    if (verErr) alert(`Save version failed: ${verErr.message}`); else setDirty(false);
  }

  return (
    <div className="playground">
      <WidgetLibrary onAdd={addAtCenter} />
      <div className="playground__center">
        <DesignCanvas
          blocks={blocks}
          setBlocks={setBlocks}
          onDirty={onDirty}
          onSelect={id => setSelectedId(id)}
          selectedId={selectedId}
        />
        <SaveOverlay dirty={dirty} onSave={saveVersion} withFolderSelect />
      </div>
      <InspectorPanel block={selected} onChange={updateBlock} />
    </div>
  );
}
