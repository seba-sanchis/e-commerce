"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Account, Validation } from "@/types";
import { accountValidation } from "@/lib/validations";
import { editAccount } from "@/lib/actions/account.actions";

export default function EditAccount({ account }: { account: Account }) {
  const router = useRouter();

  const { _id, email } = account || {};

  const [toggleForm, setToggleForm] = useState(false);
  const [user, setUser] = useState<Account>({
    _id: _id,
    email: email,
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<Validation>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form fields
    const validation = accountValidation(user);

    // All validations passed, update account
    if (Object.keys(validation).length === 0) {
      // const response =
      await editAccount(user);

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
        onClick={() => setToggleForm(true)}
        className="group flex items-center mt-1.5 text-tertiary-blue"
      >
        <span className="group-hover:underline">Administrar cuenta</span>
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
              {/* Account */}
              <div className="w-full border-b border-[#e7e7e8]">
                <div className="flex flex-col gap-4 w-full py-8 md:max-w-[75%] mx-auto">
                  <h3 className="font-semibold">Cuenta</h3>
                  <div>
                    <input
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      type="email"
                      placeholder="Email"
                      className={`input ${
                        error?.email
                          ? "input_error"
                          : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                      }`}
                    />
                    {error?.email && (
                      <div className="flex items-center mt-2 text-xs text-primary-red">
                        <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                        <span>{error.email}</span>
                      </div>
                    )}
                  </div>
                  <input
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    type="password"
                    placeholder="Contraseña"
                    className={`input ${
                      error?.password
                        ? "input_error"
                        : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                    }`}
                  />
                  <div>
                    <input
                      value={user.confirmPassword}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          confirmPassword: e.target.value,
                        })
                      }
                      type="password"
                      placeholder="Confirmar contraseña"
                      className={`input ${
                        error?.password
                          ? "input_error"
                          : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                      }`}
                    />
                    {error?.password && (
                      <div className="flex items-center mt-2 text-xs text-primary-red">
                        <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                        <span>{error.password}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-center items-center pt-8 w-full max-w-[75%] mx-auto">
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
