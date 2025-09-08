'use client';

function YouTube({ src }: { src: string }) {
  // Accepts full URL; extract id if needed
  const url = src.includes('youtube') || src.includes('youtu.be')
    ? src
    : `https://www.youtube.com/embed/${src}`;
  return (
    <iframe
      src={url}
      title="YouTube video"
      style={{ width:'100%', height:'100%', border:0 }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

function Vimeo({ src }: { src: string }) {
  const url = src.includes('vimeo.com')
    ? src.replace('vimeo.com/', 'player.vimeo.com/video/')
    : `https://player.vimeo.com/video/${src}`;
  return <iframe src={url} title="Vimeo video" style={{ width:'100%', height:'100%', border:0 }} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />;
}

export default function VideoBlock({
  src = '', poster, autoplay=false, muted=true, loop=false, controls=true, provider='html5'
}: {
  src?: string; poster?: string; autoplay?: boolean; muted?: boolean; loop?: boolean; controls?: boolean;
  provider?: 'html5'|'youtube'|'vimeo';
}) {
  if (!src) {
    return <div className="card" style={{ width:'100%', height:'100%', display:'grid', placeItems:'center', opacity:.6 }}>Set video source</div>;
  }
  if (provider === 'youtube') return <YouTube src={src} />;
  if (provider === 'vimeo') return <Vimeo src={src} />;
  return (
    <video
      src={src}
      poster={poster}
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      controls={controls}
      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
    />
  );
}

export const createVideo = () => ({
  type: 'video',
  props: { src: '', poster: '', autoplay:false, muted:true, loop:false, controls:true, provider:'html5' },
});
