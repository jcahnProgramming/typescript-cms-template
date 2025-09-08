import './globals.css';
import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/images.css';
import AdminBar from '@/components/AdminBar';
import { supabaseServer } from '@/lib/supabase-server';
import type { Metadata } from 'next';


export const metadata: Metadata = {
title: 'Themed Convergence Park',
description: 'Project Website CMS (Next.js + Supabase)',
};


async function ThemeVars(){
const s = supabaseServer();
// Load global theme tokens (fallbacks live in CSS variables file)
const { data } = await s.from('themes').select('*').limit(1).single();
const tokens = (data?.tokens as Record<string,string>) || {};
const style = Object.entries(tokens).map(([k,v])=>`${k}:${v}`).join(';');
return <style dangerouslySetInnerHTML={{ __html: `:root{${style}}` }} />;
}


export default async function RootLayout({ children }:{ children: React.ReactNode }){
return (
<html lang="en">
<body>
<ThemeVars />
<AdminBar />
{children}
</body>
</html>
);
}