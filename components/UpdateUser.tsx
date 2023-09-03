"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { UserProfile } from "@/common.types";
import { region } from "@/constants";
import { updateUser } from "@/lib/actions";

export default function UpdateUser({ session }: { session: UserProfile }) {
  const router = useRouter();

  const [toggleForm, setToggleForm] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    _id: session._id,
    firstName: session.firstName,
    lastName: session.lastName,
    dni: session.dni,
    birthday: session.birthday,
    region: session.region,
    location: session.location,
    address: session.address,
    postcode: session.postcode,
    email: session.email,
    password: "",
    areaCode: session.areaCode,
    phone: session.phone,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateUser(user);

    router.refresh();

    setToggleForm(false);
  };

  return (
    <div>
      <button
        onClick={() => setToggleForm(true)}
        className="group flex items-center mt-1.5 text-tertiary-blue"
      >
        <span className="group-hover:underline">
          Administrar datos de usuario
        </span>{" "}
        <i className="fi fi-rr-angle-small-right flex items-center"></i>
      </button>
      <div
        onClick={() => setToggleForm(false)}
        className={`fixed transition-opacity duration-100 ease-in-out overflow-y-auto bg-[rgba(50,50,50,.88)] ${
          toggleForm ? "opacity-100 z-10 inset-0" : "opacity-0"
        }`}
      >
        {toggleForm && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative inset-0 max-w-[816px] z-10 my-10 mx-auto p-20 rounded-2xl bg-white"
          >
            <div className="max-w-[75%] mx-auto">
              <h2 className="text-4xl text-center font-semibold pb-4">
                Actualizá tus datos.
              </h2>
              <div className="pb-5">
                Revisá que todos los datos sean correctos para evitar cualquier
                tipo de inconveniente en los procesos de compra y entrega.
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <div className="w-full border-b border-[#e7e7e8]">
                <div className="flex flex-col gap-4 w-full py-8 max-w-[75%] mx-auto">
                  <h3 className="font-semibold">Personal</h3>
                  <div className="flex gap-4">
                    <input
                      value={user.firstName}
                      onChange={(e) =>
                        setUser({ ...user, firstName: e.target.value })
                      }
                      type="text"
                      placeholder="Nombre"
                      className="input w-full"
                    />
                    <input
                      value={user.lastName}
                      onChange={(e) =>
                        setUser({ ...user, lastName: e.target.value })
                      }
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
                        onChange={(e) =>
                          setUser({ ...user, birthday: e.target.value })
                        }
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

              <div className="w-full border-b border-[#e7e7e8]">
                <div className="flex flex-col gap-4 w-full py-8 max-w-[75%] mx-auto">
                  <h3 className="font-semibold">Dirección de envío</h3>
                  <div className="flex items-center border border-[#d6d6d6] rounded w-full h-14 justify-between">
                    <select
                      onChange={(e) =>
                        setUser({ ...user, region: e.target.value })
                      }
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
                    onChange={(e) =>
                      setUser({ ...user, location: e.target.value })
                    }
                    type="text"
                    placeholder="Ciudad"
                    className="input"
                  />

                  <div className="flex gap-4">
                    <input
                      value={user.address}
                      onChange={(e) =>
                        setUser({ ...user, address: e.target.value })
                      }
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

              <div className="w-full border-b border-[#e7e7e8]">
                <div className="flex flex-col gap-4 w-full py-8 max-w-[75%] mx-auto">
                  <h3 className="font-semibold">Cuenta</h3>
                  <input
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    type="email"
                    placeholder="Email"
                    className="input"
                  />
                  <input
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
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

              <div className="w-full border-b border-[#e7e7e8]">
                <div className="flex flex-col gap-4 w-full py-8 max-w-[75%] mx-auto">
                  <h3 className="font-semibold">Contacto</h3>
                  <div className="flex gap-4">
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
              </div>

              <div className="flex flex-col gap-4 justify-center w-full max-w-[75%] mx-auto">
                <button className="button w-full">Guardar</button>
                <button
                  onClick={() => setToggleForm(false)}
                  className="text-tertiary-blue hover:underline"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
