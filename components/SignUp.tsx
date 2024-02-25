"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaAngleDown, FaExclamationCircle } from "react-icons/fa";

import { regions } from "@/constants";
import { User, Validation } from "@/types";
import { newUser } from "@/lib/actions/user.actions";
import { signUpValidation } from "@/lib/validations";

export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dni: "",
    birthday: "",
    region: "Buenos Aires",
    location: "",
    address: "",
    zip: "",
    areaCode: "",
    phone: "",
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
    zip: "",
    email: "",
    password: "",
    areaCode: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form fields
    const validation = signUpValidation(user);

    // All validations passed, create account
    if (Object.keys(validation).length === 0) {
      // All validations passed, create a new user
      await newUser(user);

      // Sign in the user
      await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      router.refresh();
      router.push("/profile/account");
    } else {
      // Form has error
      setError(validation);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-[1200px]"
    >
      <div className="w-full max-w-[1200px] border-b border-[#e7e7e8]">
        <div className="flex flex-col gap-4 w-full py-8 max-w-[460px] mx-auto">
          <div className="flex gap-4">
            <div>
              <input
                value={user.firstName}
                onChange={(e) =>
                  setUser({
                    ...user,
                    firstName: e.target.value,
                  })
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
                  <span className="mx-1">
                    <FaExclamationCircle size={12} />
                  </span>
                  <span>{error.firstName}</span>
                </div>
              )}
            </div>

            <div>
              <input
                value={user.lastName}
                onChange={(e) =>
                  setUser({
                    ...user,
                    lastName: e.target.value,
                  })
                }
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
                  <span className="mx-1">
                    <FaExclamationCircle size={12} />
                  </span>
                  <span>{error.lastName}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                value={user.dni}
                onChange={(e) =>
                  setUser({
                    ...user,
                    dni: e.target.value,
                  })
                }
                type="text"
                placeholder="DNI"
                className={`input ${
                  error.dni
                    ? "input_error"
                    : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                }`}
              />
              {error.dni && (
                <div className="flex items-center mt-2 text-xs text-primary-red">
                  <span className="mx-1">
                    <FaExclamationCircle size={12} />
                  </span>
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
                  value={user.birthday.slice(0, 10)}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      birthday: e.target.value,
                    })
                  }
                  type="date"
                  className={`w-full h-full px-4 z-10 focus:opacity-100 ${
                    user.birthday ? "opacity-100" : "opacity-0"
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
                  <span className="mx-1">
                    <FaExclamationCircle size={12} />
                  </span>
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
              value={user.region}
              onChange={(e) =>
                setUser({
                  ...user,
                  region: e.target.value,
                })
              }
              className="appearance-none bg-transparent w-full h-full px-4 cursor-pointer z-10"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <span className="sticky flex items-center">
              <span className="absolute right-4">
                <FaAngleDown size={24} />
              </span>
            </span>
          </div>

          <div>
            <input
              value={user.location}
              onChange={(e) =>
                setUser({
                  ...user,
                  location: e.target.value,
                })
              }
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
                <span className="mx-1">
                  <FaExclamationCircle size={12} />
                </span>
                <span>{error.location}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="w-2/3">
              <input
                value={user.address}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: e.target.value,
                  })
                }
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
                  <span className="mx-1">
                    <FaExclamationCircle size={12} />
                  </span>
                  <span>{error.address}</span>
                </div>
              )}
            </div>
            <div className="w-1/3">
              <input
                value={user.zip}
                onChange={(e) =>
                  setUser({
                    ...user,
                    zip: e.target.value,
                  })
                }
                type="text"
                placeholder="Código postal"
                className={`input ${
                  error.zip
                    ? "input_error"
                    : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                }`}
              />
              {error.zip && (
                <div className="flex items-center mt-2 text-xs text-primary-red">
                  <span className="mx-1">
                    <FaExclamationCircle size={12} />
                  </span>
                  <span>{error.zip}</span>
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
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
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
                <span className="mx-1">
                  <FaExclamationCircle size={12} />
                </span>
                <span>{error.email}</span>
              </div>
            )}
          </div>
          <input
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
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
                <span className="mx-1">
                  <FaExclamationCircle size={12} />
                </span>
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
              value={user.areaCode}
              onChange={(e) =>
                setUser({
                  ...user,
                  areaCode: e.target.value,
                })
              }
              type="text"
              placeholder="Código de área"
              className={`input ${
                error.areaCode
                  ? "input_error"
                  : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
              }`}
            />
            {error.areaCode && (
              <div className="flex items-center mt-2 text-xs text-primary-red">
                <span className="mx-1">
                  <FaExclamationCircle size={12} />
                </span>
                <span>{error.areaCode}</span>
              </div>
            )}
          </div>
          <div className="w-2/3">
            <input
              value={user.phone}
              onChange={(e) =>
                setUser({
                  ...user,
                  phone: e.target.value,
                })
              }
              type="text"
              placeholder="Teléfono"
              className={`input ${
                error.phone
                  ? "input_error"
                  : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
              }`}
            />
            {error.phone && (
              <div className="flex items-center mt-2 text-xs text-primary-red">
                <span className="mx-1">
                  <FaExclamationCircle size={12} />
                </span>
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
