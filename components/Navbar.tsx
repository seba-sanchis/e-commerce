import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/options";
import { Sessions } from "@/common.types";
import { Menu, Searchbar } from ".";

export default async function Navbar() {
  const session = (await getServerSession(authOptions)) as Sessions;

  // console.log("session:", session);

  return (
    <header className="w-full h-14 px-6 z-10 bg-[rgba(251,251,253,.8)]">
      <nav className="flex items-center justify-between w-full max-w-[980px] h-full mx-auto">
        <Menu />

        <Searchbar />

        <div className="flex justify-end items-center gap-4 z-10">
          {session ? (
            <Link
              href="/profile/orders"
              className="navbar_link flex justify-center items-center px-2"
            >
              Mi perfil
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="navbar_link flex justify-center items-center px-2"
            >
              Ingresá
            </Link>
          )}
          <Link
            href={session ? "/bag" : "/sign-in"}
            className="flex justify-center items-center w-10 h-10"
          >
            <i className="fi fi-rr-shopping-bag flex justify-center items-center text-primary-black/80 hover:text-primary-black transition-colors"></i>
            {session && (
              <div className="absolute flex justify-end items-end w-8 h-8">
                <span className="flex justify-center items-center w-3.5 h-3.5 rounded-full text-[10px] text-white bg-black">
                  {session.user?.bag?.length}
                </span>
              </div>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
