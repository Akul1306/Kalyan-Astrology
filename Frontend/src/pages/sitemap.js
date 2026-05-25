export default function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kalyan.example";
    const now = new Date();
    const routes = [
        "/",
        "/dashboard",
        "/education",
        "/match-making",
        "/paper-view",
        "/settings",
        "/store",
        "/blogs",
    ];
    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: route === "/" ? 1 : 0.7,
    }));
}
