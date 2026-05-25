"use client";
import React from "react";
import { OrganizationJsonLd, LogoJsonLd, WebPageJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";
export default function StructuredData({ nonce }) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kalyan.example";
    return (<>
			<OrganizationJsonLd scriptProps={{ nonce }} name="Kalyan" url={siteUrl} logo={`${siteUrl}/Logo/Logo.png`} contactPoint={[{ contactType: "customer service", email: "support@kalyan.example" }]}/>
			<LogoJsonLd scriptProps={{ nonce }} logo={`${siteUrl}/Logo/Logo.png`} url={siteUrl}/>
			<WebPageJsonLd scriptProps={{ nonce }} id={`${siteUrl}/#webpage`} url={siteUrl} title="Kalyan - Professional Vedic Astrology" description="Generate accurate Kundli charts with detailed predictions and astrological analysis." isPartOf={{ id: `${siteUrl}/#website` }}/>
			{siteUrl ? (<SiteLinksSearchBoxJsonLd scriptProps={{ nonce }} url={siteUrl} potentialActions={[
                {
                    target: `${siteUrl}/?q={search_term_string}`,
                    queryInput: "search_term_string",
                },
            ]}/>) : null}
		</>);
}
