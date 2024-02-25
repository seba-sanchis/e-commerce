"use client";

import { editAccount } from "@/lib/actions/account.actions";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

type Props = {
  email: string;
};
export default function ResetPassword({ email }: Props) {
  const [user, setUser] = useState({
    email,
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    await editAccount(user);

    setMessage("Contraseña restablecida con éxito!");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <div className="w-80 h-20">
        <input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Contraseña"
          className="input border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
        />
        <input
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          type="password"
          placeholder="Confirmar contraseña"
          className="input border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
        />
        {message && (
          <div className="flex items-center mt-2 text-xs text-primary-green">
            <span className="mx-1">
              <FaRegCheckCircle size={12} />
            </span>
            <span>{message}</span>
          </div>
        )}
      </div>
      <button className="button">Cambiar</button>
    </form>
  );
}
