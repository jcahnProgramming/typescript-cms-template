'use client';

import { useState } from 'react';
import DesignCanvas from '@/components/canvas/DesignCanvas';
import WidgetLibrary from '@/components/library/WidgetLibrary';
import InspectorPanel from '@/components/inspector/InspectorPanel';
import SaveOverlay from '@/components/SaveOverlay';
import { supabaseBrowser } from '@/lib/supabase-browser';
import type { Block, PageVersionContent } from '@/types/Page';

export default function PlaygroundPage() {
  const [blocks, setBlocksState] = useState<PageVersionContent>([]);
  const [dirty, setDirty] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = blocks.find((b) => b.id === selectedId) ?? null;

  const onDirty = () => setDirty(true);
  const setBlocks = (fn: (b: PageVersionContent) => PageVersionContent) =>
    setBlocksState((prev) => fn(prev));

  // Library adds: provide a fully-formed block (id + centered layout)
  const addFromLibrary = (raw: any) => {
    const id = raw.id ?? crypto.randomUUID();
    const baseW = raw.layout?.w ?? 400;
    const baseH = raw.layout?.h ?? 240;
    const block: Block = {
      id,
      type: raw.type,
      props: raw.props ?? {},
      layout: { x: 0, y: 0, w: baseW, h: baseH, z: 1 },
    } as any;
    setBlocks((prev) => [...prev, block]);
    setSelectedId(id);
    onDirty();
  };

  const updateBlock = (next: Block) => {
    setBlocks((prev) => prev.map((b) => (b.id === next.id ? next : b)));
    onDirty();
  };

  async function saveVersion(name: string, folderId?: string) {
    const s = supabaseBrowser();

    const { data: pageRow, error: selErr } = await s
      .from('pages')
      .select('id')
      .eq('slug', 'home')
      .maybeSingle();
    if (selErr && selErr.code !== 'PGRST116') {
      alert(`Load page failed: ${selErr.message}`);
      return;
    }
    let pageId = pageRow?.id as string | undefined;

    if (!pageId) {
      const { data: created, error: insErr } = await s
        .from('pages')
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
      design_height: 900,
    });
    if (verErr) alert(`Save version failed: ${verErr.message}`);
    else setDirty(false);
  }

  return (
    <div className="playground">
      <WidgetLibrary onAdd={addFromLibrary} />
      <div className="playground__center">
        <DesignCanvas
          blocks={blocks}
          setBlocks={setBlocks}
          onDirty={onDirty}
          onSelect={(id) => setSelectedId(id)}
          selectedId={selectedId}
        />
        <SaveOverlay dirty={dirty} onSave={saveVersion} withFolderSelect />
      </div>
      <InspectorPanel block={selected ?? null} onChange={updateBlock} />
    </div>
  );
}
