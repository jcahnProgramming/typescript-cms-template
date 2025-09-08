'use client';

import { WIDGETS } from './registry';

export default function WidgetLibrary({ onAdd }: { onAdd: (block: any) => void }) {
  return (
    <aside className="widgetlib card">
      <h3 className="widgetlib__title">Widget Library</h3>
      {Object.entries(WIDGETS).map(([cat, list]) => (
        <div key={cat} className="widgetlib__section">
          <h4 className="widgetlib__heading">{cat}</h4>
          <div className="widgetlib__grid">
            {list.map((w) => (
              <button
                key={w.key}
                className="btn btn-tiny"
                onClick={() => onAdd(w.factory())}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
