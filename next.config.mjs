/** @type {import('next').NextConfig} */
const nextConfig = {
images: { remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }] },
experimental: { reactCompiler: true },
};
export default nextConfig;