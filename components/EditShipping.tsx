"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Shipping, Validation } from "@/types";
import { shippingValidation } from "@/lib/validations";
import { editShipping } from "@/lib/actions/shipping.actions";
import { regions } from "@/constants";
import { FaAngleDown, FaAngleRight, FaExclamationCircle } from "react-icons/fa";

export default function EditShipping({ shipping }: { shipping: Shipping }) {
  const router = useRouter();

  const { _id, region, location, address, zip, areaCode, phone } =
    shipping || {};

  const [toggleForm, setToggleForm] = useState(false);
  const [user, setUser] = useState({
    _id: _id,
    region: region,
    location: location,
    address: address,
    zip: zip,
    areaCode: areaCode,
    phone: phone,
  });

  const [error, setError] = useState<Validation>({
    region: "",
    location: "",
    address: "",
    zip: "",
    areaCode: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form fields
    const validation = shippingValidation(user);

    // All validations passed, update shipping
    if (Object.keys(validation).length === 0) {
      await editShipping(user);

      router.refresh();
      setToggleForm(false);
    } else {
      // Form has error
      setError(validation);
    }
  };

  return (
    <>
      <button
        className="group flex items-center mt-1.5 text-tertiary-blue"
        onClick={() => setToggleForm(true)}
      >
        <span className="group-hover:underline">Editar</span>
        <FaAngleRight size={16} />
      </button>
      <span className="text-primary-red text-xs">
        {(!shipping?.region ||
          !shipping?.location ||
          !shipping?.address ||
          !shipping?.zip ||
          !shipping?.areaCode ||
          !shipping?.phone) &&
          "Datos de envío incompletos."}
      </span>
      <div
        onClick={() => setToggleForm(false)}
        className={`fixed transition-opacity duration-100 ease-in-out overflow-y-auto bg-[rgba(50,50,50,.88)] ${
          toggleForm ? "opacity-100 z-50 inset-0" : "opacity-0"
        }`}
      >
        {toggleForm && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative inset-0 max-w-[816px] z-10 my-10 mx-auto py-10 px-4 md:p-20 rounded-2xl bg-white"
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
              {/* user */}
              <div className="w-full border-b border-[#e7e7e8]">
                <div className="flex flex-col gap-4 w-full py-4 md:py-8 md:max-w-[75%] mx-auto">
                  <h3 className="font-semibold">Dirección de envío</h3>
                  <div className="flex items-center border border-[#d6d6d6] rounded w-full h-14 justify-between">
                    <select
                      value={user.region}
                      onChange={(e) =>
                        setUser({ ...user, region: e.target.value })
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
                        setUser({ ...user, location: e.target.value })
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
                          setUser({ ...user, address: e.target.value })
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

              <div className="w-full border-b border-[#e7e7e8]">
                <div className="flex flex-col gap-4 w-full py-8 md:max-w-[75%] mx-auto">
                  <h3 className="font-semibold">Contacto</h3>
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <input
                        value={user.areaCode}
                        onChange={(e) =>
                          setUser({ ...user, areaCode: e.target.value })
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
    </>
  );
}
