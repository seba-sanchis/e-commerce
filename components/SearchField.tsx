"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchField() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [toggleBar, setToggleBar] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search === "") {
      return null;
    } else {
      router.push(`/category/${search}`);
    }
  };

  return (
    <div className="block md:hidden">
      <div
        className={`absolute pl-2 pr-4 top-2 left-0 right-0 bg-white z-30 ${
          toggleBar ? "flex" : "hidden"
        }`}
      >
        <button
          aria-label="Cerrar"
          className="justify-center items-center w-10 h-10 text-primary-black/80 hover:text-primary-black transition-colors"
          onClick={() => setToggleBar(false)}
        >
          <i className="fi fi-rr-arrow-small-left flex justify-center items-center text-2xl"></i>
        </button>
        <form onSubmit={handleSubmit} className="flex flex-grow">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Buscar"
            className="flex w-full h-10 pr-1 pl-4 rounded-l-full text-sm outline-none border focus:border-tertiary-gray bg-primary-gray"
          />
          <button
            aria-label="Buscar"
            className="flex items-center justify-center w-16 h-10 rounded-r-full bg-primary-gray"
          >
            <i className="fi fi-rr-search flex justify-center items-center"></i>
          </button>
        </form>
      </div>

      <button
        aria-label="Buscar productos"
        className="flex justify-center items-center w-10 h-10 text-primary-black/80 hover:text-primary-black transition-colors"
        onClick={() => setToggleBar(true)}
      >
        <i className="fi fi-rr-search flex justify-center items-center"></i>
      </button>
    </div>
  );
}
