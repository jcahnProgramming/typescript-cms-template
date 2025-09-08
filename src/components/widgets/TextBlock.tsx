'use client';
export default function TextBlock({ html, variant='p', className='' }:{ html:string; variant?:'p'|'h1'|'h2'|'h3'; className?:string }){
const Tag:any = variant; return <Tag className={`textblock ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}