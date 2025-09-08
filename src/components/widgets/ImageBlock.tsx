'use client';
import Image from 'next/image';

export default function ImageBlock({
  src = '',
  alt = '',
  className = '',
  objectFit = 'cover'
}:{
  src?: string; alt?: string; className?: string; objectFit?: 'cover'|'contain'|'fill';
}) {
  if (!src) {
    // subtle placeholder when not configured
    return <div className={`card ${className}`} style={{ width:'100%', height:'100%', display:'grid', placeItems:'center', opacity:.6 }}>
      <span>Image: set src in Inspector</span>
    </div>;
  }
  return (
    <div className={className} style={{ position:'relative', width:'100%', height:'100%' }}>
      <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit }} />
    </div>
  );
}
