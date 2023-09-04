"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { region } from "@/constants";
import { UserProfile } from "@/common.types";
import { newUser } from "@/lib/actions";

type Validation = {
  firstName?: string;
  lastName?: string;
  dni?: string;
  birthday?: string;
  region?: string;
  location?: string;
  address?: string;
  postcode?: string;
  email?: string;
  password?: string;
  areaCode?: string;
  phone?: string;
};

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

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<Validation>({
    firstName: "",
    lastName: "",
    dni: "",
    birthday: "",
    region: "",
    location: "",
    address: "",
    postcode: "",
    email: "",
    password: "",
    areaCode: "",
    phone: "",
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidEmail = (email: string) => {
      // Regular expression pattern for a valid email address
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Test the provided email against the pattern
      return emailPattern.test(email);
    };

    // Validate the form fields
    const validation: Validation = {};

    // Validate first name
    if (!user.firstName) {
      validation.firstName = "Ingresá un nombre.";
    }

    // Validate last name
    if (!user.lastName) {
      validation.lastName = "Ingresá un apellido.";
    }

    // Validate DNI
    if (user.dni === 0 || isNaN(user.dni) || user.dni.toString().length !== 8) {
      validation.dni = "Ingresá un DNI válido.";
    }

    // Validate birthday
    if (!user.birthday) {
      validation.birthday = "Ingresá una fecha válida.";
    }

    // Validate location
    if (!user.location) {
      validation.location = "Ingresá una ciudad.";
    }

    // Validate address
    if (!user.address) {
      validation.address = "Ingresá una dirección.";
    }

    // Validate postcode
    if (
      user.postcode === 0 ||
      isNaN(user.postcode) ||
      user.postcode.toString().length !== 4
    ) {
      validation.postcode = "Código inválido.";
    }

    // Validate email
    if (!user.email || !isValidEmail(user.email)) {
      validation.email = "Ingresá un email válido.";
    }

    // Validate password
    if (!user.password || user.password.length < 6) {
      validation.password = "Ingresá una contraseña válida.";
    }

    // Validate password confirmation
    if (user.password !== confirmPassword) {
      validation.password = "Confirmá tu contraseña.";
    }

    // Validate area code
    if (
      user.areaCode === 0 ||
      isNaN(user.areaCode) ||
      user.areaCode.toString().length !== 3
    ) {
      validation.areaCode = "Código inválido.";
    }

    // Validate phone
    if (
      user.phone === 0 ||
      isNaN(user.phone) ||
      user.phone.toString().length !== 7 ||
      user.phone.toString().length !== 8
    ) {
      validation.phone = "Ingresá un teléfono válido.";
    }

    // Set the validation errors
    setError(validation);

    // If there are validation errors, do not proceed with user creation
    if (Object.keys(validation).length > 0) {
      return;
    }

    // All validations passed, create a new user
    await newUser(user);

    // Sign in the user
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
            <div>
              <input
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                type="text"
                placeholder="Nombre"
                className={`input ${
                  error.firstName
                    ? "input_error"
                    : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                }`}
              />
              {error.firstName && (
                <div className="flex items-center mt-2 text-xs text-primary-red">
                  <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                  <span>{error.firstName}</span>
                </div>
              )}
            </div>

            <div>
              <input
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                type="text"
                placeholder="Apellido"
                className={`input ${
                  error.lastName
                    ? "input_error"
                    : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                }`}
              />
              {error.lastName && (
                <div className="flex items-center mt-2 text-xs text-primary-red">
                  <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                  <span>{error.lastName}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                value={user.dni === 0 ? "" : user.dni}
                onChange={(e) =>
                  setUser({ ...user, dni: Number(e.target.value) })
                }
                type="number"
                placeholder="DNI"
                className={`input ${
                  error.dni
                    ? "input_error"
                    : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                }`}
              />
              {error.dni && (
                <div className="flex items-center mt-2 text-xs text-primary-red">
                  <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                  <span>{error.dni}</span>
                </div>
              )}
            </div>
            <div className="w-1/2">
              <div
                className={`flex items-center border rounded h-14 placeholder:text-[#888] ${
                  error.birthday
                    ? "input_error"
                    : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                }`}
              >
                <input
                  value={user?.birthday?.slice(0, 10)}
                  onChange={(e) =>
                    setUser({ ...user, birthday: e.target.value })
                  }
                  type="date"
                  className={`w-full h-full px-4 z-10 focus:opacity-100 ${
                    user?.birthday ? "opacity-100" : "opacity-0"
                  }`}
                />

                <span
                  className={`absolute py-2 px-4 ${
                    error.birthday
                      ? "text-primary-red border-primary-red bg-secondary-red"
                      : "bg-[hsla(0,0%,100%,.8)] text-[#888]"
                  }`}
                >
                  Fecha de nacimiento
                </span>
              </div>
              {error.birthday && (
                <div className="flex items-center mt-2 text-xs text-primary-red">
                  <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                  <span>{error.birthday}</span>
                </div>
              )}
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

          <div>
            <input
              value={user.location}
              onChange={(e) => setUser({ ...user, location: e.target.value })}
              type="text"
              placeholder="Ciudad"
              className={`input ${
                error.location
                  ? "input_error"
                  : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
              }`}
            />
            {error.location && (
              <div className="flex items-center mt-2 text-xs text-primary-red">
                <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                <span>{error.location}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="w-2/3">
              <input
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                type="text"
                placeholder="Dirección"
                className={`input ${
                  error.address
                    ? "input_error"
                    : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                }`}
              />
              {error.address && (
                <div className="flex items-center mt-2 text-xs text-primary-red">
                  <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                  <span>{error.address}</span>
                </div>
              )}
            </div>
            <div className="w-1/3">
              <input
                value={user.postcode === 0 ? "" : user.postcode}
                onChange={(e) =>
                  setUser({ ...user, postcode: Number(e.target.value) })
                }
                type="number"
                placeholder="Código postal"
                className={`input ${
                  error.postcode
                    ? "input_error"
                    : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                }`}
              />
              {error.postcode && (
                <div className="flex items-center mt-2 text-xs text-primary-red">
                  <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                  <span>{error.postcode}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] border-b border-[#e7e7e8]">
        <div className="flex flex-col gap-4 w-full py-8 max-w-[460px] mx-auto">
          <div>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Email"
              className={`input ${
                error.email
                  ? "input_error"
                  : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
              }`}
            />
            {error.email && (
              <div className="flex items-center mt-2 text-xs text-primary-red">
                <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                <span>{error.email}</span>
              </div>
            )}
          </div>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Contraseña"
            className={`input ${
              error.password
                ? "input_error"
                : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
            }`}
          />
          <div>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirmar contraseña"
              className={`input ${
                error.password
                  ? "input_error"
                  : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
              }`}
            />
            {error.password && (
              <div className="flex items-center mt-2 text-xs text-primary-red">
                <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                <span>{error.password}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] border-b border-[#e7e7e8]">
        <div className="flex gap-4 w-full py-8 max-w-[460px] mx-auto">
          <div className="w-1/3">
            <input
              value={user.areaCode === 0 ? "" : user.areaCode}
              onChange={(e) =>
                setUser({ ...user, areaCode: Number(e.target.value) })
              }
              type="number"
              placeholder="Código de área"
              className={`input ${
                error.areaCode
                  ? "input_error"
                  : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
              }`}
            />
            {error.areaCode && (
              <div className="flex items-center mt-2 text-xs text-primary-red">
                <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                <span>{error.areaCode}</span>
              </div>
            )}
          </div>
          <div className="w-2/3">
            <input
              value={user.phone === 0 ? "" : user.phone}
              onChange={(e) =>
                setUser({ ...user, phone: Number(e.target.value) })
              }
              type="number"
              placeholder="Teléfono"
              className={`input ${
                error.phone
                  ? "input_error"
                  : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
              }`}
            />
            {error.phone && (
              <div className="flex items-center mt-2 text-xs text-primary-red">
                <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                <span>{error.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center py-8 max-w-[460px] mx-auto">
        <button className="button">Crear cuenta</button>
      </div>
    </form>
  );
}
