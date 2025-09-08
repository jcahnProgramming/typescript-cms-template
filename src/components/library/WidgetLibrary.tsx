'use client';

import { createButton } from '@/components/widgets/ButtonBlock';
import { createHeading } from '@/components/widgets/HeadingBlock';
import { createParagraph } from '@/components/widgets/ParagraphBlock';
import { createImage } from '@/components/widgets/ImageBlock';
import { createVideo } from '@/components/widgets/VideoBlock';
import { createHero } from '@/components/widgets/HeroBlock';
import { createForm } from '@/components/widgets/FormBlock';
import { createCard } from '@/components/widgets/CardBlock';
import { createPricing } from '@/components/widgets/PricingTableBlock';
import { createTabs } from '@/components/widgets/TabsBlock';

type WidgetMeta = { key: string; label: string; factory: () => any };

const WIDGETS: Record<string, WidgetMeta[]> = {
  Content: [
    { key: 'heading', label: 'Heading', factory: createHeading },
    { key: 'paragraph', label: 'Paragraph', factory: createParagraph },
    { key: 'button', label: 'Button', factory: createButton },
    { key: 'image', label: 'Image', factory: createImage },
    { key: 'video', label: 'Video', factory: createVideo },
    { key: 'hero', label: 'Hero', factory: createHero },
    { key: 'card', label: 'Card', factory: createCard },
    { key: 'pricing', label: 'Pricing Table', factory: createPricing },
    { key: 'tabs', label: 'Tabs', factory: createTabs },
    { key: 'form', label: 'Form (Contact)', factory: createForm },
  ],
  Layout: [],
  Media: [],
};

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
