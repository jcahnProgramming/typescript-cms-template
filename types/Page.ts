export type Layout = { x:number; y:number; w?:number; h?:number; z?:number; size?: 'small'|'medium'|'full' };
export type BlockBase = { id:string; type:string; props:Record<string,any>; layout?:Layout };
export type TextBlock = BlockBase & { type:'text'; props:{ html:string; variant?:'p'|'h1'|'h2'|'h3'; className?:string } };
export type ImageBlock = BlockBase & { type:'image'; props:{ src?:string; alt?:string; width?:number; height?:number; className?:string } };
export type HeroBlock = BlockBase & { type:'hero'; props:{ headline:string; subhead?:string; ctaText?:string; ctaHref?:string; bgSrc?:string } };
export type Block = TextBlock | ImageBlock | HeroBlock;
export type PageVersionContent = Block[];