"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="bg-black text-white px-4 h-12 rounded-full"
    >
      Cerrar sesión
    </button>
  );
}
