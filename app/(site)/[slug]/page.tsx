import { getPageBySlug } from '@/lib/pages';
import PageRenderer from '@/components/PageRenderer';
import { notFound } from 'next/navigation';


export default async function SitePage({ params }:{ params:{ slug:string } }){
const data = await getPageBySlug(params.slug);
if (!data) notFound();
return (
<div className="container" style={{ padding:'24px 0' }}>
<PageRenderer content={data.version?.content ?? []} />
</div>
);
}