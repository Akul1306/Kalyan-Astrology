"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export function Breadcrumbs() {
    const pathname = usePathname();
    // Generate breadcrumbs from pathname
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [
        { label: "Home", href: "/", icon: Home },
        ...paths.map((path, index) => ({
            label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
            href: `/${paths.slice(0, index + 1).join("/")}`,
        })),
    ];
    return (<motion.nav initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="flex items-center gap-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const Icon = crumb.icon;
            return (<div key={crumb.href} className="flex items-center gap-2">
            {index > 0 && (<ChevronRight className="h-4 w-4 text-gray-400"/>)}
            <Link href={crumb.href || "#"} className={cn("flex items-center gap-1.5 transition-colors", isLast
                    ? "text-gray-900 font-medium"
                    : "text-gray-600 hover:text-gray-900")}>
              {Icon && <Icon className="h-4 w-4"/>}
              <span>{crumb.label}</span>
            </Link>
          </div>);
        })}
    </motion.nav>);
}
