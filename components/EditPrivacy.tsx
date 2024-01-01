"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { privacyValidation } from "@/lib/validations";
import { Privacy, Validation } from "@/types";
import { editPrivacy } from "@/lib/actions/privacy.actions";

export default function EditPrivacy({ privacy }: { privacy: Privacy }) {
  const router = useRouter();

  const { _id, firstName, lastName, dni, birthday } = privacy || {};

  const [toggleForm, setToggleForm] = useState(false);
  const [user, setUser] = useState<Privacy>({
    _id: _id,
    firstName: firstName,
    lastName: lastName,
    dni: dni,
    birthday: birthday,
  });

  const [error, setError] = useState<Validation>({
    firstName: "",
    lastName: "",
    dni: "",
    birthday: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form fields
    const validation = privacyValidation(user);

    // All validations passed, update privacy
    if (Object.keys(validation).length === 0) {
      // const response =
      await editPrivacy(user);

      router.refresh();
      setToggleForm(false);
    } else {
      // Form has error
      setError(validation);
    }
  };

  return (
    <div>
      <button
        className="group flex items-center mt-1.5 text-tertiary-blue"
        onClick={() => setToggleForm(true)}
      >
        <span className="group-hover:underline">
          Administrar mi información personal
        </span>
        <i className="fi fi-rr-angle-small-right flex items-center"></i>
      </button>
      <div
        onClick={() => setToggleForm(false)}
        className={`fixed transition-opacity duration-100 ease-in-out overflow-y-auto bg-[rgba(50,50,50,.88)] ${
          toggleForm ? "opacity-100 z-50 inset-0" : "opacity-0"
        }`}
      >
        {toggleForm && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative inset-0 max-w-[816px] z-10 my-10 mx-auto px-4 py-10 md:p-20 rounded-2xl bg-white"
          >
            <div className="md:max-w-[75%] mx-auto">
              <h2 className="text-2xl md:text-4xl text-center font-semibold pb-4">
                Actualizá tus datos.
              </h2>
              <div className="pb-5">
                Revisá que todos los datos sean correctos para evitar cualquier
                tipo de inconveniente en los procesos de compra y entrega.
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <div className="w-full border-b border-[#e7e7e8]">
                <div className="flex flex-col gap-4 w-full py-8 md:max-w-[75%] mx-auto">
                  <h3 className="font-semibold">Personal</h3>

                  {/* Personal info */}
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
                          error?.firstName
                            ? "input_error"
                            : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                        }`}
                      />
                      {error?.firstName && (
                        <div className="flex items-center mt-2 text-xs text-primary-red">
                          <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
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
                          error?.lastName
                            ? "input_error"
                            : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                        }`}
                      />
                      {error?.lastName && (
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
                            setUser({
                              ...user,
                              birthday: e.target.value,
                            })
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

              <div className="flex flex-col gap-4 justify-center items-center pt-8 w-full max-w-[75%] mx-auto">
                <button className="button w-full">Guardar</button>
                <button
                  className="text-tertiary-blue hover:underline"
                  onClick={() => setToggleForm(false)}
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
