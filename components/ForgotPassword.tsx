"use client";

import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

import { generateToken } from "@/lib/actions/account.actions";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await generateToken(email);

    setMessage("¡Correo enviado con éxito!");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <div className="w-80">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="input border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
        />
        {message && (
          <div className="absolute flex items-center mt-2 text-xs text-primary-green">
            <span className="mx-1">
              <FaRegCheckCircle size={12} />
            </span>
            <span>{message}</span>
          </div>
        )}
      </div>
      <button className="button mt-4">Restablecer</button>
    </form>
  );
}
