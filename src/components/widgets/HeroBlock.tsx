'use client';
export default function HeroBlock({ headline, subhead, ctaText, ctaHref, bgSrc }:{ headline:string; subhead?:string; ctaText?:string; ctaHref?:string; bgSrc?:string }){
return (
<section className="card" style={{ position:'relative', padding:'80px 24px', overflow:'hidden' }}>
{bgSrc && <img src={bgSrc} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.6 }} />}
<div className="container" style={{ position:'relative', zIndex:1 }}>
<h1 style={{ marginBottom:8 }}>{headline}</h1>
{subhead && <p className="muted" style={{ maxWidth:720 }}>{subhead}</p>}
{ctaText && ctaHref && <a className="btn primary" href={ctaHref} style={{ marginTop:20 }}>{ctaText}</a>}
</div>
</section>
);
}