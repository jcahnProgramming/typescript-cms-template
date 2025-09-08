'use client';

export default function ParagraphBlock({
  html, align = 'left',
}: { html: string; align?: 'left'|'center'|'right' }) {
  return <div style={{ textAlign: align }} dangerouslySetInnerHTML={{ __html: html }} />;
}

export const createParagraph = () => ({
  type: 'paragraph',
  props: { html: '<p>This is a paragraph. Edit me in the Inspector.</p>', align: 'left' },
});
