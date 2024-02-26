"use client";

import { useState } from "react";
import { FaExclamationCircle, FaRegCheckCircle } from "react-icons/fa";

import { editAccount } from "@/lib/actions/account.actions";
import { accountValidation } from "@/lib/validations";
import { Validation } from "@/types";

type Props = {
  email: string;
};

export default function ResetPassword({ email }: Props) {
  const [error, setError] = useState<Validation>();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    email,
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validate the form fields
    const validation = accountValidation(user);

    // All validations passed, update account
    if (Object.keys(validation).length === 0) {
      // const response =
      await editAccount(user);

      setError({});
      setMessage("Contraseña restablecida con éxito!");
    } else {
      // Form has error
      setError(validation);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <div className="w-80">
        <div className="flex flex-col gap-2">
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
        </div>

        <div>
          {error?.password && (
            <div className="absolute flex items-center mt-2 text-xs text-primary-red">
              <span className="mx-1">
                <FaExclamationCircle size={12} />
              </span>
              <span>{error.password}</span>
            </div>
          )}
          {message && (
            <div className="absolute flex items-center mt-2 text-xs text-primary-green">
              <span className="mx-1">
                <FaRegCheckCircle size={12} />
              </span>
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>
      <button className="button mt-4">Cambiar</button>
    </form>
  );
}
