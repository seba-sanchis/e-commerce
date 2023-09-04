"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Page() {
  const router = useRouter();

  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [toggleInput, setToggleInput] = useState(true);
  const [error, setError] = useState(false);

  const [isPending, startTransition] = useTransition();

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
        startTransition(() => {
          router.refresh();
          router.push("/");
        });
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
    <div className="flex flex-col flex-1 max-w-[980px] w-full mx-auto">
      <h1 className="text-[40px] font-semibold pt-[34px]">
        Iniciá sesión para comprar.
      </h1>
      <div className="flex flex-col items-center grow w-[480px] mt-[72px] mx-auto text-[#494949]">
        <h2 className="text-2xl font-semibold">Ingresá a la tienda</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-full h-32"
        >
          <label className="sr-only">Iniciá sesión con tu e-mail</label>
          {toggleInput ? (
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              onKeyDown={handleKeyDown}
              type="email"
              placeholder="Email"
              className={`w-full px-4 py-3 rounded-full outline-none border focus:border-2 ${
                error
                  ? "placeholder:text-primary-red border-primary-red bg-secondary-red"
                  : "border-secondary-black bg-[hsla(0,0%,100%,.8)] focus:border-primary-blue"
              }`}
            />
          ) : (
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-full outline-none border border-secondary-black focus:border-2 focus:border-primary-blue bg-[hsla(0,0%,100%,.8)]"
            />
          )}
          <button></button>
        </form>
        <div className="flex flex-col items-center text-sm gap-2">
          <div>
            <Link href="#" className="text-tertiary-blue">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div>
            <span>¿No tenés cuenta?</span>{" "}
            <Link href="/sign-up" className="text-tertiary-blue">
              Crear ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
