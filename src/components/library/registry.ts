import { createButton }   from '@/components/widgets/ButtonBlock';
import { createHeading }  from '@/components/widgets/HeadingBlock';
import { createParagraph } from '@/components/widgets/ParagraphBlock';
import { createImage }    from '@/components/widgets/ImageBlock';
import { createVideo }    from '@/components/widgets/VideoBlock';
import { createHero }     from '@/components/widgets/HeroBlock';
import { createForm }     from '@/components/widgets/FormBlock';
import { createCard }     from '@/components/widgets/CardBlock';
import { createPricing }  from '@/components/widgets/PricingTableBlock';
import { createTabs }     from '@/components/widgets/TabsBlock';

export type WidgetFactory = { key: string; label: string; factory: () => any };

export const WIDGETS: Record<string, WidgetFactory[]> = {
  Content: [
    { key: 'heading',  label: 'Heading',        factory: createHeading },
    { key: 'paragraph',label: 'Paragraph',      factory: createParagraph },
    { key: 'button',   label: 'Button',         factory: createButton },
    { key: 'image',    label: 'Image',          factory: createImage },
    { key: 'video',    label: 'Video',          factory: createVideo },
    { key: 'hero',     label: 'Hero',           factory: createHero },
    { key: 'card',     label: 'Card',           factory: createCard },
    { key: 'pricing',  label: 'Pricing Table',  factory: createPricing },
    { key: 'tabs',     label: 'Tabs',           factory: createTabs },
    { key: 'form',     label: 'Form (Contact)', factory: createForm },
  ],
  Layout: [],
  Media: [],
};

export function allWidgets(): WidgetFactory[] {
  return Object.values(WIDGETS).flat();
}
