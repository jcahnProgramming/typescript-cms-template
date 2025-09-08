'use client';

export default function HeroBlock({
  headline, subhead, ctaText, ctaHref, bgSrc, overlay = 0.4
}: { headline:string; subhead?:string; ctaText?:string; ctaHref?:string; bgSrc?:string; overlay?: number }) {
  return (
    <section className="card" style={{ position:'relative', padding:'80px 24px', overflow:'hidden' }}>
      {bgSrc && <img src={bgSrc} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />}
      {bgSrc && <div style={{ position:'absolute', inset:0, background:`rgba(0,0,0,${overlay})` }} />}
      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <h1 style={{ marginBottom:8 }}>{headline}</h1>
        {subhead && <p className="muted" style={{ maxWidth:720 }}>{subhead}</p>}
        {ctaText && ctaHref && <a className="btn primary" href={ctaHref} style={{ marginTop:20, display:'inline-block' }}>{ctaText}</a>}
      </div>
    </section>
  );
}

export const createHero = () => ({
  type: 'hero',
  props: { headline:'Welcome', subhead:'Add a short supporting line here.', ctaText:'Learn more', ctaHref:'#', bgSrc:'', overlay:0.4 },
});
