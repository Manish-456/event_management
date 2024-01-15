"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { headerLinks } from "@/constants";

export function NavItems() {
  const pathname = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col md:flex-row items-start gap-5">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li 
          key={link.label}
          className={cn("p-medium-16 whitespace-nowrap flex-center", {
            "text-primary-500": isActive
          })}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}
