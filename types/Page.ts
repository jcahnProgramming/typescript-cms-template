export type Layout = { x:number; y:number; w?:number; h?:number; z?:number; size?: 'small'|'medium'|'full' };
export type BlockBase = { id:string; type:string; props:Record<string,any>; layout?:Layout };

/** Button */
export type ButtonBlock = BlockBase & {
  type: 'button';
  props: { label: string; href?: string; kind?: 'primary'|'secondary'|'ghost'; newTab?: boolean };
};

/** Heading */
export type HeadingBlock = BlockBase & {
  type: 'heading';
  props: { text: string; level?: 1|2|3|4; align?: 'left'|'center'|'right' };
};

/** Paragraph */
export type ParagraphBlock = BlockBase & {
  type: 'paragraph';
  props: { html: string; align?: 'left'|'center'|'right' };
};

/** Image */
export type ImageBlock = BlockBase & {
  type: 'image';
  props: { src?: string; alt?: string; objectFit?: 'cover'|'contain'|'fill' };
};

/** Video */
export type VideoBlock = BlockBase & {
  type: 'video';
  props: {
    src?: string;  // MP4 or HLS
    poster?: string;
    autoplay?: boolean; muted?: boolean; loop?: boolean; controls?: boolean;
    provider?: 'html5'|'youtube'|'vimeo';
  };
};

/** Hero */
export type HeroBlock  = BlockBase & {
  type:'hero';
  props:{ headline:string; subhead?:string; ctaText?:string; ctaHref?:string; bgSrc?:string; overlay?: number /* 0..1 */ };
};

/** Form (Contact) */
export type FormBlock = BlockBase & {
  type: 'form';
  props: {
    title?: string;
    submitLabel?: string;
    webhookUrl?: string;          // optional webhook
    supabaseTable?: string;       // optional supabase persistence
    fields: Array<{
      key: string;
      label: string;
      type: 'text'|'email'|'textarea';
      required?: boolean;
      placeholder?: string;
    }>;
    successMessage?: string;
    errorMessage?: string;
  };
};

/** Card */
export type CardBlock = BlockBase & {
  type: 'card';
  props: { image?: string; title?: string; text?: string; ctaText?: string; ctaHref?: string };
};

/** Pricing Table */
export type PricingTableBlock = BlockBase & {
  type: 'pricing';
  props: {
    heading?: string;
    tiers: Array<{ name:string; price:string; period?:string; features:string[]; ctaText?:string; ctaHref?:string; highlight?:boolean }>;
  };
};

/** Tabs (can render as accordion on small screens) */
export type TabsBlock = BlockBase & {
  type: 'tabs';
  props: { variant?: 'tabs'|'accordion'; items: Array<{ id:string; title:string; html:string }> };
};

export type Block =
  ButtonBlock | HeadingBlock | ParagraphBlock | ImageBlock | VideoBlock |
  HeroBlock | FormBlock | CardBlock | PricingTableBlock | TabsBlock;

export type PageVersionContent = Block[];
