'use client';

export default function HeadingBlock({
  text, level = 2, align = 'left',
}: { text: string; level?: 1|2|3|4; align?: 'left'|'center'|'right' }) {
  const Tag: any = `h${level}`;
  return <Tag style={{ textAlign: align }}>{text}</Tag>;
}

export const createHeading = () => ({
  type: 'heading',
  props: { text: 'Section Heading', level: 2, align: 'left' },
});
