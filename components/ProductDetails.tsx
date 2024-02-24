"use client";

import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

type Props = {
  color: string;
  size: string | undefined;
};

export default function ProductDetails({ color, size }: Props) {
  const [toggleFeatures, setToggleFeatures] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        className="flex items-center mt-3 text-[17px] text-tertiary-blue"
        onClick={() => setToggleFeatures((state) => !state)}
      >
        <span>Ver detalle de producto</span>
        <span className="ml-1">
          <FaAngleDown size={16} />
        </span>
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
