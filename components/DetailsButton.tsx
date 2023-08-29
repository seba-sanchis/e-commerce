"use client";

import { useState } from "react";

export default function DetailsButton({ features }: { features: string[] }) {
  const [toggleFeatures, setToggleFeatures] = useState(false);

  return (
    <>
      <button
        onClick={() => setToggleFeatures((state) => !state)}
        className="flex items-center mt-3 text-[17px] text-tertiary-blue"
      >
        <span>Ver detalle de producto</span>
        <i className="fi fi-rr-angle-small-down flex items-center ml-1"></i>
      </button>
      <ul
        className={`mt-1 text-sm overflow-hidden transition-all ease-in-out duration-300 ${
          toggleFeatures ? "h-full" : "h-0"
        }`}
      >
        {features?.map((feature) => (
          <li>{feature}</li>
        ))}
      </ul>
    </>
  );
}
