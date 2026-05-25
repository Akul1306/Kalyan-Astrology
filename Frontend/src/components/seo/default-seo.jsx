"use client";
import React from "react";
import { DefaultSeo } from "next-seo";
import seoConfig from "@/next-seo.config";
export default function DefaultSEO() {
    return <DefaultSeo {...seoConfig}/>;
}
