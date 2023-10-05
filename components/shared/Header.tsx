"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type HeaderProps = {
  title: string;
  subtitle?: string;
  showBackArrow?: boolean;
};

const Header = ({ title, subtitle, showBackArrow }: HeaderProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-5">
        {showBackArrow && (
          <div
            className="p-2 hover:bg-neutral-100 rounded-full cursor-pointer transition"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-6 w-6" />
          </div>
        )}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-[15px] text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </>
  );
};

export default Header;
