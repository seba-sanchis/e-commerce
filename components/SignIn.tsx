"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaExclamationCircle } from "react-icons/fa";

export default function SignIn() {
  const router = useRouter();

  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [toggleInput, setToggleInput] = useState(true);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (response?.error) {
        setUser({ email: "", password: "" });
        setToggleInput(true);
        setError(true);
        return;
      }

      if (response?.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && user.email !== "") {
      e.preventDefault();
      setToggleInput(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full h-20"
    >
      <label className="sr-only">Iniciá sesión con tu e-mail</label>
      {toggleInput ? (
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          onKeyDown={handleKeyDown}
          type="email"
          placeholder="Email"
          className={`w-full px-4 py-3 rounded-full outline-none border focus:border-2 focus:px-[15px] focus:py-[11px] focus:bg-[hsla(0,0%,100%,.8)] focus:border-primary-blue ${
            error
              ? "placeholder:text-primary-red border-primary-red bg-secondary-red"
              : "border-secondary-gray bg-[hsla(0,0%,100%,.8)]"
          }`}
        />
      ) : (
        <input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Contraseña"
          className={`w-full px-4 py-3 rounded-full outline-none border focus:border-2 focus:px-[15px] focus:py-[11px] focus:bg-[hsla(0,0%,100%,.8)] focus:border-primary-blue ${
            error
              ? "placeholder:text-primary-red border-primary-red bg-secondary-red"
              : "border-secondary-gray bg-[hsla(0,0%,100%,.8)]"
          }`}
        />
      )}
      {error && (
        <div className="flex items-center mt-2 text-xs text-primary-red">
          <span className="mx-1">
            <FaExclamationCircle size={12} />
          </span>
          <span>Ingresá un email y contraseña válidos.</span>
        </div>
      )}
    </form>
  );
}
