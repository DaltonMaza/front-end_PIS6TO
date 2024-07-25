/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "build_node",
    env: {
        URL_API: "http://localhost:3000/"
    }
};
export default nextConfig;