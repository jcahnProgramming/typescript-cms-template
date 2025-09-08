'use client';
import ButtonBlock from './widgets/ButtonBlock';
import HeadingBlock from './widgets/HeadingBlock';
import ParagraphBlock from './widgets/ParagraphBlock';
import ImageBlock from './widgets/ImageBlock';
import VideoBlock from './widgets/VideoBlock';
import HeroBlock from './widgets/HeroBlock';
import FormBlock from './widgets/FormBlock';
import CardBlock from './widgets/CardBlock';
import PricingTableBlock from './widgets/PricingTableBlock';
import TabsBlock from './widgets/TabsBlock';

export default function WidgetSwitch({ block }:{ block:any }){
  switch(block.type){
    case 'button':    return <ButtonBlock {...block.props} />;
    case 'heading':   return <HeadingBlock {...block.props} />;
    case 'paragraph': return <ParagraphBlock {...block.props} />;
    case 'image':     return <ImageBlock {...block.props} />;
    case 'video':     return <VideoBlock {...block.props} />;
    case 'hero':      return <HeroBlock {...block.props} />;
    case 'form':      return <FormBlock {...block.props} />;
    case 'card':      return <CardBlock {...block.props} />;
    case 'pricing':   return <PricingTableBlock {...block.props} />;
    case 'tabs':      return <TabsBlock {...block.props} />;
    default:          return null;
  }
}
