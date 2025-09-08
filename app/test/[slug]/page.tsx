import { getTestPageBySlug } from '@/lib/pages';
import PageRenderer from '@/components/PageRenderer';
import { notFound } from 'next/navigation';


export default async function TestPage({ params }:{ params:{ slug:string } }){
const data = await getTestPageBySlug(params.slug);
if (!data) notFound();
return (
<div className="container" style={{ padding:'24px 0' }}>
<div className="tag">TEST VERSION</div>
<PageRenderer content={data.version?.content ?? []} />
</div>
);
}