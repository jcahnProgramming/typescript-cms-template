'use client';

export default function PricingTableBlock({
  heading = 'Pricing',
  tiers,
}: {
  heading?: string;
  tiers: Array<{ name:string; price:string; period?:string; features:string[]; ctaText?:string; ctaHref?:string; highlight?:boolean }>;
}) {
  return (
    <section className="card" style={{ padding:16 }}>
      {heading && <h2 style={{ textAlign:'center', margin:'10px 0 24px' }}>{heading}</h2>}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12 }}>
        {tiers.map((t, i) => (
          <div key={i} className="card" style={{ padding:16, borderColor: t.highlight ? 'var(--color-accent)' : undefined }}>
            <div style={{ fontWeight:700, fontSize:18 }}>{t.name}</div>
            <div style={{ fontSize:28, margin:'8px 0' }}>
              {t.price} <span className="muted" style={{ fontSize:12 }}>{t.period ? `/${t.period}` : ''}</span>
            </div>
            <ul style={{ paddingLeft:18, margin:'8px 0' }}>
              {t.features.map((f,idx)=><li key={idx}>{f}</li>)}
            </ul>
            {t.ctaText && <a className="btn" href={t.ctaHref ?? '#'}>{t.ctaText}</a>}
          </div>
        ))}
      </div>
    </section>
  );
}

export const createPricing = () => ({
  type: 'pricing',
  props: {
    heading: 'Pricing',
    tiers: [
      { name:'Starter', price:'$9',  period:'mo', features:['1 project','Email support'], ctaText:'Choose', ctaHref:'#' },
      { name:'Pro',     price:'$29', period:'mo', features:['5 projects','Priority support'], ctaText:'Choose', ctaHref:'#', highlight:true },
      { name:'Team',    price:'$79', period:'mo', features:['Unlimited','SLA support'], ctaText:'Choose', ctaHref:'#' },
    ],
  },
});
