'use client';
import TextBlock from './widgets/TextBlock';
import ImageBlock from './widgets/ImageBlock';
import HeroBlock from './widgets/HeroBlock';
export default function WidgetSwitch({ block }:{ block:any }){
switch(block.type){
case 'text': return <TextBlock {...block.props} />;
case 'image': return <ImageBlock {...block.props} />;
case 'hero': return <HeroBlock {...block.props} />;
default: return null;
}
}