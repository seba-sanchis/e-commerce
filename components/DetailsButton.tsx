"use client";

import { useState } from "react";

export default function DetailsButton({
  color,
  size,
}: {
  color: string;
  size: string;
}) {
  const [toggleFeatures, setToggleFeatures] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setToggleFeatures((state) => !state)}
        className="flex items-center mt-3 text-[17px] text-tertiary-blue"
      >
        <span>Ver detalle de producto</span>
        <i className="fi fi-rr-angle-small-down flex items-center ml-1"></i>
      </button>
      <ul
        className={`mt-1 text-sm overflow-hidden transition-all ease-in-out duration-300 list-disc list-inside ${
          toggleFeatures ? "h-full" : "h-0"
        }`}
      >
        <h3 className="font-semibold mt-4">Características</h3>
        <li key={color} className="mt-1 ml-1">
          <span>Color:</span> <span>{color}</span>
        </li>
        <li key={size} className="mt-1 ml-1">
          <span>Talle (US):</span> <span>{size}</span>
        </li>
      </ul>
    </div>
  );
}
