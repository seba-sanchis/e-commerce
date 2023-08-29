"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { region } from "@/constants";
import { UserProfile } from "@/common.types";
import { newUser } from "@/lib/actions";

export default function Page() {
  const router = useRouter();

  const [user, setUser] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    dni: 0,
    birthday: "",
    region: region[0],
    location: "",
    address: "",
    postcode: 0,
    email: "",
    password: "",
    areaCode: 0,
    phone: 0,
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await newUser(user);

    await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });

    router.refresh();
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-[1200px]"
    >
      <div className="flex flex-col items-center pt-8 max-w-[460px] mx-auto">
        <h1 className="text-3xl font-bold">Creá tu cuenta</h1>
        <div className="text-center my-2">
          Una cuenta es todo lo que necesitas para comenzar a agregar productos
          a tu carrito.
        </div>
        <div>
          <span>¿Ya tenés una cuenta?</span>{" "}
          <Link href="/sign-in" className="text-tertiary-blue">
            Ingresar ahora
          </Link>
        </div>
      </div>

      <div className="w-full max-w-[1200px] border-b border-[#e7e7e8]">
        <div className="flex flex-col gap-4 w-full py-8 max-w-[460px] mx-auto">
          <div className="flex gap-4">
            <input
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              type="text"
              placeholder="Nombre"
              className="input w-full"
            />
            <input
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              type="text"
              placeholder="Apellido"
              className="input w-full"
            />
          </div>

          <div className="flex gap-4">
            <input
              value={user.dni === 0 ? "" : user.dni}
              onChange={(e) =>
                setUser({ ...user, dni: Number(e.target.value) })
              }
              type="number"
              placeholder="DNI"
              className="input w-1/2"
            />
            <div className="flex items-center border border-[#d6d6d6] rounded h-14 w-1/2 placeholder:text-[#888]">
              <input
                value={user?.birthday?.slice(0, 10)}
                onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                type="date"
                className={`w-full h-full px-4 z-10 focus:opacity-100 placeholder:text-[#888] ${
                  user?.birthday ? "opacity-100" : "opacity-0"
                }`}
              />
              <span className="absolute px-4 bg-white text-[#888]">
                Fecha de nacimiento
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] border-b border-[#e7e7e8]">
        <div className="flex flex-col gap-4 w-full py-8 max-w-[460px] mx-auto">
          <div className="flex items-center border border-[#d6d6d6] rounded w-full h-14 justify-between">
            <select
              onChange={(e) => setUser({ ...user, region: e.target.value })}
              className="appearance-none bg-transparent w-full h-full px-4 cursor-pointer z-10"
            >
              {region.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <span className="sticky flex items-center">
              <i className="fi fi-rr-angle-small-down icon absolute right-4"></i>
            </span>
          </div>

          <input
            value={user.location}
            onChange={(e) => setUser({ ...user, location: e.target.value })}
            type="text"
            placeholder="Ciudad"
            className="input"
          />

          <div className="flex gap-4">
            <input
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              type="text"
              placeholder="Dirección"
              className="input w-2/3"
            />
            <input
              value={user.postcode === 0 ? "" : user.postcode}
              onChange={(e) =>
                setUser({ ...user, postcode: Number(e.target.value) })
              }
              type="number"
              placeholder="Código postal"
              className="input w-1/3"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] border-b border-[#e7e7e8]">
        <div className="flex flex-col gap-4 w-full py-8 max-w-[460px] mx-auto">
          <input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            placeholder="Email"
            className="input"
          />
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Contraseña"
            className="input"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="input"
          />
        </div>
      </div>

      <div className="w-full max-w-[1200px] border-b border-[#e7e7e8]">
        <div className="flex gap-4 w-full py-8 max-w-[460px] mx-auto">
          <input
            value={user.areaCode === 0 ? "" : user.areaCode}
            onChange={(e) =>
              setUser({ ...user, areaCode: Number(e.target.value) })
            }
            type="number"
            placeholder="Código de área"
            className="input w-1/3"
          />
          <input
            value={user.phone === 0 ? "" : user.phone}
            onChange={(e) =>
              setUser({ ...user, phone: Number(e.target.value) })
            }
            type="number"
            placeholder="Teléfono"
            className="input w-2/3"
          />
        </div>
      </div>

      <div className="flex justify-center py-8 max-w-[460px] mx-auto">
        <button className="button">Crear cuenta</button>
      </div>
    </form>
  );
}
