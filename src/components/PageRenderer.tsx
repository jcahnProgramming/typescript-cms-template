'use client';
import WidgetSwitch from './WidgetSwitch';
export default function PageRenderer({ content }:{ content:any[] }){
return (<main>{content?.map(b => <div key={b.id} style={{ margin:'20px 0' }}><WidgetSwitch block={b} /></div>)}</main>);
}