export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kalyan.example";
    const isProd = process.env.NODE_ENV === "production";
    if (!isProd) {
        return {
            rules: [{ userAgent: "*", disallow: "/" }],
            sitemap: [`${baseUrl}/sitemap.xml`],
            host: baseUrl,
        };
    }
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/", "/dashboard", "/settings"],
            },
        ],
        sitemap: [`${baseUrl}/sitemap.xml`],
        host: baseUrl,
    };
}
