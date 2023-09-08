"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Searchbar() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search === "") {
      return null;
    } else {
      router.push(`/category/${search}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center z-10">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Buscar"
        className="w-96 h-10 pr-1 pl-4 rounded-l-full text-sm outline-none border focus:border-tertiary-gray bg-primary-gray"
      />
      <button className="flex items-center justify-center rounded-r-full bg-primary-gray w-16 h-10">
        <i className="fi fi-rr-search flex justify-center items-center"></i>
      </button>
    </form>
  );
}
