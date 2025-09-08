'use client';

export default function CardBlock({
  image, title='Card title', text='Card content goes here.', ctaText, ctaHref='#'
}: { image?:string; title?:string; text?:string; ctaText?:string; ctaHref?:string }) {
  return (
    <article className="card" style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      {image && <img src={image} alt="" style={{ width:'100%', height:180, objectFit:'cover' }} />}
      <div style={{ padding:16, display:'grid', gap:8 }}>
        <h3 style={{ margin:0 }}>{title}</h3>
        <p className="muted" style={{ margin:0 }}>{text}</p>
        {ctaText && <a className="btn" href={ctaHref} style={{ width:'fit-content' }}>{ctaText}</a>}
      </div>
    </article>
  );
}

export const createCard = () => ({
  type: 'card',
  props: { image:'', title:'Card title', text:'Card content goes here.', ctaText:'Learn more', ctaHref:'#' },
});
