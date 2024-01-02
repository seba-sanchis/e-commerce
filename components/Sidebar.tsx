"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { myprofile } from "@/constants";
import { FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const pathName = usePathname();

  return (
    <ul className="hidden md:block w-full max-w-[245px] border-r border-secondary-gray">
      {myprofile.map((setting) => (
        <li key={setting.name}>
          <Link
            href={setting.url}
            className={`flex gap-2 w-full p-4 relative right-[-1px] ${
              pathName === setting.url
                ? "text-[#1d1d1f] cursor-default border-r border-[#1d1d1f]"
                : "text-[#6e6e73] hover:text-[#424245]"
            }`}
          >
            {setting.icon}
            <span>{setting.name}</span>
          </Link>
        </li>
      ))}
      <li key="Cerrar sesión">
        <button
          className="flex items-center gap-2 p-4 relative right-[-1px] text-[#6e6e73] hover:text-[#424245]"
          onClick={() => signOut()}
          type="button"
        >
          <FaSignOutAlt size={20} />
          <span>Cerrar sesión</span>
        </button>
      </li>
    </ul>
  );
}
