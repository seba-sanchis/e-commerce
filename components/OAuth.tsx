"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function OAuth({ id, name }: { id: string; name: string }) {
  return (
    <button
      type="button"
      key={name}
      onClick={() => {
        signIn(id);
      }}
      className="flex items-center gap-4 p-4 rounded-lg"
    >
      <Image
        src={`/assets/brand-${id}.png`}
        alt="google"
        width={24}
        height={24}
      />{" "}
      <span>Ingresar con {name}</span>
    </button>
  );
}
