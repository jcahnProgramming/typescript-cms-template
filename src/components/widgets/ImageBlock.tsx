'use client';
import Image from 'next/image';

export default function ImageBlock({
  src = '', alt = '', objectFit = 'cover',
}: { src?: string; alt?: string; objectFit?: 'cover'|'contain'|'fill' }) {
  if (!src) {
    return (
      <div className="card" style={{ width:'100%', height:'100%', display:'grid', placeItems:'center', opacity:.6 }}>
        <span>Image: set src in Inspector</span>
      </div>
    );
  }
  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit }} />
    </div>
  );
}

export const createImage = () => ({ type: 'image', props: { src: '', alt: '', objectFit: 'cover' } });
