"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { settings } from "@/constants";

export default function Sidebar() {
  const pathName = usePathname();

  return (
    <ul className="w-full max-w-[245px] border-r border-secondary-gray">
      {settings.map((setting) => (
        <li>
          <Link
            href={setting.url}
            className={`flex w-full px-4 py-2 relative right-[-1px] ${
              pathName === setting.url
                ? "text-[#1d1d1f] cursor-default border-r border-[#1d1d1f]"
                : "text-[#6e6e73] hover:text-[#424245]"
            }`}
          >
            {setting.name}
          </Link>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={() => signOut()}
          className="text-[#6e6e73] hover:text-[#424245] px-4 py-2 relative right-[-1px]"
        >
          Cerrar sesión
        </button>
      </li>
    </ul>
  );
}
