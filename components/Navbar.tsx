import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { Sessions } from "@/types";
import { Flyout, Menu, Searchbar, SearchField } from ".";
import { getContentByTag } from "@/lib/actions/content.actions";
import { FaShoppingBag } from "react-icons/fa";

export default async function Navbar() {
  const session = (await getServerSession(authOptions)) as Sessions;
  const sessionData = await JSON.parse(JSON.stringify(session));

  const organization = await getContentByTag("organization");
  const organizationData = await JSON.parse(JSON.stringify(organization));

  // Calculate the total quantity of products in the bag
  const items = session?.user?.bag?.reduce(
    (acc: number, item) => acc + item.quantity,
    0
  );

  return (
    <header className="w-full h-14 px-4 z-10 bg-[rgba(251,251,253,.8)]">
      <nav className="flex justify-between items-center w-full max-w-[980px] h-full mx-auto">
        <Flyout organization={organizationData} />

        <Searchbar />

        <div className="flex justify-end items-center md:gap-4 z-30">
          {session ? (
            <Link
              href="/profile/orders"
              className="navbar_link hidden md:flex justify-center items-center px-2"
            >
              Mi perfil
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="navbar_link hidden md:flex justify-center items-center px-2"
            >
              Ingresá
            </Link>
          )}
          <SearchField />
          <Link
            href={session ? "/bag" : "/sign-in"}
            aria-label="Carrito de compras"
            className="flex justify-center items-center w-10 h-10"
          >
            <span className="text-primary-black/80 hover:text-primary-black transition-colors">
              <FaShoppingBag size={16} />
            </span>
            {session && (
              <div className="absolute flex justify-end items-end w-8 h-8">
                <span className="flex justify-center items-center w-3.5 h-3.5 rounded-full text-[10px] text-white bg-black">
                  {items}
                </span>
              </div>
            )}
          </Link>

          <Menu session={sessionData} />
        </div>
      </nav>
    </header>
  );
}
