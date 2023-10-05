"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

type SidebarItemProps = {
  label: string;
  href: string;
};

const SidebarItem = ({ label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "w-full flex justify-between items-center space-x-2 hover:bg-gray-200 py-2 px-2 rounded-lg text-gray-500 transition",
        active ? "bg-gray-300" : "",
        active ? "text-gray-800" : "",
        active ? "font-medium" : ""
      )}
    >
      <span>{label}</span>
      <ChevronRight
        className={cn("h-5 w-5", active ? "text-gray-800" : "text-gray-500")}
      />
    </Link>
  );
};

export default SidebarItem;
