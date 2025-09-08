'use client';

export default function ButtonBlock({
  label, href = '#', kind = 'primary', newTab = false,
}: { label: string; href?: string; kind?: 'primary'|'secondary'|'ghost'; newTab?: boolean }) {
  const cls =
    kind === 'secondary' ? 'btn btn-secondary' :
    kind === 'ghost'     ? 'btn btn-ghost'     : 'btn primary';
  return (
    <a className={cls} href={href} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>
      {label}
    </a>
  );
}

// Suggested default
export const createButton = () => ({
  type: 'button',
  props: { label: 'Get Started', href: '#', kind: 'primary', newTab: false },
});
