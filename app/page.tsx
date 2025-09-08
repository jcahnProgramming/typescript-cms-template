import { getPageBySlug } from '@/lib/pages';
import PageRenderer from '@/components/PageRenderer';


export default async function Home(){
const data = await getPageBySlug('home');
const content = data?.version?.content ?? [];
return (
<div className="container" style={{ padding:'24px 0' }}>
<PageRenderer content={content} />
</div>
);
}