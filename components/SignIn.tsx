"use client";

import { signIn } from "next-auth/react";

export default function SignIn({ id, name }: { id: string; name: string }) {
  return (
    <button
      type="button"
      key={name}
      onClick={() => {
        signIn(id);
      }}
      className="border border-black p-4"
    >
      Ingresar con {name}
    </button>
  );
}
