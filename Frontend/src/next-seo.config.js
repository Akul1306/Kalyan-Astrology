const siteUrl = import.meta.env.VITE_SITE_URL || "https://www.kalyan.example"

const config = {
	titleTemplate: "%s | Kalyan",
	defaultTitle: "Kalyan - Professional Vedic Astrology",
	description:
		"Generate accurate Kundli charts with detailed predictions and astrological analysis.",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteUrl,
		siteName: "Kalyan",
		images: [
			{
				url: `${siteUrl}/placeholder.jpg`,
				width: 1200,
				height: 630,
				alt: "Kalyan preview",
			},
		],
	},
	twitter: {
		cardType: "summary_large_image",
		handle: "@kalyan",
		site: "@kalyan",
	},
	additionalLinkTags: [
		{ rel: "icon", href: "/Logo/Logo.png" },
	],
	additionalMetaTags: [
		{ name: "application-name", content: "Kalyan" },
		{ name: "theme-color", content: "#ffffff" },
	],
}

export default config
