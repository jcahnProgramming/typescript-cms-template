'use client';

import { useRef } from 'react';
import type { Block } from '@/types/Page';
import { uploadImage } from '@/lib/storage';

type Props = {
  block: Block | null;
  onChange: (next: Block) => void;
};

function setDeep<T extends Record<string, any>>(obj: T, path: string, value: any): T {
  const next: any = Array.isArray(obj) ? [...(obj as any)] : { ...(obj as any) };
  const parts = path.split('.');
  let cur: any = next;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]!;
    cur[k] = cur[k] ?? {};
    cur = cur[k];
  }
  cur[parts.at(-1)!] = value;
  return next;
}

export default function InspectorPanel({ block, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  if (!block) {
    return (
      <aside className="inspector card">
        <div className="inspector__empty">Select a widget to edit its properties</div>
      </aside>
    );
  }

  const layout = block.layout ?? {};
  const style = (block.props as any).style ?? {};

  const changeLayout = (key: 'x' | 'y' | 'w' | 'h' | 'z', v: number) => {
    const next: Block = { ...block, layout: { ...layout, [key]: v } };
    onChange(next);
  };

  const changeProp = (path: string, v: any) => {
    onChange(setDeep(block as any, path, v) as Block);
  };

  const handleUpload = async (file?: File) => {
    if (!file) return;
    try {
      const { publicUrl } = await uploadImage(file);
      // Prefer updating src for image/hero backgrounds when relevant
      if (block.type === 'image') {
        onChange({ ...block, props: { ...block.props, src: publicUrl } });
      } else if (block.type === 'hero') {
        onChange({ ...block, props: { ...block.props, bgSrc: publicUrl } });
      }
    } catch (e: any) {
      alert(`Upload failed: ${e?.message ?? e}`);
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <aside className="inspector card">
      <div className="inspector__header">
        <div className="tag">{block.type}</div>
        <div style={{ fontWeight: 700 }}>{block.id.slice(0, 8)}</div>
      </div>

      {/* Position & Size */}
      <div className="inspector__section">
        <div className="inspector__title">Position & Size</div>
        <div className="inspector__grid">
          <label>X</label>
          <input
            type="number"
            value={layout.x ?? 0}
            onChange={(e) => changeLayout('x', Number(e.target.value))}
          />

          <label>Y</label>
          <input
            type="number"
            value={layout.y ?? 0}
            onChange={(e) => changeLayout('y', Number(e.target.value))}
          />

          <label>W</label>
          <input
            type="number"
            value={layout.w ?? 400}
            onChange={(e) => changeLayout('w', Number(e.target.value))}
          />

          <label>H</label>
          <input
            type="number"
            value={layout.h ?? 240}
            onChange={(e) => changeLayout('h', Number(e.target.value))}
          />
        </div>
      </div>

      {/* Style */}
      <div className="inspector__section">
        <div className="inspector__title">Style</div>
        <div className="inspector__grid">
          <label>Radius</label>
          <input
            type="number"
            value={style.radius ?? 12}
            onChange={(e) => changeProp('props.style.radius', Number(e.target.value))}
          />

          <label>BG</label>
          <input
            value={style.bg ?? ''}
            onChange={(e) => changeProp('props.style.bg', e.target.value)}
            placeholder="e.g. #0e1116 or rgba(...)"
          />

          <label>Text</label>
          <input
            value={style.color ?? ''}
            onChange={(e) => changeProp('props.style.color', e.target.value)}
            placeholder="e.g. #f5f7fb"
          />

          <label>Border</label>
          <input
            value={style.border ?? ''}
            onChange={(e) => changeProp('props.style.border', e.target.value)}
            placeholder="e.g. 1px solid #fff3"
          />

          <label>Shadow</label>
          <select
            value={style.shadow ?? 'none'}
            onChange={(e) => changeProp('props.style.shadow', e.target.value)}
          >
            <option value="none">None</option>
            <option value="1">Shadow 1</option>
            <option value="2">Shadow 2</option>
          </select>

          <label>Class</label>
          <input
            value={style.className ?? ''}
            onChange={(e) => changeProp('props.style.className', e.target.value)}
            placeholder="optional CSS class"
          />
        </div>
      </div>

      {/* Click behavior */}
      <div className="inspector__section">
        <div className="inspector__title">On Click</div>
        {(() => {
          const onClick = (block.props as any).onClick ?? { kind: 'none' };
          const kind = onClick.kind ?? 'none';
          return (
            <>
              <select
                value={kind}
                onChange={(e) => changeProp('props.onClick.kind', e.target.value)}
              >
                <option value="none">None</option>
                <option value="link">Link</option>
                <option value="scroll">Scroll</option>
                <option value="emit">Emit Event</option>
              </select>

              {kind === 'link' && (
                <div className="inspector__grid">
                  <label>Href</label>
                  <input
                    value={onClick.href ?? ''}
                    onChange={(e) => changeProp('props.onClick.href', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              )}

              {kind === 'scroll' && (
                <div className="inspector__grid">
                  <label>Selector</label>
                  <input
                    value={onClick.selector ?? ''}
                    onChange={(e) => changeProp('props.onClick.selector', e.target.value)}
                    placeholder="#target-id or .class"
                  />
                </div>
              )}

              {kind === 'emit' && (
                <div className="inspector__grid">
                  <label>Event</label>
                  <input
                    value={onClick.event ?? ''}
                    onChange={(e) => changeProp('props.onClick.event', e.target.value)}
                    placeholder="custom-event-name"
                  />
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* Widget-specific editors */}
      {block.type === 'text' && (
        <div className="inspector__section">
          <div className="inspector__title">Text</div>
          <div className="inspector__grid">
            <label>Variant</label>
            <select
              value={(block.props as any).variant ?? 'p'}
              onChange={(e) => changeProp('props.variant', e.target.value)}
            >
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
              <option value="p">Paragraph</option>
            </select>

            <label>HTML</label>
            <textarea
              style={{ gridColumn: '1 / -1', minHeight: 120 }}
              value={(block.props as any).html ?? ''}
              onChange={(e) => changeProp('props.html', e.target.value)}
              placeholder="<p>Write your content…</p>"
            />
          </div>
        </div>
      )}

      {block.type === 'image' && (
        <div className="inspector__section">
          <div className="inspector__title">Image</div>
          <div className="inspector__grid">
            <label>URL</label>
            <input
              value={(block.props as any).src ?? ''}
              onChange={(e) => changeProp('props.src', e.target.value)}
              placeholder="https://…"
            />

            <label>Alt</label>
            <input
              value={(block.props as any).alt ?? ''}
              onChange={(e) => changeProp('props.alt', e.target.value)}
              placeholder="Describe the image"
            />

            <label>Fit</label>
            <select
              value={(block.props as any).objectFit ?? 'cover'}
              onChange={(e) => changeProp('props.objectFit', e.target.value)}
            >
              <option value="cover">cover</option>
              <option value="contain">contain</option>
              <option value="fill">fill</option>
            </select>

            <label>Upload</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files?.[0] ?? undefined)}
            />
          </div>
        </div>
      )}

      {block.type === 'hero' && (
        <div className="inspector__section">
          <div className="inspector__title">Hero</div>
          <div className="inspector__grid">
            <label>Headline</label>
            <input
              value={(block.props as any).headline ?? ''}
              onChange={(e) => changeProp('props.headline', e.target.value)}
            />

            <label>Subhead</label>
            <input
              value={(block.props as any).subhead ?? ''}
              onChange={(e) => changeProp('props.subhead', e.target.value)}
            />

            <label>CTA Text</label>
            <input
              value={(block.props as any).ctaText ?? ''}
              onChange={(e) => changeProp('props.ctaText', e.target.value)}
            />

            <label>CTA Href</label>
            <input
              value={(block.props as any).ctaHref ?? ''}
              onChange={(e) => changeProp('props.ctaHref', e.target.value)}
              placeholder="#, /path, or https://…"
            />

            <label>BG Image URL</label>
            <input
              value={(block.props as any).bgSrc ?? ''}
              onChange={(e) => changeProp('props.bgSrc', e.target.value)}
            />

            <label>BG Upload</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files?.[0] ?? undefined)}
            />
          </div>
        </div>
      )}
    </aside>
  );
}
