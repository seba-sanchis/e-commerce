"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function OAuth({ id, name }: { id: string; name: string }) {
  return (
    <button
      className="flex items-center gap-4 p-4 rounded-lg"
      key={name}
      onClick={() => {
        signIn(id);
      }}
      type="button"
    >
      <Image
        src={`/assets/brand-${id}.png`}
        alt="google"
        width={24}
        height={24}
      />{" "}
      <span>Ingresá con {name}</span>
    </button>
  );
}
