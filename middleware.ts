import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export const config = { matcher: ['/((?!_next|api|assets).*)'] };


export default function middleware(req: NextRequest) {
const host = req.headers.get('host') || '';
if (host.endsWith('.vercel.app')) return NextResponse.next();


const parts = host.split('.');
const sub = parts.length > 2 ? parts[0] : (parts[0] !== 'www' && parts[0] !== 'yourdomain' ? parts[0] : '');
if (!sub || sub === 'www') return NextResponse.next();


// Group-aware route (Part 4) takes precedence if group subdomain exists.
const url = req.nextUrl.clone();
url.pathname = `/g/${sub}`; // will handle lookup and fallback to /s/[sub] if needed
return NextResponse.rewrite(url);
}