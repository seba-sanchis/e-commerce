"use client";

import { Sessions } from "@/types";
import { collections, myprofile } from "@/constants";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Menu({ session }: { session: Sessions }) {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="block md:hidden">
      <button
        onClick={() => setToggleMenu((state) => !state)}
        className="flex relative justify-center items-center w-10 h-10 z-20 text-primary-black/80 hover:text-primary-black transition-colors"
      >
        {toggleMenu ? (
          <i className="fi fi-rr-cross flex justify-center items-center"></i>
        ) : (
          <i className="fi fi-rr-menu-burger flex justify-center items-center"></i>
        )}
      </button>

      {/* Collections */}
      <div
        className={`fixed flex flex-wrap w-full p-1.5 top-0 left-0 transition-all duration-[240ms] ease-[cubic-bezier(.4,0,.6,1)] delay-100 z-10 bg-primary-white ${
          toggleMenu ? "visible h-full" : "h-14 invisible"
        }`}
      >
        <div className="flex flex-col mt-10 pt-6 pb-20 w-full max-w-[980px] mx-auto gap-3">
          <h2
            className={`px-3 text-xs ${
              toggleMenu ? "text-[rgb(110,110,115)]" : "text-[rgba(0,0,0,0)]"
            }`}
          >
            Comprar
          </h2>
          <ul
            className={`flex flex-col gap-1.5 text-2xl font-semibold ${
              toggleMenu ? "text-secondary-black" : "text-[rgba(0,0,0,0)]"
            }`}
          >
            {collections.map((collection) => (
              <li key={collection.name}>
                <Link
                  href={`${collection.url}`}
                  className={`px-3 py-2 transition-all duration-[320ms] ease-[cubic-bezier(.4,0,.6,1)] ${
                    toggleMenu ? "hover:text-black" : "cursor-auto"
                  }`}
                  onClick={() => setToggleMenu(false)}
                >
                  {collection.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2
            className={`px-3 text-xs ${
              toggleMenu ? "text-[rgb(110,110,115)]" : "text-[rgba(0,0,0,0)]"
            }`}
          >
            Cuenta
          </h2>
          <ul
            className={`flex flex-col gap-1.5 text-xs font-semibold ${
              toggleMenu ? "text-secondary-black" : "text-[rgba(0,0,0,0)]"
            }`}
          >
            {myprofile.map((feature) => (
              <li key={feature.name}>
                <Link
                  href={session ? `${feature.url}` : "/sign-in"}
                  className={`flex items-center gap-2 px-3 py-2 transition-all duration-[320ms] ease-[cubic-bezier(.4,0,.6,1)] ${
                    toggleMenu ? "hover:text-black" : "cursor-auto"
                  }`}
                  onClick={() => setToggleMenu(false)}
                >
                  <span>{feature.icon}</span> <span>{feature.name}</span>
                </Link>
              </li>
            ))}

            {session ? (
              <li key="Cerrar sesión">
                <button
                  type="button"
                  onClick={() => signOut()}
                  className={`flex items-center gap-2 px-3 py-2 transition-all duration-[320ms] ease-[cubic-bezier(.4,0,.6,1)] ${
                    toggleMenu ? "hover:text-black" : "cursor-auto"
                  }`}
                >
                  <i className="fi fi-rr-exit flex items-center text-xl"></i>
                  <span>Cerrar sesión</span>
                </button>
              </li>
            ) : (
              <li key="Ingresar">
                <Link
                  href="/sign-in"
                  className={`flex items-center gap-2 px-3 py-2 transition-all duration-[320ms] ease-[cubic-bezier(.4,0,.6,1)] ${
                    toggleMenu ? "hover:text-black" : "cursor-auto"
                  }`}
                  onClick={() => setToggleMenu(false)}
                >
                  <span>
                    <i className="fi fi-rr-circle-user flex items-center text-xl"></i>
                  </span>{" "}
                  <span>Ingresá</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
