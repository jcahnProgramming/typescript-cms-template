'use client';
import Image from 'next/image';
export default function ImageBlock({ src='', alt='', width=1600, height=900, className='' }){
if(!src) return null; return <Image src={src} alt={alt} width={width} height={height} className={className} />;
}