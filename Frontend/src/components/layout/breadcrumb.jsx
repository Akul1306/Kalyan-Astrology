"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
export function Breadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbItems = [
        { name: "Home", href: "/", icon: Home },
        ...segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
            return { name, href };
        }),
    ];
    if (breadcrumbItems.length <= 1)
        return null;
    return (<nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {breadcrumbItems.map((item, index) => (<div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2"/>}
          {index === breadcrumbItems.length - 1 ? (<span className="text-gray-900 font-medium">{item.name}</span>) : (<Link href={item.href || "#"} className="hover:text-orange-600 transition-colors">
              <div className="flex items-center">
                {"icon" in item && item.icon ? (() => { const Icon = item.icon; return <Icon className="h-4 w-4 mr-1"/>; })() : null}
                {item.name}
              </div>
            </Link>)}
        </div>))}
    </nav>);
}
